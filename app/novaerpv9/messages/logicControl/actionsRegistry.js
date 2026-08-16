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

// This row's contact fields are recipient_name/recipient_phone/
// recipient_email — the composer/call-launcher read the GENERIC keys
// (full_name/phone_number/email_address), so map across first instead of
// passing the raw row straight through. record_id is remapped to
// related_record_id (the client/deal this message was originally about)
// so a resend/forward/call keeps linking back to that same record instead
// of to this message row itself.
function toProfileDataNode(row) {
  return {
    ...row,
    full_name: row?.recipient_name || 'Client',
    phone_number: row?.recipient_phone || '',
    email_address: row?.recipient_email || '',
    record_id: row?.related_record_id || row?.record_id || '',
  };
}

const MessagesActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Places a call to this message's recipient (phone/WhatsApp), logged
  // against the same client/deal record the message was originally about.
  call: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCommsSmartCall({ profileDataNode: toProfileDataNode(row) });
  },

  // Re-sends this exact message (subject + body prefilled) to the SAME
  // recipient it originally went to.
  resend_message: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosySendSmartMessage({
      profileDataNode: toProfileDataNode(row),
      uiOptions: {
        modalTitle: 'Resend Message',
        subject: row?.message_subject || '',
        message: row?.message_content || '',
      },
    });
  },

  // Forwards this message's subject/body to a DIFFERENT recipient — same
  // content, but the composer opens with recipient fields blank for the
  // user to fill in.
  forward_message: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const profileDataNode = {
      ...toProfileDataNode(row),
      full_name: 'Client',
      phone_number: '',
      email_address: '',
    };
    MosySendSmartMessage({
      profileDataNode,
      uiOptions: {
        modalTitle: 'Forward Message',
        subject: row?.message_subject || '',
        message: row?.message_content || '',
      },
    });
  },

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default MessagesActions
