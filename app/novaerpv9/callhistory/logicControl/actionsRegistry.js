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
import CallhistoryList from "../uiControl/CallhistoryList";

// This row's contact fields are recipient_name/recipient_phone (no
// recipient_email on this table) — the composer/call-launcher read the
// GENERIC keys (full_name/phone_number/email_address), so map across
// first. record_id is remapped to related_record_id (the client/deal/plan
// this call was originally about) so a new call/message keeps linking
// back to that same record instead of to this call-history row itself.
function toProfileDataNode(row) {
  return {
    ...row,
    full_name: row?.recipient_name || 'Client',
    phone_number: row?.recipient_phone || '',
    email_address: row?.recipient_email || '',
    record_id: row?.related_record_id || row?.record_id || '',
  };
}

const CallhistoryActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Places another call to this log's recipient, logged against the same
  // related record this call was originally about.
  call: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCommsSmartCall({ profileDataNode: toProfileDataNode(row) });
  },

  // Opens the shared smart-message composer for this log's recipient.
  send_message: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosySendSmartMessage({ profileDataNode: toProfileDataNode(row) });
  },

  // Popup OTHER calls tied to the same related record (client/deal/plan)
  // this call was about — filters on related_record_id, not this row's
  // own record_id, so it surfaces sibling calls, not just this one.
  view_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.related_record_id) return;
    MosyCard(
      "",
      <CallhistoryList
        customProfilePath="../callhistory/profile"
        title={`Call history — ${row.recipient_name || ''}`}
        fixedQuery={{ relatedRecordId: btoa(row.related_record_id) }}
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


export default CallhistoryActions
