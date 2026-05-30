
/**
 * AUTO-GENERATED BATCH MUTATIONS
 * DO NOT EDIT MANUALLY
 */

export const InvoiceItemsBatchMutations = {
"_invoices_invoice_title_invoice_id": {"type":"join","table":"invoices","link":"invoice_id:record_id","select":{"_invoices_invoice_title_invoice_id":"invoice_title"}},
"_services_service_name_item_id": {"type":"join","table":"services","link":"item_id:record_id","select":{"_services_service_name_item_id":"service_name"}}
};

export const listInvoiceItemsMutationKeys = {
"_invoices_invoice_title_invoice_id": [],
"_services_service_name_item_id": [],

};

export default listInvoiceItemsMutationKeys;
