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
import { MosyCard } from "../../../components/MosyCard";
import MessagesList from "../../messages/uiControl/MessagesList";
import CallhistoryList from "../../callhistory/uiControl/CallhistoryList";
import SmartpaymentrequestsList from "../../smartpaymentrequests/uiControl/SmartpaymentrequestsList";
import PaymentsList from "../../payments/uiControl/PaymentsList";

const apiRoutes = getApiRoutes();

// Revenueplan rows only carry a client_id pointer — no name/phone/email of
// their own — so the comms actions below need to resolve the linked client
// first. Falls back to null (callers fall back to the plan's own title/id).
async function resolvePlanClient(row) {
  if (!row?.client_id) return null;
  const response = await mosyGetData({
    endpoint: apiRoutes.clients.base,
    params: { recordId: btoa(String(row.client_id)) },
  });
  const clientRows = Array.isArray(response?.data) ? response.data : [];
  return clientRows[0] || null;
}

// Builds the comms profileDataNode: recipient identity/contact from the
// linked client, but record_id kept as THIS plan's so the message/call log
// stays attached to the revenue plan, not the client.
function buildPlanCommsProfile(row, client) {
  return {
    ...(client || {}),
    full_name: client?.full_name || client?.business_name || row?.revenue_title || 'Client',
    phone_number: client?.phone_number || '',
    email_address: client?.email_address || '',
    record_id: row?.record_id || '',
    client_id: row?.client_id || '',
  };
}

const RevenueplanActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Opens the shared smart-message composer, prefilled with the linked
  // client's contact details (SMS/email/WhatsApp).
  send_message: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const client = await resolvePlanClient(row);
    MosySendSmartMessage({ profileDataNode: buildPlanCommsProfile(row, client) });
  },

  // Opens the shared call launcher (phone/WhatsApp) against the linked
  // client, and logs the call against this revenue plan.
  call: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const client = await resolvePlanClient(row);
    MosyCommsSmartCall({ profileDataNode: buildPlanCommsProfile(row, client) });
  },

  // Opens the payment-request builder pre-filled with the linked client's
  // details and this plan's expected amount.
  request_payment: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const client = await resolvePlanClient(row);
    MosyCreatePayRequest({
      requestData: {
        payer_name: client?.full_name || client?.business_name || '',
        payer_phone: client?.phone_number || '',
        payer_email: client?.email_address || '',
        request_title: row?.revenue_title || '',
        amount_requested: row?.expected_amount || '',
      },
      title: `Request payment — ${row?.revenue_title || ''}`,
    });
  },

  // Navigate to the linked deal's own profile page.
  view_deal: ({ rows, router }) => {
    const row = rows?.[0];
    if (!row?.deal_id || !router) return;
    router.push(`/novaerpv9/deals/profile?deals_dataNode=${btoa(row.deal_id)}`);
  },

  // Popup message history scoped to this plan — messages written via the
  // send_message action above stamp related_record_id to the plan's own
  // record_id, so this is just filtering back on that same key.
  message_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      "",
      <MessagesList
        customProfilePath="../messages/profile"
        title={`Message history — ${row.revenue_title || row.record_id || ''}`}
        fixedQuery={{ relatedRecordId: btoa(row.record_id) }}
        hiddenActions={['new']}
      />,
      true,
      "modal4",
      "mosycard_wide"
    );
  },

  // Popup call history scoped to this plan — same relatedRecordId
  // convention the call action above writes to.
  call_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      "",
      <CallhistoryList
        customProfilePath="../callhistory/profile"
        title={`Call history — ${row.revenue_title || row.record_id || ''}`}
        fixedQuery={{ relatedRecordId: btoa(row.record_id) }}
        hiddenActions={['new']}
      />,
      true,
      "modal4",
      "mosycard_wide"
    );
  },

  // Popup payment REQUEST history (smartpaymentrequests) scoped to this
  // plan — same relatedRecordId convention the request_payment action
  // above writes to.
  request_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      "",
      <SmartpaymentrequestsList
        customProfilePath="../smartpaymentrequests/profile"
        title={`Payment request history — ${row.revenue_title || row.record_id || ''}`}
        fixedQuery={{ relatedRecordId: btoa(row.record_id) }}
        hiddenActions={['new']}
      />,
      true,
      "modal4",
      "mosycard_wide"
    );
  },

  // Popup actual RECEIVED payments (payments module) scoped to this plan.
  // Payments doesn't carry related_record_id — it has its own explicit
  // deal_id/client_id columns — so scope by deal_id when this plan has
  // one (most specific), else fall back to client_id.
  payment_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const fixedQuery = row.deal_id
      ? { dealId: btoa(row.deal_id) }
      : { clientId: btoa(row.client_id || '') };
    MosyCard(
      "",
      <PaymentsList
        customProfilePath="../payments/profile"
        title={`Payment history — ${row.revenue_title || row.record_id || ''}`}
        fixedQuery={fixedQuery}
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


export default RevenueplanActions
