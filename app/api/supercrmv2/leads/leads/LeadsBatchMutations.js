
/**
 * AUTO-GENERATED BATCH MUTATIONS
 * DO NOT EDIT MANUALLY
 */

export const LeadsBatchMutations = {
"_smart_messages_recipient_name_record_id": {"type":"join","table":"smart_messages","link":"record_id:related_record_id","select":{"_smart_messages_recipient_name_record_id":"recipient_name"}},
"_clients_full_name_converted_client_id": {"type":"join","table":"clients","link":"converted_client_id:record_id","select":{"_clients_full_name_converted_client_id":"full_name"}}
};

export const listLeadsMutationKeys = {
"_smart_messages_recipient_name_record_id": [],
"_clients_full_name_converted_client_id": [],

};

export default listLeadsMutationKeys;
