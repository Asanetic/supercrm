/**
 * Register real behavior here, once per action key. Both grid rowLinks
 * AND profile-level buttons (schema.profileActions) route through this
 * SAME registry — one place to add new behavior, works everywhere.
 *
 * Every registered function receives ONE ctx object instead of a fixed
 * list of positional args — see actionRegistryDocs.md (same folder) for
 * the full ctx field list and worked examples for every action shape
 * used elsewhere in this app (cross-module popups, preset create forms,
 * quick-edit modals, grid-toolbar smart filters, sending messages, etc).
 * Copy the block that matches what you're building from there.
 *
 * NOTE: "delete" and "clone" are intercepted directly by
 * useEntityFormController before they ever reach this registry — don't
 * register functions under those two keys, they will never fire.
 */

import { MosySendSmartMessage } from "../../UiControl/MosySmartComms";
import { MosyCommsSmartCall } from "../../UiControl/MosySmartCommsCalls";
import { MosyCard } from "../../../components/MosyCard";
import { MosyNotify } from "../../../MosyUtils/ActionModals";
import { mosyPostData } from "../../../MosyUtils/hiveUtils";
import { getApiRoutes } from "../../AppRoutes/apiRoutesHandler";
import MessagesList from "../../messages/uiControl/MessagesList";
import CallhistoryList from "../../callhistory/uiControl/CallhistoryList";
import QuotationsProfile from "../../quotations/uiControl/QuotationsProfile";
import { QuotationsSchema } from "../../quotations/QuotationsSchema";
import { buildPresetFromRow, openEntityCreateModal } from "../../moduleControl/UiControl/EntityCreateModal";

const apiRoutes = getApiRoutes();

const LeadsActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // One-click convert: creates a real Clients record from this lead's own
  // contact fields (they share the same generic field names — full_name,
  // business_name, phone_number, etc), then writes the new client's id
  // back onto THIS lead's converted_client_id and flips lead_status —
  // matching Clients' own converted_lead_id field, which stores the
  // reverse pointer back to this lead.
  convert_to_client: async ({ rows, update, refresh }) => {
    const row = rows?.[0];
    if (!row) return;

    if (row.converted_client_id) {
      MosyNotify({ message: 'This lead has already been converted to a client.', icon: 'info-circle', iconColor: 'text-warning' });
      return;
    }

    MosyNotify({ message: 'Converting lead to client...', icon: 'refresh', addTimer: false });

    const response = await mosyPostData({
      url: apiRoutes.clients.base,
      data: {
        full_name: row?.full_name || '',
        business_name: row?.business_name || '',
        phone_number: row?.phone_number || '',
        alternative_phone_number: row?.alternative_phone_number || '',
        email_address: row?.email_address || '',
        website_url: row?.website_url || '',
        industry_type: row?.industry_type || '',
        lead_source: row?.lead_source || '',
        country_name: row?.country_name || '',
        city_name: row?.city_name || '',
        client_status: 'Active',
        converted_lead_id: row?.record_id || '',
        assigned_sales_rep: row?.assigned_sales_rep || '',
        business_address: row?.business_address || '',
        notes: row?.notes || '',
        last_contact_date: row?.last_contact_date || '',
      },
    });

    const newClientId = response?.clients_dataNode;

    if (response?.status !== 'success' || !newClientId) {
      MosyNotify({ message: response?.message || 'Failed to create client record', icon: 'times-circle', iconColor: 'text-danger' });
      return;
    }

    const updateResult = await update(row.record_id, {
      converted_client_id: newClientId,
      lead_status: 'Converted',
    });

    if (updateResult?.ok === false) {
      MosyNotify({ message: 'Client created, but this lead could not be marked as converted.', icon: 'exclamation-triangle', iconColor: 'text-warning' });
      refresh?.();
      return;
    }

    MosyNotify({ message: 'Lead converted to client successfully', icon: 'check-circle', iconColor: 'text-success' });
    refresh?.();
  },

  // Preset-create a Quotation, prefilled from this lead. Quotations only
  // has client_id (no lead_id column) — that's locked to converted_client_id
  // ONLY once this lead has actually been converted; otherwise it's left
  // blank/editable so the user can pick the right client by hand.
  add_quotation: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row) return;
    openEntityCreateModal({
      ProfileComponent: QuotationsProfile,
      schema: QuotationsSchema,
      title: `New Quotation — ${row.full_name || row.business_name || ''}`,
      presetValues: {
        quotation_title: `Quotation for ${row.full_name || row.business_name || ''}`,
        ...buildPresetFromRow(row, [
          { sourceKey: 'converted_client_id', destKey: 'client_id' },
        ]),
      },
      onSaved: refresh,
    });
  },

  // Opens the shared call launcher — leads already uses the generic
  // field names (full_name/phone_number/email_address) the composer/call
  // launcher read by default, so the raw row can be passed straight
  // through with no mapping.
  call: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCommsSmartCall({ profileDataNode: row });
  },

  // Opens the shared smart-message composer for this lead.
  send_message: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosySendSmartMessage({ profileDataNode: row });
  },

  // Popup message history scoped to this lead — messages written via the
  // send_message action above stamp related_record_id to the lead's own
  // record_id, so this is just filtering back on that same key.
  message_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      "",
      <MessagesList
        customProfilePath="../messages/profile"
        title={`Message history — ${row.full_name || row.business_name || ''}`}
        fixedQuery={{ relatedRecordId: btoa(row.record_id) }}
        hiddenActions={['new']}
      />,
      true,
      "modal1",
      "mosycard_wide"
    );
  },

  // Popup call history scoped to this lead — same relatedRecordId
  // convention the call action above writes to.
  call_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      "",
      <CallhistoryList
        customProfilePath="../callhistory/profile"
        title={`Call history — ${row.full_name || row.business_name || ''}`}
        fixedQuery={{ relatedRecordId: btoa(row.record_id) }}
        hiddenActions={['new']}
      />,
      true,
      "modal1",
      "mosycard_wide"
    );
  },

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default LeadsActions
