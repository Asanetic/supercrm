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
import { MosyCreatePayRequest } from "../../UiControl/MosyGeneratePaymentRequest";
import { MosyCard } from "../../../components/MosyCard";
import DealsList from "../../deals/uiControl/DealsList";
import DealsProfile from "../../deals/uiControl/DealsProfile";
import { DealsSchema } from "../../deals/DealsSchema";
import { buildPresetFromRow, openEntityCreateModal } from "../../moduleControl/UiControl/EntityCreateModal";
import MessagesList from "../../messages/uiControl/MessagesList";
import CallhistoryList from "../../callhistory/uiControl/CallhistoryList";

const ClientsActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Opens the shared smart-message composer for this client (SMS/email/WhatsApp).
  // Row already uses the generic field names (full_name/business_name,
  // email_address, phone_number) MosySendSmartMessage reads by default.
  send_message: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosySendSmartMessage({ profileDataNode: row });
  },

  // Opens the shared call launcher (phone/WhatsApp) and logs the call
  // against this client via smartapi's logUtilCall.
  call: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCommsSmartCall({ profileDataNode: row });

    return false
  },

  // Opens the payment-request builder pre-filled with this client's
  // details, then hands off to the smart-message composer to send it.
  request_payment: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCreatePayRequest({
      requestData: {
        payer_name: row?.full_name || row?.business_name || '',
        payer_phone: row?.phone_number || '',
        payer_email: row?.email_address || '',
      },
      title: `Request payment — ${row?.full_name || row?.business_name || ''}`,
    });

    return false
  },

  // Popup a list of deals scoped to this client — deals' route.js resolves
  // the camelCase "clientId" URL param back to its client_id column.
  view_deals: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      "",
      <DealsList
        customProfilePath="../deals/profile"
        title={`Deals for ${row.full_name || row.business_name || ''}`}
        fixedQuery={{ clientId: btoa(row.record_id) }}
        hiddenActions={['new']}
      />,
      true,
      "modal4",
      "mosycard_wide"
    );
  },

  // Preset-create a Deal with client_id locked to this client's record_id.
  add_deal: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row) return;
    openEntityCreateModal({
      ProfileComponent: DealsProfile,
      schema: DealsSchema,
      title: `New Deal — ${row.full_name || row.business_name || ''}`,
      presetValues: buildPresetFromRow(row, [
        { sourceKey: 'record_id', destKey: 'client_id' },
      ]),
      fieldOverrides: { client_id: { editable: false, type: 'hidden' } },
      sectionFieldOrder: { basic_information: ['deal_title', 'client_id'] },
      onSaved: refresh,
    });

    return false
  },

  // Popup message history scoped to this client — messages written via
  // the send_message action above stamp related_record_id to the
  // client's own record_id, so this is just filtering back on that key.
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
      "modal4",
      "mosycard_wide"
    );
  },

  // Popup call history scoped to this client — same relatedRecordId
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
      "modal4",
      "mosycard_wide"
    );
  },

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default ClientsActions
