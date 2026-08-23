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

import { openSmartTagFilter, openSmartDateFilter, openSmartMapFilter } from "../../moduleControl/UiControl/smartFilterActions";
import { callContactAction, messageContactAction } from "../../moduleControl/UiControl/contactTouchActions";
import { ContactsSchema } from "../../contacts/ContactsSchema";
import { OpportunitiesSchema } from "../../opportunities/OpportunitiesSchema";

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
