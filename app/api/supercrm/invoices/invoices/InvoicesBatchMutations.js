
/**
 * AUTO-GENERATED BATCH MUTATIONS
 * DO NOT EDIT MANUALLY
 */

export const InvoicesBatchMutations = {
"_payments_payment_for_record_id": {"type":"join","table":"payments","link":"record_id:invoice_id","select":{"_payments_payment_for_record_id":"payment_for"}},
"_clients_full_name_client_id": {"type":"join","table":"clients","link":"client_id:record_id","select":{"_clients_full_name_client_id":"full_name"}},
"_deals_deal_title_deal_id": {"type":"join","table":"deals","link":"deal_id:record_id","select":{"_deals_deal_title_deal_id":"deal_title"}},
"_quotations_quotation_title_quotation_id": {"type":"join","table":"quotations","link":"quotation_id:record_id","select":{"_quotations_quotation_title_quotation_id":"quotation_title"}}
};

export const listInvoicesMutationKeys = {
"_payments_payment_for_record_id": [],
"_clients_full_name_client_id": [],
"_deals_deal_title_deal_id": [],
"_quotations_quotation_title_quotation_id": [],

};

export default listInvoicesMutationKeys;
