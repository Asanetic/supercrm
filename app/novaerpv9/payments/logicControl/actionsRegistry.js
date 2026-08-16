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
import { mosyGetData } from "../../../MosyUtils/hiveUtils";
import { getApiRoutes } from "../../AppRoutes/apiRoutesHandler";

const apiRoutes = getApiRoutes();

// Payments rows only carry a client_id pointer — no name/phone/email of
// their own — so the acknowledgment message below needs to resolve the
// linked client first. Falls back to null (caller falls back to "Client").
async function resolvePaymentClient(row) {
  if (!row?.client_id) return null;
  const response = await mosyGetData({
    endpoint: apiRoutes.clients.base,
    params: { recordId: btoa(String(row.client_id)) },
  });
  const clientRows = Array.isArray(response?.data) ? response.data : [];
  return clientRows[0] || null;
}

const PaymentsActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Opens the shared smart-message composer, prefilled with a payment
  // acknowledgment addressed to the linked client — reuses the SAME
  // MosySendSmartMessage util every other module's send_message uses.
  send_message: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const client = await resolvePaymentClient(row);

    const recipientName = client?.full_name || client?.business_name || 'Client';
    const amountLabel = row?.amount_paid
      ? `${Number(row.amount_paid).toLocaleString()}${row?.currency_code ? ` ${row.currency_code}` : ''}`
      : '';

    const acknowledgmentMessage = [
      `Hello ${recipientName},`,
      '',
      `We confirm receipt of your payment${row?.payment_for ? ` for ${row.payment_for}` : ''}.`,
      amountLabel ? `Amount: ${amountLabel}` : '',
      row?.receipt_number ? `Receipt No: ${row.receipt_number}` : '',
      row?.transaction_ref ? `Transaction Ref: ${row.transaction_ref}` : '',
      row?.paid_on ? `Paid On: ${row.paid_on}` : '',
      '',
      'Thank you.',
    ].filter(Boolean).join('\n');

    MosySendSmartMessage({
      profileDataNode: {
        full_name: recipientName,
        phone_number: client?.phone_number || '',
        email_address: client?.email_address || '',
        record_id: row?.record_id || '',
        client_id: row?.client_id || '',
      },
      uiOptions: {
        modalTitle: 'Send Payment Acknowledgment',
        subject: `Payment Acknowledgment${row?.receipt_number ? ` — ${row.receipt_number}` : ''}`,
        message: acknowledgmentMessage,
      },
    });
  },

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default PaymentsActions
