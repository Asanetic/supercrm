
$clients_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`full_name` varchar(500),
`business_name` varchar(500),
`phone_number` varchar(50),
`alternative_phone_number` varchar(50),
`email_address` varchar(255),
`website_url` varchar(500),
`industry_type` varchar(500),
`lead_source` varchar(500),
`country_name` varchar(500),
`city_name` varchar(500),
`client_status` varchar(500),
`assigned_sales_rep` varchar(500),
`business_address` longtext,
`tax_number` varchar(500),
`profile_photo` text,
`notes` longtext,
`last_contact_date` datetime,

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$clients_table = 'clients';

create_table(

    $mysqliconn,
    $dbname,
    $clients_table,
    $clients_table_script

);





$deals_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`deal_title` varchar(500),
`deal_description` longtext,
`client_id` varchar(500),
`deal_source` varchar(500),
`deal_value` decimal(10,2),
`expected_close_date` datetime,
`pipeline_stage` varchar(500),
`deal_stage` varchar(500),
`deal_status` varchar(500),
`assigned_sales_rep` varchar(500),
`priority_level` varchar(500),
`deal_probability` varchar(500),
`next_follow_up_date` datetime,
`deal_notes` longtext,

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$deals_table = 'deals';

create_table(

    $mysqliconn,
    $dbname,
    $deals_table,
    $deals_table_script

);





$products_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`product_name` varchar(500),
`product_code` varchar(500),
`product_category_id` varchar(500),
`product_description` longtext,
`product_image` text,
`unit_price` decimal(10,2),
`discount_price` decimal(10,2),
`tax_percentage` varchar(500),
`currency_code` varchar(500),
`stock_quantity` varchar(500),
`product_status` varchar(500),

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$products_table = 'products';

create_table(

    $mysqliconn,
    $dbname,
    $products_table,
    $products_table_script

);





$services_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`service_name` varchar(500),
`service_code` varchar(500),
`service_category_id` varchar(500),
`service_description` longtext,
`service_image` text,
`service_price` decimal(10,2),
`estimated_duration` varchar(500),
`billing_type` varchar(500),
`service_status` varchar(500),

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$services_table = 'services';

create_table(

    $mysqliconn,
    $dbname,
    $services_table,
    $services_table_script

);





$product_categories_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`category_name` varchar(500),
`category_description` longtext,
`parent_category_id` varchar(500),
`category_image` text,
`category_status` varchar(500),

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$product_categories_table = 'product_categories';

create_table(

    $mysqliconn,
    $dbname,
    $product_categories_table,
    $product_categories_table_script

);





$service_categories_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`category_name` varchar(500),
`category_description` longtext,
`parent_category_id` varchar(500),
`category_image` text,
`category_status` varchar(500),

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$service_categories_table = 'service_categories';

create_table(

    $mysqliconn,
    $dbname,
    $service_categories_table,
    $service_categories_table_script

);





$quotations_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`quotation_number` varchar(500),
`quotation_title` varchar(500),
`quotation_description` longtext,
`client_id` varchar(500),
`deal_id` varchar(500),
`quotation_amount` decimal(10,2),
`tax_amount` decimal(10,2),
`discount_amount` decimal(10,2),
`quotation_status` varchar(500),
`quotation_issued_on` datetime,
`quotation_expiry_date` datetime,
`quotation_notes` longtext,

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$quotations_table = 'quotations';

create_table(

    $mysqliconn,
    $dbname,
    $quotations_table,
    $quotations_table_script

);





$quotation_items_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`quotation_id` varchar(500),
`item_type` varchar(500),
`item_id` varchar(500),
`item_name` varchar(500),
`item_description` longtext,
`item_quantity` varchar(500),
`item_unit_price` decimal(10,2),
`item_total_amount` decimal(10,2),

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$quotation_items_table = 'quotation_items';

create_table(

    $mysqliconn,
    $dbname,
    $quotation_items_table,
    $quotation_items_table_script

);





