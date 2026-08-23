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

  // Grid-toolbar smart filters.
  filter_by_client: (ctx) => openSmartMapFilter(ctx, {
    title: 'Filter by client',
    searchSchema: ContactsSchema,
    displayField: 'contact_name',
    valueField: 'record_id',
    localColumnKey: 'client_id',
  }),

  filter_by_status: (ctx) => openSmartTagFilter(ctx, {
    title: 'Filter by status',
    columnKey: 'payment_status',
  }),

  filter_by_month: (ctx) => openSmartTagFilter(ctx, {
    title: 'Filter by month',
    columnKey: 'revenue_month',
  }),

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default RevenueplanActions
