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

import { quickEditFromRow } from "../../moduleControl/UiControl/QuickEditModal";
import { openSmartTagFilter, openSmartDateFilter, openSmartMapFilter } from "../../moduleControl/UiControl/smartFilterActions";
import { openEntityCreateModal, buildPresetFromRow } from "../../moduleControl/UiControl/EntityCreateModal";
import { callContactAction, messageContactAction, resolveContactRecipient, deriveReminderHeadline, buildActionNeededReminder } from "../../moduleControl/UiControl/contactTouchActions";
import { ContactsSchema } from "../../contacts/ContactsSchema";
import ActivitiesProfile from "../../activities/uiControl/ActivitiesProfile";
import { ActivitiesSchema } from "../../activities/ActivitiesSchema";
import NotesProfile from "../../notes/uiControl/NotesProfile";
import { NotesSchema } from "../../notes/NotesSchema";
import { MosyCreatePayRequest } from "../../UiControl/MosyGeneratePaymentRequest";
import { MosySendSmartReminder } from "../../UiControl/MosySmartReminder";

const OpportunitiesActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Opens the shared Smart Call picker / Smart Messenger composer for this
  // deal's linked contact — see moduleControl/UiControl/contactTouchActions.jsx.
  call: (ctx) => callContactAction(ctx),
  send_message: (ctx) => messageContactAction(ctx),

  // Pops a preset Activity create form (Meet / Call / Task / Follow Up /
  // Message), locking the new activity's opportunity_id AND contact_id to
  // this deal, and carrying the deal's own title/description across so the
  // activity doesn't start blank.
  add_activity: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row) return;
    openEntityCreateModal({
      ProfileComponent: ActivitiesProfile,
      schema: ActivitiesSchema,
      title: `New Activity — ${row.title || ''}`,
      presetValues: {
        ...buildPresetFromRow(row, [
          { sourceKey: 'opportunity_id', destKey: 'opportunity_id', destSchema: ActivitiesSchema, labelValue: row.title },
          { sourceKey: 'contact_id', destKey: 'contact_id', destSchema: ActivitiesSchema, labelValue: row.contact_name },
        ]),
        subject: row.title ? `Deal — ${row.title}` : '',
        description: (row.description || '').trim(),
      },
      onSaved: refresh,
    });
  },

  // A deal row only carries the linked contact's CACHED name
  // (contact_name) — not phone/email. resolveContactRecipient() looks the
  // real contact record up via contact_id and merges phone_number/email
  // onto a copy of the row before handing it to the payment/reminder UIs,
  // same lookup `call`/`send_message` above already rely on.
  request_payment: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const recipient = await resolveContactRecipient(row);
    MosyCreatePayRequest({
      requestData: {
        payer_name: recipient?.full_name || recipient?.contact_name || row.contact_name,
        payer_phone: recipient?.phone_number,
        payer_email: recipient?.email,
        related_record_id: row.opportunity_id,
      },
      title: `Request payment — ${row.title || row.contact_name || ''}`,
    });
  },

  // Pops a preset Note create form, locking the new note's contact_id AND
  // opportunity_id to this deal (and its linked contact).
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

  // Opens the shared Smart Reminder composer for this deal's linked
  // contact — same phone/email lookup as request_payment above. Subject
  // falls back to a trimmed description when the deal has no title; the
  // message body is the same "Action needed" brief activities' own
  // add_reminder builds — who's involved, their phone/email, what the
  // deal's about (description), and the suggested next step (next_action).
  set_reminder: async ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const recipient = await resolveContactRecipient(row);
    const headline = deriveReminderHeadline(row.title, row.description);
    MosySendSmartReminder({
      profileDataNode: {
        ...recipient,
        related_record_id: row.opportunity_id,
      },
      uiOptions: {
        modalTitle: `Set Reminder — ${row.title || row.contact_name || ''}`,
        subject: `Action needed — ${headline}`,
        message: buildActionNeededReminder({
          headline,
          contactName: recipient?.full_name || recipient?.contact_name || row.contact_name,
          note: row.stage ? `${row.stage} deal awaiting follow-up` : undefined,
          phone: recipient?.phone_number,
          email: recipient?.email,
          askedAbout: row.description,
          suggested: row.next_action,
        }),
      },
    });
  },

  // Quick-edit modal — advance the pipeline stage (and status) without
  // leaving the grid/list. getId uses btoa(primkey) — the one id shape
  // every module's update endpoint accepts (decoded server-side straight
  // to the primkey column), unlike row.record_id which points at a
  // different column depending on schema.
  update_stage: (ctx) => {
    quickEditFromRow(ctx, {
      fieldKeys: ['stage', 'status'],
      title: 'Update stage — {{title}}',
      fieldOverrides: {
        stage: { colSpan: 6 },
        status: { colSpan: 6 },
      },
      getId: (row) => btoa(String(row.primkey)),
    });
  },

  // Grid-toolbar smart filters.
  filter_by_status: (ctx) => openSmartTagFilter(ctx, {
    title: 'Filter by status',
    columnKey: 'status',
  }),

  filter_by_stage: (ctx) => openSmartTagFilter(ctx, {
    title: 'Filter by stage',
    columnKey: 'stage',
  }),

  filter_by_date: (ctx) => openSmartDateFilter(ctx, {
    title: 'Filter by expected date',
    columnKey: 'expected_date',
  }),

  filter_by_client: (ctx) => openSmartMapFilter(ctx, {
    title: 'Filter by client',
    searchSchema: ContactsSchema,
    displayField: 'contact_name',
    valueField: 'contact_id',
    localColumnKey: 'contact_id',
  }),

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default OpportunitiesActions