$invoices_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`invoice_number` varchar(500),
`invoice_title` varchar(500),
`invoice_description` longtext,
`client_id` varchar(500),
`deal_id` varchar(500),
`quotation_id` varchar(500),
`invoice_amount` decimal(10,2),
`tax_amount` decimal(10,2),
`discount_amount` decimal(10,2),
`invoice_status` varchar(500),
`invoice_issued_on` datetime,
`invoice_due_date` datetime,
`billing_notes` longtext,

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$invoices_table = 'invoices';

create_table(

    $mysqliconn,
    $dbname,
    $invoices_table,
    $invoices_table_script

);





$invoice_items_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`invoice_id` varchar(500),
`item_type` varchar(500),
`item_id` varchar(500),
`item_name` varchar(500),
`item_description` longtext,
`item_quantity` varchar(500),
`item_unit_price` decimal(10,2),
`item_total_amount` decimal(10,2),

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$invoice_items_table = 'invoice_items';

create_table(

    $mysqliconn,
    $dbname,
    $invoice_items_table,
    $invoice_items_table_script

);





$payments_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`paid_on` datetime,
`amount_paid` decimal(10,2),
`payment_for` varchar(500),
`payment_notes` longtext,
`transaction_ref` varchar(500),
`receipt_number` varchar(500),
`invoice_id` varchar(500),
`deal_id` varchar(500),
`client_id` varchar(500),
`payment_channel` varchar(500),
`payment_method` varchar(500),
`payment_status` varchar(500),
`currency_code` varchar(500),

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$payments_table = 'payments';

create_table(

    $mysqliconn,
    $dbname,
    $payments_table,
    $payments_table_script

);





$tasks_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`task_title` varchar(500),
`task_description` longtext,
`task_type` varchar(500),
`task_priority` varchar(500),
`task_status` varchar(500),
`assigned_sales_rep` varchar(500),
`client_id` varchar(500),
`deal_id` varchar(500),
`due_date` datetime,
`completed_on` datetime,
`task_notes` longtext,

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$tasks_table = 'tasks';

create_table(

    $mysqliconn,
    $dbname,
    $tasks_table,
    $tasks_table_script

);





$activities_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`client_id` varchar(500),
`deal_id` varchar(500),
`activity_type` varchar(500),
`activity_title` varchar(500),
`activity_description` longtext,
`activity_status` varchar(500),
`performed_by` varchar(500),
`activity_date` datetime,
`next_action_date` datetime,

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$activities_table = 'activities';

create_table(

    $mysqliconn,
    $dbname,
    $activities_table,
    $activities_table_script

);





$users_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`full_name` varchar(500),
`phone_number` varchar(50),
`email_address` varchar(255),
`user_password` varchar(500),
`user_role` varchar(500),
`department_name` varchar(500),
`profile_photo` text,
`account_status` varchar(500),
`last_login` datetime,

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$users_table = 'users';

create_table(

    $mysqliconn,
    $dbname,
    $users_table,
    $users_table_script

);





$leads_table_script = "


`primkey` int(11) PRIMARY KEY AUTO_INCREMENT,
`record_id` varchar(100) NOT NULL,

`lead_title` varchar(500),
`full_name` varchar(500),
`business_name` varchar(500),
`phone_number` varchar(50),
`alternative_phone_number` varchar(50),
`email_address` varchar(255),
`website_url` varchar(500),
`industry_type` varchar(500),
`lead_source` varchar(500),
`lead_status` varchar(500),
`lead_temperature` varchar(500),
`assigned_sales_rep` varchar(500),
`estimated_deal_value` decimal(10,2),
`expected_conversion_date` datetime,
`country_name` varchar(500),
`city_name` varchar(500),
`business_address` longtext,
`notes` longtext,
`next_follow_up_date` datetime,
`last_contact_date` datetime,
`profile_photo` text,

`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
`updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
`hive_site_id` varchar(100),
`hive_site_name` varchar(255)

        

";

$leads_table = 'leads';

create_table(

    $mysqliconn,
    $dbname,
    $leads_table,
    $leads_table_script

);




