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
import { MosyCard } from "../../../components/MosyCard";
import { openEntityCreateModal } from "../../moduleControl/UiControl/EntityCreateModal";
import OpportunitiesProfile from "../../opportunities/uiControl/OpportunitiesProfile";
import { OpportunitiesSchema } from "../../opportunities/OpportunitiesSchema";
import OpportunitiesList from "../../opportunities/uiControl/OpportunitiesList";
import ActivitiesProfile from "../../activities/uiControl/ActivitiesProfile";
import { ActivitiesSchema } from "../../activities/ActivitiesSchema";
import ActivitiesList from "../../activities/uiControl/ActivitiesList";
import PaymenthistoryList from "../../paymenthistory/uiControl/PaymenthistoryList";
import { IncomesourcesSchema } from '../../incomesources/IncomesourcesSchema';
import { openSmartMapFilter, openSmartTagFilter } from '../../moduleControl/UiControl/smartFilterActions';

// [start, end] (plain YYYY-MM-DD strings) of the calendar month THIS
// income plan record is actually for — plan_month is a real `date` column
// (income_plan.plan_month, first-of-month) — not whatever month it happens
// to be today. Used to scope Payment History via the mosySecureSelect
// `${column}_start` / `${column}_end` range convention (see
// apiUtils/dataControl/dataUtils.js) against payment_history's own
// payment_date column — income plan has no direct FK to that table, so
// month is the only thing they share.
function monthRangeFromPlan(planMonth) {
  const d = planMonth ? new Date(planMonth) : new Date();
  const start = new Date(d.getFullYear(), d.getMonth(), 1);
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  const toDateStr = (x) => x.toISOString().slice(0, 10);
  return { start: toDateStr(start), end: toDateStr(end) };
}

// "Aug-2026"-style tag derived from THIS plan's own plan_month — shared
// with Activities/Opportunities' own `tag` groupedSelect column (see
// ActivitiesSchema.js / OpportunitiesSchema.js) since neither table has a
// real FK back to income plan. Presetting a new activity/deal's tag with
// this same value is what makes it show up under view_activities/
// view_deals below — a plain string match, not a relational join.
function tagFromPlan(planMonth) {
  const d = planMonth ? new Date(planMonth) : new Date();
  const month = d.toLocaleString('en-US', { month: 'short' });
  return `${month}-${d.getFullYear()}`;
}

const IncomeplanActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Pops a preset Activity create form. Income plan has no contact/deal FK
  // of its own, so this only prefills free-text fields plus `tag`
  // (e.g. "Aug-2026") — that's what makes a freshly-added activity
  // actually show up under view_activities below, since both sides key
  // off the same tag string, not a record link.
  add_activity: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row) return;
    const tag = tagFromPlan(row.plan_month);
    openEntityCreateModal({
      ProfileComponent: ActivitiesProfile,
      schema: ActivitiesSchema,
      title: `New Activity — ${row.name || ''}`,
      presetValues: {
        subject: `Income plan — ${row.name || ''}`,
        description: `Regarding income plan for ${row.plan_month || ''} (${row.name || ''})`.trim(),
        tag,
      },
      onSaved: refresh,
    });
  },

  // No FK either way between income plan and Activities — scoped by the
  // shared `tag` column instead of a relational join.
  view_activities: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const tag = tagFromPlan(row.plan_month);
    MosyCard(
      '',
      React.createElement(ActivitiesList, {
        customProfilePath: '../activities/profile',
        title: `Activities — ${tag}`,
        fixedQuery: { tag: btoa(tag) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },

  // Pops a preset Deals create form. Opportunities.contact_id is required
  // and points specifically at Contacts — income plan has no contact to
  // lock it to, so it's left blank for the user; title and `tag` get
  // prefilled, the latter so the new deal actually shows up under
  // view_deals below.
  add_deal: ({ rows, refresh }) => {
    const row = rows?.[0];
    if (!row) return;
    const tag = tagFromPlan(row.plan_month);
    openEntityCreateModal({
      ProfileComponent: OpportunitiesProfile,
      schema: OpportunitiesSchema,
      title: `New Deal — ${row.name || ''}`,
      presetValues: {
        title: `${row.name || 'Income plan'} — ${row.plan_month || ''}`.trim(),
        tag,
      },
      onSaved: refresh,
    });
  },

  // No FK from Opportunities back to income plan — scoped by the shared
  // `tag` column instead of a relational join.
  view_deals: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const tag = tagFromPlan(row.plan_month);
    MosyCard(
      '',
      React.createElement(OpportunitiesList, {
        customProfilePath: '../opportunities/profile',
        title: `Deals — ${tag}`,
        fixedQuery: { tag: btoa(tag) },
        hiddenActions: ['new'],
      }),
      true,
      'modal3',
      'mosycard_wide'
    );
  },
  filter_by_source: (ctx) => openSmartMapFilter(ctx, {
    title: 'Filter by source',
    searchSchema: IncomesourcesSchema,
    displayField: 'name',
    valueField: 'income_source_id',
    localColumnKey: 'income_source_id',
    combine: true,
  }),

  // income_source_id: {
  //   table: "income_sources",
  //   endpoint: apiRoute.incomesources.base,
  //   valueField: "income_source_id",
  //   displayField: "name",
  //   cacheField: "name",
  //   label: "Income Source",
  //   // used by: income_plan
  // },
    filter_by_tag: (ctx) => openSmartTagFilter(ctx, {
      title: 'Filter by tag',
      columnKey: 'tag',
      combine: true,
    }),
    filter_by_status: (ctx) => openSmartTagFilter(ctx, {
      title: 'Filter by status',
      columnKey: 'status',
      combine: true,
    }),
    filter_by_month: (ctx) => openSmartTagFilter(ctx, {
      title: 'Filter by month',
      columnKey: 'plan_month',
      combine: true,
    }),

  // Payment history has no FK to income plan either — scoped by month,
  // against payment_history's own payment_date column.
  view_payment_history: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    const { start, end } = monthRangeFromPlan(row.plan_month);
    MosyCard(
      '',
      React.createElement(PaymenthistoryList, {
        customProfilePath: '../paymenthistory/profile',
        title: `Payment History — ${row.plan_month || ''}`,
        fixedQuery: { paymentDate_start: btoa(start), paymentDate_end: btoa(end) },
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


export default IncomeplanActions
