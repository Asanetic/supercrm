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

import { exportRichTextToPdf, exportRichTextToDocx } from "../../../MosyUtils/exportRichText";

const QuicknotesActions = {
  // Bound by gridOptions.checkFunction in schema.js. Fires with every row
  // the user ticked in the grid's checkbox column. Swap the display-name
  // fallback chain for whatever field this module's rows actually have.
  gridCheckBoxAction: async ({ rows }) => {
    const displayName = (row) => row?.title || row?.name || row?.record_id || 'record';
    alert(`${rows.length} record(s) selected: ${rows.map(displayName).join(', ')}`);
  },

  // Exports note_details (the richtext field MosyHtmlEditor edits) to PDF
  // via the browser's native print dialog — "Save as PDF" there produces
  // a real PDF with zero extra dependencies.
  export_pdf: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    exportRichTextToPdf({
      title: row?.note_title || 'Quick Note',
      htmlContent: row?.note_details || '',
    });
  },

  // Exports note_details to a .doc file Word/LibreOffice/Google Docs all
  // open natively (HTML saved with Word's MIME type, not real OOXML).
  export_docx: ({ rows }) => {
    const row = rows?.[0];
    if (!row) return;
    exportRichTextToDocx({
      title: row?.note_title || 'Quick Note',
      htmlContent: row?.note_details || '',
    });
  },

  // Add more as needed — see actionRegistryDocs.md for patterns to copy.
  // Every one of them gets whatever's on ctx: { rows, schema, router,
  // refresh, create, update, remove, filter, setFilterValue,
  // setAdvancedQuery, setDateRange, applyFilter, clearFilterValue }.
};


export default QuicknotesActions
