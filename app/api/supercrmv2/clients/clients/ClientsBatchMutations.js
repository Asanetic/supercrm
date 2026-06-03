
/**
 * AUTO-GENERATED BATCH MUTATIONS
 * DO NOT EDIT MANUALLY
 */

export const ClientsBatchMutations = {
"_smart_messages_recipient_name_record_id": {"type":"join","table":"smart_messages","link":"record_id:related_record_id","select":{"_smart_messages_recipient_name_record_id":"recipient_name"}},
"_leads_full_name_converted_lead_id": {"type":"join","table":"leads","link":"converted_lead_id:record_id","select":{"_leads_full_name_converted_lead_id":"full_name"}}
};

export const listClientsMutationKeys = {
"_smart_messages_recipient_name_record_id": [],
"_leads_full_name_converted_lead_id": [],

};

export default listClientsMutationKeys;
