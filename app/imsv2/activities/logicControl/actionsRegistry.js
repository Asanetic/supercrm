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
import { openSmartTagFilter, openSmartDateFilter, openSmartMapFilter } from "../../moduleControl/UiControl/smartFilterActions";
import { callContactAction, messageContactAction, resolveContactRecipient, deriveReminderHeadline, buildActionNeededReminder } from "../../moduleControl/UiControl/contactTouchActions";
import { openEntityCreateModal, buildPresetFromRow } from "../../moduleControl/UiControl/EntityCreateModal";
import { quickEditFromRow } from "../../moduleControl/UiControl/QuickEditModal";
import { ContactsSchema } from "../../contacts/ContactsSchema";
import { OpportunitiesSchema } from "../../opportunities/OpportunitiesSchema";
import { MosySendSmartReminder } from "../../UiControl/MosySmartReminder";
import { MosyCard } from "../../../components/MosyCard";
import CallsList from "../../calls/uiControl/CallsList";
import MessagesList from "../../messages/uiControl/MessagesList";
import MosyremindersList from "../../mosyreminders/uiControl/MosyremindersList";
import NotesProfile from "../../notes/uiControl/NotesProfile";
import NotesList from "../../notes/uiControl/NotesList";
import { NotesSchema } from "../../notes/NotesSchema";

const ActivitiesActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.contact_name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Opens the shared Smart Call picker / Smart Messenger composer for this
  // activity's linked contact — see moduleControl/UiControl/contactTouchActions.jsx.
  call: (ctx) => callContactAction(ctx),
  send_message: (ctx) => messageContactAction(ctx),

  // Was passing the raw activities row straight through — activities rows
  // have no phone_number/email of their own (only contact_id/contact_name),
  // so the composer's recipient fields came up blank, and related_record_id
  // was never set at all (nothing for view_reminders below to scope by).
  // resolveContactRecipient() does the same contact_id lookup call/
  // send_message already rely on.
  // Subject falls back to a trimmed description when the activity has no
  // title/subject; the message body is the same "Action needed" brief
  // Opportunities' own set_reminder builds — who's involved, their
  // phone/email, what the activity's about (description), and the
  // suggested next step (outcome, when one's already been logged).
  add_reminder: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const recipient = await resolveContactRecipient(row);
    const headline = deriveReminderHeadline(row.title || row.subject, row.description);
    MosySendSmartReminder({
      profileDataNode: { ...recipient, related_record_id: row.activity_id },
      uiOptions: {
        modalTitle: `Set Reminder — ${row.title || row.contact_name || ''}`,
        subject: `Action needed — ${headline}`,
        message: buildActionNeededReminder({
          headline,
          contactName: recipient?.full_name || recipient?.contact_name || row.contact_name,
          note: row.type ? `${row.type} — ${row.status || 'pending'}` : undefined,
          phone: recipient?.phone_number,
          email: recipient?.email,
          askedAbout: row.description,
          suggested: row.outcome,
        }),
      },
    });
  },

  // Pops a preset Note create form, locking the new note's contact_id
  // (and opportunity_id, when this activity has one) to match.
  add_note: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row) return;
    openEntityCreateModal({
      ProfileComponent: NotesProfile,
      schema: NotesSchema,
      title: `New Note — ${row.title || row.contact_name || ''}`,
      presetValues: buildPresetFromRow(row, [
        { sourceKey: 'contact_id', destKey: 'contact_id', destSchema: NotesSchema, labelValue: row.contact_name },
        { sourceKey: 'opportunity_id', destKey: 'opportunity_id', destSchema: NotesSchema, labelValue: row.title },
      ]),
      onSaved: refresh,
    });
  },

  // Pops a quick-edit modal to update this activity's status alongside
  // its linked contact/opportunity, outcome and description — without
  // leaving the list/grid to open the full profile form.
  update_status: (ctx) => {
    quickEditFromRow(ctx, {
      fieldKeys: ['status', 'contact_id', 'opportunity_id', 'tag','outcome', 'description'],
      title: 'Update status — {{title}}',
      fieldOverrides: {
        status: { colSpan: 6 },
        tag: { colSpan: 6 },
        contact_id: { colSpan: 6 },
        opportunity_id: { colSpan: 6 },
        outcome: { colSpan: 12 },
        description: { colSpan: 12 },
      },
      getId: (row) => btoa(String(row.primkey)),

    });
  },

  // Related-record popups — Notes only carries contact_id/opportunity_id
  // FKs (no activity_id column), and every call/message sent from any
  // module ends up scoped to the CONTACT (see contactTouchActions.jsx),
  // so all four scope by this activity's linked contact_id — except
  // Reminders, which (like Contacts'/Opportunities' own set_reminder)
  // scope by the record that CREATED them, i.e. this activity's own id.
  view_messages: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.contact_id) return;
    MosyCard(
      '',
      React.createElement(MessagesList, {
        customProfilePath: '../messages/profile',
        title: `Messages — ${row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.contact_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_calls: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.contact_id) return;
    MosyCard(
      '',
      React.createElement(CallsList, {
        customProfilePath: '../calls/profile',
        title: `Calls — ${row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.contact_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_reminders: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.activity_id) return;
    MosyCard(
      '',
      React.createElement(MosyremindersList, {
        customProfilePath: '../mosyreminders/profile',
        title: `Reminders — ${row.title || row.contact_name || ''}`,
        fixedQuery: { relatedRecordId: btoa(row.activity_id) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  view_notes: ({ rows }) => {
    const row = rows?.[0];
    if (!row?.contact_id) return;
    MosyCard(
      '',
      React.createElement(NotesList, {
        customProfilePath: '../notes/profile',
        title: `Notes — ${row.contact_name || ''}`,
        fixedQuery: { contactId: btoa(row.contact_id) },
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
    localColumnKey: 'contact_id',
  }),

  filter_by_deal: (ctx) => openSmartMapFilter(ctx, {
    title: 'Filter by deal',
    searchSchema: OpportunitiesSchema,
    displayField: 'title',
    valueField: 'record_id',
    localColumnKey: 'opportunity_id',
  }),

  filter_by_status: (ctx) => openSmartTagFilter(ctx, {
    title: 'Filter by status',
    columnKey: 'status',
  }),

  filter_by_date: (ctx) => openSmartDateFilter(ctx, {
    title: 'Filter by activity date',
    columnKey: 'activity_date',
  }),

  filter_by_type: (ctx) => openSmartTagFilter(ctx, {
    title: 'Filter by type',
    columnKey: 'type',
  }),

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default ActivitiesActions
