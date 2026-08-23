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

import React from 'react';
import { MosySendSmartMessage } from "../../UiControl/MosySmartComms";
import { MosySendSmartReminder } from "../../UiControl/MosySmartReminder";
import { MosyCommsSmartCall } from "../../UiControl/MosySmartCommsCalls";
import { MosyCreatePayRequest } from "../../UiControl/MosyGeneratePaymentRequest";
import { openEntityCreateModal, buildPresetFromRow } from "../../moduleControl/UiControl/EntityCreateModal";
import { MosyCard } from "../../../components/MosyCard";
import OpportunitiesList from "../../opportunities/uiControl/OpportunitiesList";
import OpportunitiesProfile from "../../opportunities/uiControl/OpportunitiesProfile";
import { OpportunitiesSchema } from "../../opportunities/OpportunitiesSchema";
import PaymentrequestsList from "../../paymentrequests/uiControl/PaymentrequestsList";
import SmartpaymentsList from "../../smartpayments/uiControl/SmartpaymentsList";
import CallsList from "../../calls/uiControl/CallsList";
import MessagesList from "../../messages/uiControl/MessagesList";
import ActivitiesProfile from "../../activities/uiControl/ActivitiesProfile";
import { ActivitiesSchema } from "../../activities/ActivitiesSchema";
import { openSmartTagFilter } from '../../moduleControl/UiControl/smartFilterActions';

// The shared Smart Call / Smart Messenger UIs read recipient info off
// generic keys (full_name / record_id) — a contacts row carries them as
// contact_name / contact_id, so map those across before handing the row
// to those components.
function toRecipient(row) {
  return {
    ...row,
    record_id: row?.contact_id,
    full_name: row?.contact_name,
  };
}

const ContactsActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.contact_name || row?.company_name || row?.contact_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Opens the shared Smart Call picker (tel: / WhatsApp) for this contact.
  call: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCommsSmartCall({ profileDataNode: toRecipient(row) });
  },

    filter_by_status: (ctx) => {
      openSmartTagFilter(ctx, {
      title: 'Filter by status',
      columnKey: 'status',
    })
    return false
  },
  filter_by_type: (ctx) => {
    openSmartTagFilter(ctx, {
    title: 'Filter by type',
    columnKey: 'type',
  })
  return false
},

filter_by_source: (ctx) => {
  openSmartTagFilter(ctx, {
  title: 'Filter by source',
  columnKey: 'source',
})
return false
},

  // Opens the shared Smart Messenger composer for this contact.
  send_message: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosySendSmartMessage({ profileDataNode: toRecipient(row) });
  },

  // Opens the shared Smart Reminder composer for this contact.
  set_reminder: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosySendSmartReminder({
      profileDataNode: { ...toRecipient(row), related_record_id: row.contact_id },
      uiOptions: { modalTitle: `Set Reminder — ${row.contact_name || ''}` },
    });
  },

  // Opens the shared "generate payment request" card, prefilled with this
  // contact's name/phone/email.
  request_payment: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCreatePayRequest({
      requestData: {
        payer_name: row.contact_name,
        payer_phone: row.phone_number,
        payer_email: row.email,
        related_record_id : row.contact_id
      },
      title: `Request payment —  ${row.contact_name || ''}`,
    });
    return false;
  },

  // Pops a preset Deals create form, locking the new deal's contact_id to
  // this contact.
  add_deal: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row) return;
    openEntityCreateModal({
      ProfileComponent: OpportunitiesProfile,
      schema: OpportunitiesSchema,
      title: `New Deal — ${row.contact_name || ''}`,
      presetValues: buildPresetFromRow(row, [
        { sourceKey: 'contact_id', destKey: 'contact_id', destSchema: OpportunitiesSchema, labelValue: row.contact_name },
      ]),
      onSaved: refresh,
    });
  },

  // Pops a preset Activity create form (Meet / Call / Task / Follow Up /
  // Message), locking the new activity's contact_id to this contact.
  add_activity: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row) return;
    openEntityCreateModal({
      ProfileComponent: ActivitiesProfile,
      schema: ActivitiesSchema,
      title: `New Activity — ${row.contact_name || ''}`,
      presetValues: buildPresetFromRow(row, [
        { sourceKey: 'contact_id', destKey: 'contact_id', destSchema: ActivitiesSchema, labelValue: row.contact_name },
      ]),
      onSaved: refresh,
    });
  },

  // Related-record popups — scoped to this contact via fixedQuery.
  // fixedQuery keys are camelCase URL params the OTHER module's route.js
  // resolves back to its own snake_case DB columns.
  view_deals: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.contact_id) return;
    MosyCard(
      '',
      React.createElement(OpportunitiesList, {
        customProfilePath: '../opportunities/profile',
        title: `Deals — ${row.contact_name || ''}`,
        fixedQuery: { contactId: btoa(row.contact_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  // paymentrequests/smartpayments have no FK back to contacts — scope by
  // this contact's phone number (payer_phone) instead.
  view_payment_requests: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      '',
      React.createElement(PaymentrequestsList, {
        customProfilePath: '../paymentrequests/profile',
        title: `Payment Requests — ${row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.contact_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_payments: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      '',
      React.createElement(SmartpaymentsList, {
        customProfilePath: '../smartpayments/profile',
        title: `Payments — ${row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.contact_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  // smart_calls/smart_messages rows carry related_record_id set to the
  // contact's contact_id at send time (see MosySmartCommsCalls.jsx /
  // send-util-message.js, both of which take it from `record_id` on the
  // profileDataNode `call`/`send_message` above hand them — mapped from
  // contact_id via toRecipient()) — same relatedRecordId scoping as
  // view_payment_requests/view_payments above.
  view_call_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      '',
      React.createElement(CallsList, {
        customProfilePath: '../calls/profile',
        title: `Call History — ${row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.contact_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_message_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    MosyCard(
      '',
      React.createElement(MessagesList, {
        customProfilePath: '../messages/profile',
        title: `Message History — ${row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.contact_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default ContactsActions
