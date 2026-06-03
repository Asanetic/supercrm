
/**
 * AUTO-GENERATED BATCH MUTATIONS
 * DO NOT EDIT MANUALLY
 */

export const TasksBatchMutations = {
"_clients_full_name_client_id": {"type":"join","table":"clients","link":"client_id:record_id","select":{"_clients_full_name_client_id":"full_name"}},
"_deals_deal_title_deal_id": {"type":"join","table":"deals","link":"deal_id:record_id","select":{"_deals_deal_title_deal_id":"deal_title"}},
"_users_full_name_assigned_sales_rep": {"type":"join","table":"users","link":"assigned_sales_rep:record_id","select":{"_users_full_name_assigned_sales_rep":"full_name"}}
};

export const listTasksMutationKeys = {
"_clients_full_name_client_id": [],
"_deals_deal_title_deal_id": [],
"_users_full_name_assigned_sales_rep": [],

};

export default listTasksMutationKeys;
