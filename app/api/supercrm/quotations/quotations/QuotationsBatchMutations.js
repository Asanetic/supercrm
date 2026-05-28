
/**
 * AUTO-GENERATED BATCH MUTATIONS
 * DO NOT EDIT MANUALLY
 */

export const QuotationsBatchMutations = {
"_invoices_invoice_title_record_id": {"type":"join","table":"invoices","link":"record_id:quotation_id","select":{"_invoices_invoice_title_record_id":"invoice_title"}},
"_clients_full_name_client_id": {"type":"join","table":"clients","link":"client_id:record_id","select":{"_clients_full_name_client_id":"full_name"}},
"_deals_deal_title_deal_id": {"type":"join","table":"deals","link":"deal_id:record_id","select":{"_deals_deal_title_deal_id":"deal_title"}}
};

export const listQuotationsMutationKeys = {
"_invoices_invoice_title_record_id": [],
"_clients_full_name_client_id": [],
"_deals_deal_title_deal_id": [],

};

export default listQuotationsMutationKeys;
