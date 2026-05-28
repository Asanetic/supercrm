
/**
 * AUTO-GENERATED BATCH MUTATIONS
 * DO NOT EDIT MANUALLY
 */

export const DealsBatchMutations = {
"_expected_revenue_revenue_title_record_id": {"type":"join","table":"expected_revenue","link":"record_id:deal_id","select":{"_expected_revenue_revenue_title_record_id":"revenue_title"}},
"_clients_full_name_client_id": {"type":"join","table":"clients","link":"client_id:record_id","select":{"_clients_full_name_client_id":"full_name"}}
};

export const listDealsMutationKeys = {
"_expected_revenue_revenue_title_record_id": [],
"_clients_full_name_client_id": [],

};

export default listDealsMutationKeys;
