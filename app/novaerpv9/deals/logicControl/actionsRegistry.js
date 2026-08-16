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
import { mosyGetData } from "../../../MosyUtils/hiveUtils";
import { getApiRoutes } from "../../AppRoutes/apiRoutesHandler";

const apiRoutes = getApiRoutes();

// Deals rows only carry a client_id pointer — no name/phone/email of their
// own — so the comms actions below need to resolve the linked client first.
// Falls back to null (callers fall back to the deal's own title/id).
async function resolveDealClient(row) {
  if (!row?.client_id) return null;
  const response = await mosyGetData({
    endpoint: apiRoutes.clients.base,
    params: { recordId: btoa(String(row.client_id)) },
  });
  const clientRows = Array.isArray(response?.data) ? response.data : [];
  return clientRows[0] || null;
}

// Builds the comms profileDataNode: recipient identity/contact from the
// linked client, but record_id kept as THIS deal's so the message/call log
// stays attached to the deal, not the client.
function buildDealCommsProfile(row, client) {
  return {
    ...(client || {}),
    full_name: client?.full_name || client?.business_name || row?.deal_title || 'Client',
    phone_number: client?.phone_number || '',
    email_address: client?.email_address || '',
    record_id: row?.record_id || '',
    client_id: row?.client_id || '',
  };
}

const DealsActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Opens the shared smart-message composer, prefilled with the deal's
  // linked client's contact details (SMS/email/WhatsApp).
  send_message: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const client = await resolveDealClient(row);
    MosySendSmartMessage({ profileDataNode: buildDealCommsProfile(row, client) });
  },

  // Opens the shared call launcher (phone/WhatsApp) against the deal's
  // linked client, and logs the call against this deal.
  call: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const client = await resolveDealClient(row);
    MosyCommsSmartCall({ profileDataNode: buildDealCommsProfile(row, client) });
  },

  // Opens the payment-request builder pre-filled with the deal's linked
  // client's details and this deal's value.
  request_payment: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const client = await resolveDealClient(row);
    MosyCreatePayRequest({
      requestData: {
        payer_name: client?.full_name || client?.business_name || '',
        payer_phone: client?.phone_number || '',
        payer_email: client?.email_address || '',
        request_title: row?.deal_title || '',
        amount_requested: row?.deal_value || '',
      },
      title: `Request payment — ${row?.deal_title || ''}`,
    });
  },

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default DealsActions
