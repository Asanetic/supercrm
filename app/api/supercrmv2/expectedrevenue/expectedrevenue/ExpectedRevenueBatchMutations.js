
/**
 * AUTO-GENERATED BATCH MUTATIONS
 * DO NOT EDIT MANUALLY
 */

export const ExpectedRevenueBatchMutations = {
"_activities_activity_title_record_id": {"type":"join","table":"activities","link":"record_id:deal_id","select":{"_activities_activity_title_record_id":"activity_title"}},
"_clients_full_name_client_id": {"type":"join","table":"clients","link":"client_id:record_id","select":{"_clients_full_name_client_id":"full_name"}},
"_deals_deal_title_deal_id": {"type":"join","table":"deals","link":"deal_id:record_id","select":{"_deals_deal_title_deal_id":"deal_title"}},
"_payments_transaction_ref_payment_ref_no": {"type":"join","table":"payments","link":"payment_ref_no:transaction_ref","select":{"_payments_transaction_ref_payment_ref_no":"transaction_ref"}},
"_invoices_invoice_title_invoice_id": {"type":"join","table":"invoices","link":"invoice_id:record_id","select":{"_invoices_invoice_title_invoice_id":"invoice_title"}},
"tel": {"type":"join","table":"clients","link":"client_id:record_id","select":{"tel":"phone_number"}},
"name": {"type":"join","table":"clients","link":"client_id:record_id","select":{"name":"full_name"}},
"email": {"type":"join","table":"clients","link":"client_id:record_id","select":{"email":"email_address"}}
};

export const listExpectedRevenueMutationKeys = {
"_activities_activity_title_record_id": [],
"_clients_full_name_client_id": [],
"_deals_deal_title_deal_id": [],
"_payments_transaction_ref_payment_ref_no": [],
"_invoices_invoice_title_invoice_id": [],
"tel": [],
"name": [],
"email": [],

};

export default listExpectedRevenueMutationKeys;
