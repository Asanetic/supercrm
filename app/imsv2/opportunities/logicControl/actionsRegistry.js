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
import { callContactAction, messageContactAction } from "../../moduleControl/UiControl/contactTouchActions";
import { ContactsSchema } from "../../contacts/ContactsSchema";
import ActivitiesProfile from "../../activities/uiControl/ActivitiesProfile";
import { ActivitiesSchema } from "../../activities/ActivitiesSchema";

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
  // this deal.
  add_activity: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row) return;
    openEntityCreateModal({
      ProfileComponent: ActivitiesProfile,
      schema: ActivitiesSchema,
      title: `New Activity — ${row.title || ''}`,
      presetValues: buildPresetFromRow(row, [
        { sourceKey: 'opportunity_id', destKey: 'opportunity_id', destSchema: ActivitiesSchema, labelValue: row.title },
        { sourceKey: 'contact_id', destKey: 'contact_id', destSchema: ActivitiesSchema, labelValue: row.contact_name },
      ]),
      onSaved: refresh,
    });
  },

  // Quick-edit modal — advance the pipeline stage (and status) without
  // leaving the grid/list.
  update_stage: (ctx) => {
    quickEditFromRow(ctx, {
      fieldKeys: ['stage', 'status'],
      title: 'Update stage — {{title}}',
      fieldOverrides: {
        stage: { colSpan: 6 },
        status: { colSpan: 6 },
      },
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
    valueField: 'record_id',
    localColumnKey: 'contact_id',
  }),

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default OpportunitiesActions
