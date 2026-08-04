/**
 * Register real behavior here, once per action key. Both grid rowLinks
 * AND profile-level buttons (schema.profileActions) route through this
 * SAME registry — one place to add new behavior, works everywhere.
 *
 * Every registered function receives ONE ctx object instead of a fixed
 * list of positional args. That's the extensibility point: need a new
 * capability for some action later (current user, a toast helper,
 * whatever) — add a field to ctx below, every caller passes it through,
 * no per-action signature changes.
 *
 *   ctx.rows     — array (bulk actions get every appliesTo-matched row;
 *                  single-row actions from a dropdown/profile get [row];
 *                  list-level actions with no row, like register_company,
 *                  get [])
 *   ctx.schema   — the full schema object (apiBase, entity, etc.)
 *   ctx.router   — Next.js router — present for grid-toolbar and
 *                  single-row dropdown/profile actions, use it to
 *                  router.push() for anything that should navigate
 *   ctx.refresh  — reload whatever list/grid/form triggered this action
 *   ctx.create / ctx.update / ctx.remove
 *                — the SAME EntityDataEngine instance's bound methods
 *                  the calling grid/form is already using — not a
 *                  separate import. Calling ctx.create(values) here
 *                  hits the exact same engine that grid.create() or
 *                  form.submit() would, including its own auto-reload
 *                  on success — no parallel "create a record" codepath
 *                  to keep in sync.
 *
 * NOTE: "delete" and "clone" are intercepted directly by
 * useEntityFormController before they ever reach this registry — don't
 * register functions under those two keys, they will never fire.
 */

// import { closeMosyCard } from "../../../components/MosyCard";
// import { RegisterCompanyAction } from "./companyActions";

const LeadsActions = {
  sms_inactive: async ({ rows }) => {
    const numbers = rows.map((r) => r.phone).filter(Boolean);
    await fetch('/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numbers,
        message: 'This is a reminder that your subscription is inactive.',
      }),
    });
  },

  // Mutation example — single-row action from a grid dropdown OR a
  // profile button (schema.profileActions). Same function, same registry,
  // works from either place because both build ctx identically.
  gridCheckBoxAction: async ({ rows }) => {
    alert(`gridCheckBoxAction Action sample  -- ${rows[0].site_name}`);
  },

  filterByDate: async ({ rows }) => {
    alert(`toanisha filterByDate -- ${rows[0].site_name}`);
  },

  // === sample normal function with schema , crud actions ===
  // register_company: async ({ schema, create, refresh }) => {
  //   RegisterCompanyAction({
  //     onSubmit: async (formData) => {
  //       const result = await create({
  //         company_name: formData.companyName,
  //         email: formData.email,
  //         phone_number: formData.phone,
  //         purposes: formData.purposes,
  //       });
  //       if (result?.ok !== false) {
  //         refresh?.();
  //         closeMosyCard("modal1")
  //       }

  //       return result;
  //     },
  //   });
  // },

  //=== Data map update sample fuction ===
  // update_deal_status: (ctx) => quickEditFromRow(ctx, {
  //   fieldKeys: ['contact_id','deal_title','deal_status'],
  //   title: 'Mark Deal Status — {{deal_title}}',
  //   fieldOverrides: {
  //     deal_status: {colSpan: 6, type: 'select', options: ['Won', 'Lost', 'Pending'] },
  //     deal_title: {colSpan: 6},
  //     contact_id: {colSpan: 12},
  //   },
  //   getId: (row) => btoa(row.primkey), // this module's update endpoint wants primkey, not record_id
  // }),


  //===== Data map create sample fuction =====
    // add_client_deal: ({ rows, refresh }) => {
    //   const client = rows?.[0];
    //   if (!client) return;
    
    //   openEntityCreateModal({
    //     ProfileComponent: LeadsProfile,
    //     schema: LeadsSchema,
    //     title: `New Deal — ${client.contact_name}`,
    //     presetValues: buildPresetFromRow(client, [
    //       { sourceKey: 'record_id', destKey: 'contact_id', destSchema: LeadsSchema }, // visible, locked
    //       { sourceKey: 'record_id', destKey: 'client_id' },                          // hidden passenger
    //     ]),
    //     fieldOverrides: {
    //       contact_id: { editable: false , type:"hidden" },
    //       deal_value: { colSpan: 6 },
    //       deal_title: { colSpan: 6 },
    //       currency:   { colSpan: 6 , type:"select", options:["USD", "EUR", "GBP"] },
    //     },
    //     sectionFieldOrder: {
    //       basic_information: ['deal_title', 'deal_value', 'contact_id'],
    //     },
    //     onSaved: refresh,
    //   });
    // },

  // Navigation example — works from a grid dropdown OR a profile button.
  view_payment_history: ({ rows, router }) => {
    const row = rows[0];
    if (!row || !router) return;
    router.push(`/assetguard/payments?site_id=${row.record_id}`);
  },

  view_on_map: ({ rows, router }) => {
    const row = rows[0];
    if (!row || !router) return;
    router.push(`/assetguard/sites/map?site_id=${row.record_id}`);
  },

  // Add more as needed — export_selected, mark_paid, archive_all, etc.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove }.
};


export default LeadsActions
