const MosyColumnFactory = {

   //-- activities cols--//
  activities: ["record_id", "client_id", "deal_id", "activity_type", "activity_title", "activity_description", "activity_status", "performed_by", "activity_date", "next_action_date", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- approvals cols--//
  approvals: ["record_id", "request_id", "staff_id", "approval_level", "approved_by", "approval_action", "approval_comments", "approved_on", "approval_status", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- clients cols--//
  clients: ["record_id", "full_name", "business_name", "phone_number", "alternative_phone_number", "email_address", "website_url", "industry_type", "lead_source", "country_name", "city_name", "client_status", "converted_lead_id", "assigned_sales_rep", "business_address", "tax_number", "profile_photo", "notes", "last_contact_date", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- deals cols--//
  deals: ["record_id", "deal_title", "deal_description", "client_id", "deal_source", "deal_value", "expected_close_date", "pipeline_stage", "deal_stage", "deal_status", "assigned_sales_rep", "priority_level", "deal_probability", "next_follow_up_date", "deal_notes", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- disbursements cols--//
  disbursements: ["record_id", "request_id", "staff_id", "disbursement_number", "amount_disbursed", "reference_number", "payment_method", "disbursement_notes", "disbursed_by", "disbursed_on", "disbursement_status", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- expected_revenue cols--//
  expected_revenue: ["record_id", "revenue_month", "client_id", "deal_id", "expected_amount", "currency_code", "payment_status", "payment_ref_no", "expected_close_date", "probability_percent", "revenue_source_type", "revenue_title", "invoice_id", "lead_id", "revenue_status", "revenue_description", "assigned_to", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- invoice_items cols--//
  invoice_items: ["record_id", "invoice_id", "item_id", "invoice_item_name", "item_quantity", "item_unit_price", "item_total_amount", "item_description", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- invoices cols--//
  invoices: ["record_id", "invoice_number", "invoice_title", "invoice_description", "client_id", "deal_id", "quotation_id", "invoice_amount", "tax_amount", "discount_amount", "invoice_status", "invoice_issued_on", "invoice_due_date", "billing_notes", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- leads cols--//
  leads: ["record_id", "lead_title", "full_name", "business_name", "phone_number", "alternative_phone_number", "email_address", "website_url", "industry_type", "lead_source", "lead_status", "converted_client_id", "lead_temperature", "assigned_sales_rep", "estimated_deal_value", "expected_conversion_date", "country_name", "city_name", "business_address", "notes", "next_follow_up_date", "last_contact_date", "profile_photo", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- mosy_sql_roll_back cols--//
  mosy_sql_roll_back: ["roll_bk_key", "table_name", "roll_type", "where_str", "roll_timestamp", "value_entries", "hive_site_id", "hive_site_name"],

   //-- page_manifest_ cols--//
  page_manifest_: ["manikey", "page_group", "site_id", "page_url", "hive_site_id", "hive_site_name", "project_id", "project_name"],

   //-- payments cols--//
  payments: ["record_id", "paid_on", "amount_paid", "payment_for", "payment_notes", "transaction_ref", "receipt_number", "invoice_id", "deal_id", "client_id", "payment_channel", "payment_method", "payment_status", "currency_code", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- products cols--//
  products: ["record_id", "product_name", "price_range", "unit_price", "product_code", "category", "product_description", "product_image", "discount_price", "tax_percentage", "currency_code", "stock_quantity", "product_status", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- quotation_items cols--//
  quotation_items: ["record_id", "quotation_id", "item_type", "item_id", "item_name", "item_description", "item_quantity", "item_unit_price", "item_total_amount", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- quotations cols--//
  quotations: ["record_id", "quotation_number", "quotation_title", "quotation_description", "client_id", "deal_id", "quotation_amount", "tax_amount", "discount_amount", "quotation_status", "quotation_issued_on", "quotation_expiry_date", "quotation_notes", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- requests cols--//
  requests: ["record_id", "staff_id", "request_number", "amount_requested", "request_reason", "amount_approved", "current_balance", "requested_on", "approved_on", "paid_on", "cleared_on", "request_status", "request_remarks", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- services cols--//
  services: ["record_id", "service_code", "service_name", "category", "price_range", "service_price", "service_description", "billing_type", "service_status", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- settings cols--//
  settings: ["record_id", "approval_levels", "default_currency", "sms_notifications", "email_notifications", "allow_partial_payments", "allow_partial_recoveries", "auto_generate_request_numbers", "default_approval_workflow", "system_status", "setting_remarks", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- smart_message_templates cols--//
  smart_message_templates: ["record_id", "template_name", "template_code", "template_category", "message_channel", "subject", "message_content", "template_status", "created_by", "last_updated_by", "created_on", "updated_on", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- smart_messages cols--//
  smart_messages: ["record_id", "message_number", "related_record_id", "recipient_name", "recipient_phone", "recipient_email", "message_channel", "message_subject", "message_content", "message_status", "delivery_status", "request_source", "request_id", "sent_by", "scheduled_for", "sent_on", "delivered_on", "read_on", "failed_on", "failure_reason", "created_on", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- smart_payment_requests cols--//
  smart_payment_requests: ["record_id", "request_reference", "request_title", "related_module", "related_record_id", "payer_name", "payer_phone", "payer_email", "amount_requested", "amount_paid", "balance_amount", "payment_shortcode", "payment_link", "request_notes", "expiry_date", "request_status", "created_by", "created_on", "updated_on", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- smart_payment_settings cols--//
  smart_payment_settings: ["record_id", "setting_name", "setting_code", "setting_value", "setting_category", "setting_status", "created_by", "last_updated_by", "created_on", "updated_on", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- smart_payments cols--//
  smart_payments: ["record_id", "payment_date", "transaction_code", "amount_paid", "payer_name", "payer_phone", "request_reference", "payment_description", "related_module", "payment_reference", "related_record_id", "receipt_number", "payer_email", "payment_method", "payment_channel", "currency", "payment_notes", "payment_status", "processed_by", "created_on", "updated_on", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- staff cols--//
  staff: ["record_id", "full_name", "staff_number", "phone_number", "email_address", "department", "position", "advance_limit", "current_outstanding_balance", "staff_status", "registered_on", "created_at", "updated_at", "hive_site_id", "hive_site_name"],

   //-- system_module_manifest_ cols--//
  system_module_manifest_: ["record_id", "component_name", "module_key", "module_name", "permission_type", "capability_key", "access_name", "relative_path", "hive_site_id", "hive_site_name"],

   //-- system_role_bundles cols--//
  system_role_bundles: ["record_id", "bundle_id", "bundle_name", "remark", "hive_site_id", "hive_site_name"],

   //-- system_users cols--//
  system_users: ["record_id", "name", "email", "tel", "login_password", "ref_id", "regdate", "user_no", "user_pic", "user_gender", "last_seen", "about", "hive_site_id", "hive_site_name", "auth_token", "token_status", "token_expiring_in", "project_id", "project_name", "user_role"],

   //-- tasks cols--//
  tasks: ["record_id", "task_title", "task_description", "task_type", "task_priority", "task_status", "client_id", "lead_id", "deal_id", "due_date", "completed_on", "task_notes", "created_at", "assigned_sales_rep", "updated_at", "hive_site_id", "hive_site_name"],

   //-- user_bundle_role_functions cols--//
  user_bundle_role_functions: ["record_id", "bundle_id", "bundle_name", "role_id", "role_name", "remark", "hive_site_id", "hive_site_name"],

   //-- user_manifest_ cols--//
  user_manifest_: ["admin_mkey", "user_id", "user_name", "role_id", "site_id", "role_name", "hive_site_id", "hive_site_name", "project_id", "project_name"],

   //-- users cols--//
  users: ["record_id", "full_name", "phone_number", "email_address", "user_password", "user_role", "department_name", "profile_photo", "account_status", "last_login", "created_at", "updated_at", "hive_site_id", "hive_site_name"],


};
export default MosyColumnFactory;