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
import { callContactAction, messageContactAction, resolveContactRecipient } from "../../moduleControl/UiControl/contactTouchActions";
import { openEntityCreateModal, buildPresetFromRow } from "../../moduleControl/UiControl/EntityCreateModal";
import { quickEditFromRow } from "../../moduleControl/UiControl/QuickEditModal";
import { MosyCard } from "../../../components/MosyCard";
import { MosyCreatePayRequest } from "../../UiControl/MosyGeneratePaymentRequest";
import { MosySendSmartReminder } from "../../UiControl/MosySmartReminder";
import OpportunitiesProfile from "../../opportunities/uiControl/OpportunitiesProfile";
import { OpportunitiesSchema } from "../../opportunities/OpportunitiesSchema";
import ActivitiesProfile from "../../activities/uiControl/ActivitiesProfile";
import { ActivitiesSchema } from "../../activities/ActivitiesSchema";
import ActivitiesList from "../../activities/uiControl/ActivitiesList";
import CallsList from "../../calls/uiControl/CallsList";
import MessagesList from "../../messages/uiControl/MessagesList";
import MosyremindersList from "../../mosyreminders/uiControl/MosyremindersList";
import PaymenthistoryList from "../../paymenthistory/uiControl/PaymenthistoryList";
import PaymenthistoryProfile from "../../paymenthistory/uiControl/PaymenthistoryProfile";
import { PaymenthistorySchema } from "../../paymenthistory/PaymenthistorySchema";
import { openSmartTagFilter, openSmartMapFilter } from "../../moduleControl/UiControl/smartFilterActions";
import { ContactsSchema } from "../../contacts/ContactsSchema";

// Revenueplan's FK column is 'client_id', not the 'contact_id' default
// every helper below assumes — pass this everywhere a row's contact needs
// resolving/scoping.
const CONTACT_OPTS = { contactIdKey: 'client_id' };

const RevenueplanActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Opens the shared Smart Call picker / Smart Messenger composer for this
  // plan's linked contact — see moduleControl/UiControl/contactTouchActions.jsx.
  call: (ctx) => callContactAction(ctx, CONTACT_OPTS),
  send_message: (ctx) => messageContactAction(ctx, CONTACT_OPTS),

  // Opens the shared Smart Reminder composer for this plan's linked
  // contact — related_record_id points back at THIS revenue plan record
  // (its own record_id), same self-referencing convention Contacts'/
  // Opportunities' own set_reminder actions use.
  set_reminder: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const recipient = await resolveContactRecipient(row, CONTACT_OPTS);
    MosySendSmartReminder({
      profileDataNode: { ...recipient, related_record_id: row.record_id },
      uiOptions: { modalTitle: `Set Reminder — ${row.title || row.contact_name || ''}` },
    });
  },

  // Opens the shared "generate payment request" card, prefilled with this
  // plan's linked contact's name/phone/email.
  request_payment: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const recipient = await resolveContactRecipient(row, CONTACT_OPTS);
    MosyCreatePayRequest({
      requestData: {
        payer_name: recipient?.full_name || recipient?.contact_name || row.contact_name,
        payer_phone: recipient?.phone_number,
        payer_email: recipient?.email,
        related_record_id: row.record_id,
      },
      title: `Request payment — ${row.title || row.contact_name || ''}`,
    });
  },

  // Pops a preset Payment history create form, locking the new payment's
  // expected_income_id/contact_id to this plan's own record/linked client
  // — see paymenthistory/PaymenthistorySchema.js's resolveField('expected_income_id', ...)
  // / resolveField('contact_id', ...) for the liveSearch fields being preset.
  record_payment: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row?.record_id) return;
    openEntityCreateModal({
      ProfileComponent: PaymenthistoryProfile,
      schema: PaymenthistorySchema,
      title: `Record Payment — ${row.title || row.contact_name || ''}`,
      presetValues: buildPresetFromRow(row, [
        { sourceKey: 'record_id', destKey: 'expected_income_id', destSchema: PaymenthistorySchema, labelValue: row.title },
        { sourceKey: 'client_id', destKey: 'contact_id', destSchema: PaymenthistorySchema, labelValue: row.contact_name },
      ]),
      onSaved: refresh,
    });
  },

  // Pops a preset Deals create form, locking the new deal's contact_id to
  // this plan's linked client.
  add_deal: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row?.client_id) return;
    openEntityCreateModal({
      ProfileComponent: OpportunitiesProfile,
      schema: OpportunitiesSchema,
      title: `New Deal — ${row.contact_name || ''}`,
      presetValues: buildPresetFromRow(row, [
        { sourceKey: 'client_id', destKey: 'contact_id', destSchema: OpportunitiesSchema, labelValue: row.contact_name },
      ]),
      onSaved: refresh,
    });
  },

  // Pops a preset Activity create form, locking the new activity's
  // contact_id (and opportunity_id, when this plan is tied to a deal) to
  // match this plan.
  add_activity: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row?.client_id) return;
    openEntityCreateModal({
      ProfileComponent: ActivitiesProfile,
      schema: ActivitiesSchema,
      title: `New Activity — ${row.contact_name || ''}`,
      presetValues: buildPresetFromRow(row, [
        { sourceKey: 'client_id', destKey: 'contact_id', destSchema: ActivitiesSchema, labelValue: row.contact_name },
        { sourceKey: 'deal_id', destKey: 'opportunity_id', destSchema: ActivitiesSchema, labelValue: row.title },
      ]),
      onSaved: refresh,
    });
  },

  // Related-record popups. Calls/messages sent from any module end up
  // scoped to the CONTACT (see contactTouchActions.jsx), so those two
  // scope by this plan's client_id; Reminders/Activities scope by
  // whichever id set_reminder/add_deal/add_activity above actually lock.
  // Scoped by this plan's OWN record_id, since payment_history rows point
  // back at the expected_revenue record they pay off (expected_income_id),
  // not at the client — see resolveField('expected_income_id', ...) above.
  view_payment_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.record_id) return;
    MosyCard(
      '',
      React.createElement(PaymenthistoryList, {
        customProfilePath: '../paymenthistory/profile',
        title: `Payment History — ${row.title || row.contact_name || ''}`,
        fixedQuery: { expectedIncomeId: btoa(row.record_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_call_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.client_id) return;
    MosyCard(
      '',
      React.createElement(CallsList, {
        customProfilePath: '../calls/profile',
        title: `Call History — ${row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.client_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_message_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.client_id) return;
    MosyCard(
      '',
      React.createElement(MessagesList, {
        customProfilePath: '../messages/profile',
        title: `Message History — ${row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.client_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_reminders: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.record_id) return;
    MosyCard(
      '',
      React.createElement(MosyremindersList, {
        customProfilePath: '../mosyreminders/profile',
        title: `Reminders — ${row.title || row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.record_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_activities: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.client_id) return;
    MosyCard(
      '',
      React.createElement(ActivitiesList, {
        customProfilePath: '../activities/profile',
        title: `Activities — ${row.contact_name || ''}`,
        fixedQuery: { contactId: btoa(row.client_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  // Quick-edit modal — update collection type + payment status without
  // leaving the grid/list. Same pattern as opportunities' update_stage.
  // getId uses btoa(primkey) — the one id shape every module's update
  // endpoint accepts, unlike row.record_id which points at a different
  // column depending on schema.
  update_status: (ctx) => {
    quickEditFromRow(ctx, {
      fieldKeys: ['collection_status', 'payment_status','revenue_description'],
      title: 'Update status — {{title}}',
      fieldOverrides: {
        collection_status: { colSpan: 6 },
        payment_status: { colSpan: 6 },
        revenue_description: { colSpan: 12 },
      },
      getId: (row) => btoa(String(row.primkey)),
    });
  },

  // Grid-toolbar smart filters. combine:true on all four so they stack
  // (client AND status AND month AND collection type) instead of each
  // new pick wiping out the previous one — see openSmartTagFilter's/
  // openSmartMapFilter's "EXCLUSIVE BY DEFAULT" note in smartFilterActions.jsx.
  filter_by_client: (ctx) => openSmartMapFilter(ctx, {
    title: 'Filter by client',
    searchSchema: ContactsSchema,
    displayField: 'contact_name',
    valueField: 'contact_id',
    localColumnKey: 'client_id',
    combine: true,
  }),

  filter_by_status: (ctx) => openSmartTagFilter(ctx, {
    title: 'Filter by status',
    columnKey: 'payment_status',
    combine: true,
  }),

  filter_by_month: (ctx) => openSmartTagFilter(ctx, {
    title: 'Filter by month',
    columnKey: 'revenue_month',
    combine: true,
  }),

  filter_by_collection_type: (ctx) => openSmartTagFilter(ctx, {
    title: 'Filter by collection type',
    columnKey: 'collection_status',
    combine: true,
  }),

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default RevenueplanActions
