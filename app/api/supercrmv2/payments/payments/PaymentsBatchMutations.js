
/**
 * AUTO-GENERATED BATCH MUTATIONS
 * DO NOT EDIT MANUALLY
 */

export const PaymentsBatchMutations = {
"_invoices_invoice_title_invoice_id": {"type":"join","table":"invoices","link":"invoice_id:record_id","select":{"_invoices_invoice_title_invoice_id":"invoice_title"}},
"_deals_deal_title_deal_id": {"type":"join","table":"deals","link":"deal_id:record_id","select":{"_deals_deal_title_deal_id":"deal_title"}},
"_clients_full_name_client_id": {"type":"join","table":"clients","link":"client_id:record_id","select":{"_clients_full_name_client_id":"full_name"}},
"tel": {"type":"join","table":"clients","link":"client_id:record_id","select":{"tel":"phone_number"}},
"name": {"type":"join","table":"clients","link":"client_id:record_id","select":{"name":"full_name"}},
"email": {"type":"join","table":"clients","link":"client_id:record_id","select":{"email":"email_address"}}
};

export const listPaymentsMutationKeys = {
"_invoices_invoice_title_invoice_id": [],
"_deals_deal_title_deal_id": [],
"_clients_full_name_client_id": [],
"tel": [],
"name": [],
"email": [],

};

export default listPaymentsMutationKeys;
