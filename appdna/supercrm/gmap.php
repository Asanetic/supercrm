
<?php

/*
|--------------------------------------------------------------------------
| Generated Mapping String
|--------------------------------------------------------------------------
*/

/*




// CLIENTS RELATIONSHIPS

clients:full_name|record_id:client_id:deals(Deals),record_id:client_id:quotations(Quotations),record_id:client_id:invoices(Invoices),record_id:client_id:payments(Payments),record_id:client_id:tasks(Tasks),record_id:client_id:activities(Activities), record_id:client_id:expected_revenue


// LEADS RELATIONSHIPS

leads:full_name|assigned_sales_rep:record_id:users(Assigned Sales Rep)


// DEALS RELATIONSHIPS

deals:deal_title|client_id:record_id:clients(Client Details),record_id:deal_id:quotations(Quotations),record_id:deal_id:invoices(Invoices),record_id:deal_id:payments(Payments),record_id:deal_id:tasks(Tasks),record_id:deal_id:activities(Activities)

// REVENUE RELATIONSHIPS

deals:deal_title|client_id:record_id:clients(Client Details),record_id:deal_id:quotations(Quotations),record_id:deal_id:invoices(Invoices),record_id:deal_id:payments(Payments),record_id:deal_id:tasks(Tasks),record_id:deal_id:activities(Activities),record_id:deal_id:expected_revenue(Revenue)

//EXPECTED REVENUE 
expected_revenue:revenue_title|client_id:record_id:clients(Client Details),deal_id:record_id:deals(Deal),invoice_id:record_id:invoices(Invoices), payment_ref_no:transaction_ref:payments(Payments), record_id:deal_id:activities(Activities)

// QUOTATIONS RELATIONSHIPS

quotations:quotation_title|client_id:record_id:clients(Client Details),deal_id:record_id:deals(Deal Details),record_id:quotation_id:quotation_items(Quotation Items),record_id:quotation_id:invoices(Invoices)


// QUOTATION ITEMS RELATIONSHIPS

quotation_items:item_name|quotation_id:record_id:quotations(Quotation Details)


// INVOICES RELATIONSHIPS

invoices:invoice_title|client_id:record_id:clients(Client Details),deal_id:record_id:deals(Deal Details),quotation_id:record_id:quotations(Quotation Details),record_id:invoice_id:invoice_items(Invoice Items),record_id:invoice_id:payments(Payments)


// INVOICE ITEMS RELATIONSHIPS

invoice_items:invoice_item_name|invoice_id:record_id:invoices(Invoice Details),item_id:record_id:services(Service detail)
services:service_name|record_id:item_id:invoice_items


// PAYMENTS RELATIONSHIPS

payments:transaction_ref|invoice_id:record_id:invoices(Invoice Details),deal_id:record_id:deals(Deal Details),client_id:record_id:clients(Client Details)


// TASKS RELATIONSHIPS

tasks:task_title|client_id:record_id:clients(Client Details),deal_id:record_id:deals(Deal Details),assigned_sales_rep:record_id:users(Assigned User)


// ACTIVITIES RELATIONSHIPS

activities:activity_title|client_id:record_id:clients(Client Details),deal_id:record_id:deals(Deal Details),performed_by:record_id:users(Performed By)


// USERS RELATIONSHIPS

users:full_name|record_id:assigned_sales_rep:leads(Assigned Leads),record_id:assigned_sales_rep:clients(Assigned Clients),record_id:assigned_sales_rep:deals(Assigned Deals),record_id:assigned_sales_rep:tasks(Assigned Tasks)


// SYSTEM USERS RELATIONSHIPS

system_users:name|project_id:project_id:page_manifest_(Project Pages),record_id:user_id:user_manifest_(User Access)


// SYSTEM ROLE BUNDLES RELATIONSHIPS

system_role_bundles:bundle_name|bundle_id:bundle_id:user_bundle_role_functions(Role Functions)


// USER BUNDLE ROLE FUNCTIONS RELATIONSHIPS

user_bundle_role_functions:role_name|bundle_id:bundle_id:system_role_bundles(Bundle Details)


// USER MANIFEST RELATIONSHIPS

user_manifest_:user_name|user_id:record_id:system_users(User Details)


// PAGE MANIFEST RELATIONSHIPS

page_manifest_:page_url|project_id:project_id:system_users(Project Users)


// SYSTEM MODULE MANIFEST RELATIONSHIPS

system_module_manifest_:module_name|module_key:module_key:page_manifest_(Related Pages)


 
*/



/*
|--------------------------------------------------------------------------
| Generated PHP Mapper
|--------------------------------------------------------------------------
*/




///Ai Notes  append mini list for interlinked data eg farmers & collections dont remove commented code replace instead 
$interlink_mapping_lists=[

    "clients"=>[

        "clients_deals"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)    }",
            "module_name"=>"Deals",
            "list_title"=>"Deals",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'deals',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "clients_quotations"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)        }",
            "module_name"=>"Quotations",
            "list_title"=>"Quotations",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'quotations',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "clients_invoices"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)            }",
            "module_name"=>"Invoices",
            "list_title"=>"Invoices",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'invoices',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "clients_payments"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)                }",
            "module_name"=>"Payments",
            "list_title"=>"Payments",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'payments',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "clients_tasks"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)                    }",
            "module_name"=>"Tasks",
            "list_title"=>"Tasks",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'tasks',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "clients_activities"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)                        }",
            "module_name"=>"Activities",
            "list_title"=>"Activities",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'activities',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "clients_expected_revenue"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)                            }",
            "module_name"=>"ExpectedRevenue",
            "list_title"=>"Expected Revenue",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'expectedrevenue',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "leads"=>[

        "leads_users"=>[
            "filter_str"=>"{recordId:btoa(leadsNode?.assigned_sales_rep)    }",
            "module_name"=>"Users",
            "list_title"=>"Assigned Sales Rep",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'users',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "deals"=>[

        "deals_clients"=>[
            "filter_str"=>"{recordId:btoa(dealsNode?.client_id)    }",
            "module_name"=>"Clients",
            "list_title"=>"Client Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'clients',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "deals_quotations"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)        }",
            "module_name"=>"Quotations",
            "list_title"=>"Quotations",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'quotations',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "deals_invoices"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)            }",
            "module_name"=>"Invoices",
            "list_title"=>"Invoices",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'invoices',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "deals_payments"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)                }",
            "module_name"=>"Payments",
            "list_title"=>"Payments",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'payments',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "deals_tasks"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)                    }",
            "module_name"=>"Tasks",
            "list_title"=>"Tasks",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'tasks',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "deals_activities"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)                        }",
            "module_name"=>"Activities",
            "list_title"=>"Activities",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'activities',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "deals_expected_revenue"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)                            }",
            "module_name"=>"ExpectedRevenue",
            "list_title"=>"Revenue",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'expectedrevenue',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "expected_revenue"=>[

        "expected_revenue_clients"=>[
            "filter_str"=>"{recordId:btoa(expected_revenueNode?.client_id)    }",
            "module_name"=>"Clients",
            "list_title"=>"Client Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'clients',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "expected_revenue_deals"=>[
            "filter_str"=>"{recordId:btoa(expected_revenueNode?.deal_id)        }",
            "module_name"=>"Deals",
            "list_title"=>"Deal",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'deals',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "expected_revenue_invoices"=>[
            "filter_str"=>"{recordId:btoa(expected_revenueNode?.invoice_id)            }",
            "module_name"=>"Invoices",
            "list_title"=>"Invoices",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'invoices',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "expected_revenue_payments"=>[
            "filter_str"=>"{transactionRef:btoa(expected_revenueNode?.payment_ref_no)                }",
            "module_name"=>"Payments",
            "list_title"=>"Payments",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'payments',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "expected_revenue_activities"=>[
            "filter_str"=>"{dealId:btoa(expected_revenueNode?.record_id)                    }",
            "module_name"=>"Activities",
            "list_title"=>"Activities",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'activities',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "quotations"=>[

        "quotations_clients"=>[
            "filter_str"=>"{recordId:btoa(quotationsNode?.client_id)    }",
            "module_name"=>"Clients",
            "list_title"=>"Client Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'clients',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "quotations_deals"=>[
            "filter_str"=>"{recordId:btoa(quotationsNode?.deal_id)        }",
            "module_name"=>"Deals",
            "list_title"=>"Deal Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'deals',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "quotations_quotation_items"=>[
            "filter_str"=>"{quotationId:btoa(quotationsNode?.record_id)            }",
            "module_name"=>"QuotationItems",
            "list_title"=>"Quotation Items",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'quotationitems',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "quotations_invoices"=>[
            "filter_str"=>"{quotationId:btoa(quotationsNode?.record_id)                }",
            "module_name"=>"Invoices",
            "list_title"=>"Invoices",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'invoices',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "quotation_items"=>[

        "quotation_items_quotations"=>[
            "filter_str"=>"{recordId:btoa(quotation_itemsNode?.quotation_id)    }",
            "module_name"=>"Quotations",
            "list_title"=>"Quotation Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'quotations',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "invoices"=>[

        "invoices_clients"=>[
            "filter_str"=>"{recordId:btoa(invoicesNode?.client_id)    }",
            "module_name"=>"Clients",
            "list_title"=>"Client Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'clients',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "invoices_deals"=>[
            "filter_str"=>"{recordId:btoa(invoicesNode?.deal_id)        }",
            "module_name"=>"Deals",
            "list_title"=>"Deal Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'deals',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "invoices_quotations"=>[
            "filter_str"=>"{recordId:btoa(invoicesNode?.quotation_id)            }",
            "module_name"=>"Quotations",
            "list_title"=>"Quotation Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'quotations',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "invoices_invoice_items"=>[
            "filter_str"=>"{invoiceId:btoa(invoicesNode?.record_id)                }",
            "module_name"=>"InvoiceItems",
            "list_title"=>"Invoice Items",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'invoiceitems',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "invoices_payments"=>[
            "filter_str"=>"{invoiceId:btoa(invoicesNode?.record_id)                    }",
            "module_name"=>"Payments",
            "list_title"=>"Payments",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'payments',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "invoice_items"=>[

        "invoice_items_invoices"=>[
            "filter_str"=>"{recordId:btoa(invoice_itemsNode?.invoice_id)    }",
            "module_name"=>"Invoices",
            "list_title"=>"Invoice Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'invoices',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "invoice_items_services"=>[
            "filter_str"=>"{recordId:btoa(invoice_itemsNode?.item_id)        }",
            "module_name"=>"Services",
            "list_title"=>"Service detail",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'services',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "services"=>[

        "services_invoice_items"=>[
            "filter_str"=>"{itemId:btoa(servicesNode?.record_id)    }",
            "module_name"=>"InvoiceItems",
            "list_title"=>"Invoice Items",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'invoiceitems',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "payments"=>[

        "payments_invoices"=>[
            "filter_str"=>"{recordId:btoa(paymentsNode?.invoice_id)    }",
            "module_name"=>"Invoices",
            "list_title"=>"Invoice Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'invoices',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "payments_deals"=>[
            "filter_str"=>"{recordId:btoa(paymentsNode?.deal_id)        }",
            "module_name"=>"Deals",
            "list_title"=>"Deal Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'deals',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "payments_clients"=>[
            "filter_str"=>"{recordId:btoa(paymentsNode?.client_id)            }",
            "module_name"=>"Clients",
            "list_title"=>"Client Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'clients',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "tasks"=>[

        "tasks_clients"=>[
            "filter_str"=>"{recordId:btoa(tasksNode?.client_id)    }",
            "module_name"=>"Clients",
            "list_title"=>"Client Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'clients',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "tasks_deals"=>[
            "filter_str"=>"{recordId:btoa(tasksNode?.deal_id)        }",
            "module_name"=>"Deals",
            "list_title"=>"Deal Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'deals',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "tasks_users"=>[
            "filter_str"=>"{recordId:btoa(tasksNode?.assigned_sales_rep)            }",
            "module_name"=>"Users",
            "list_title"=>"Assigned User",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'users',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "activities"=>[

        "activities_clients"=>[
            "filter_str"=>"{recordId:btoa(activitiesNode?.client_id)    }",
            "module_name"=>"Clients",
            "list_title"=>"Client Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'clients',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "activities_deals"=>[
            "filter_str"=>"{recordId:btoa(activitiesNode?.deal_id)        }",
            "module_name"=>"Deals",
            "list_title"=>"Deal Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'deals',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "activities_users"=>[
            "filter_str"=>"{recordId:btoa(activitiesNode?.performed_by)            }",
            "module_name"=>"Users",
            "list_title"=>"Performed By",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'users',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "users"=>[

        "users_leads"=>[
            "filter_str"=>"{assignedSalesRep:btoa(usersNode?.record_id)    }",
            "module_name"=>"Leads",
            "list_title"=>"Assigned Leads",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'leads',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "users_clients"=>[
            "filter_str"=>"{assignedSalesRep:btoa(usersNode?.record_id)        }",
            "module_name"=>"Clients",
            "list_title"=>"Assigned Clients",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'clients',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "users_deals"=>[
            "filter_str"=>"{assignedSalesRep:btoa(usersNode?.record_id)            }",
            "module_name"=>"Deals",
            "list_title"=>"Assigned Deals",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'deals',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "users_tasks"=>[
            "filter_str"=>"{assignedSalesRep:btoa(usersNode?.record_id)                }",
            "module_name"=>"Tasks",
            "list_title"=>"Assigned Tasks",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'tasks',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "system_users"=>[

        "system_users_page_manifest_"=>[
            "filter_str"=>"{projectId:btoa(system_usersNode?.project_id)    }",
            "module_name"=>"PageManifest",
            "list_title"=>"Project Pages",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'pagemanifest',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

        "system_users_user_manifest_"=>[
            "filter_str"=>"{userId:btoa(system_usersNode?.record_id)        }",
            "module_name"=>"UserManifest",
            "list_title"=>"User Access",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'usermanifest',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "system_role_bundles"=>[

        "system_role_bundles_user_bundle_role_functions"=>[
            "filter_str"=>"{bundleId:btoa(system_role_bundlesNode?.bundle_id)    }",
            "module_name"=>"UserBundleRoleFunctions",
            "list_title"=>"Role Functions",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'userbundlerolefunctions',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "user_bundle_role_functions"=>[

        "user_bundle_role_functions_system_role_bundles"=>[
            "filter_str"=>"{bundleId:btoa(user_bundle_role_functionsNode?.bundle_id)    }",
            "module_name"=>"SystemRoleBundles",
            "list_title"=>"Bundle Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'systemrolebundles',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "user_manifest_"=>[

        "user_manifest__system_users"=>[
            "filter_str"=>"{recordId:btoa(user_manifest_Node?.user_id)    }",
            "module_name"=>"SystemUsers",
            "list_title"=>"User Details",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'systemusers',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "page_manifest_"=>[

        "page_manifest__system_users"=>[
            "filter_str"=>"{projectId:btoa(page_manifest_Node?.project_id)    }",
            "module_name"=>"SystemUsers",
            "list_title"=>"Project Users",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'systemusers',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

    "system_module_manifest_"=>[

        "system_module_manifest__page_manifest_"=>[
            "filter_str"=>"{moduleKey:btoa(system_module_manifest_Node?.module_key)    }",
            "module_name"=>"PageManifest",
            "list_title"=>"Related Pages",
            "event_name"=>"",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>'pagemanifest',
            "event_path"=>"",
            "module_path"=>"",
            "list_url"=>"",
            "profile_url"=>"",
        ],

    ],

];



///Ai Notes append mini profile for interlinked data dont remove commented code replace instead
$interlink_mapping_profile=[

    "clients"=>[

        "clients_deals"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)    }",
            "module_name"=>"Deals",
            "profile_title"=>"Deals",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"deals",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"deals",
        ],

        "clients_quotations"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)        }",
            "module_name"=>"Quotations",
            "profile_title"=>"Quotations",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"quotations",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"quotations",
        ],

        "clients_invoices"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)            }",
            "module_name"=>"Invoices",
            "profile_title"=>"Invoices",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"invoices",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"invoices",
        ],

        "clients_payments"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)                }",
            "module_name"=>"Payments",
            "profile_title"=>"Payments",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"payments",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"payments",
        ],

        "clients_tasks"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)                    }",
            "module_name"=>"Tasks",
            "profile_title"=>"Tasks",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"tasks",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"tasks",
        ],

        "clients_activities"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)                        }",
            "module_name"=>"Activities",
            "profile_title"=>"Activities",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"activities",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"activities",
        ],

        "clients_expected_revenue"=>[
            "filter_str"=>"{clientId:btoa(clientsNode?.record_id)                            }",
            "module_name"=>"ExpectedRevenue",
            "profile_title"=>"Expected Revenue",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"expectedrevenue",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"expected_revenue",
        ],

    ],

    "leads"=>[

        "leads_users"=>[
            "filter_str"=>"{recordId:btoa(leadsNode?.assigned_sales_rep)    }",
            "module_name"=>"Users",
            "profile_title"=>"Assigned Sales Rep",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"users",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"users",
        ],

    ],

    "deals"=>[

        "deals_clients"=>[
            "filter_str"=>"{recordId:btoa(dealsNode?.client_id)    }",
            "module_name"=>"Clients",
            "profile_title"=>"Client Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"clients",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"clients",
        ],

        "deals_quotations"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)        }",
            "module_name"=>"Quotations",
            "profile_title"=>"Quotations",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"quotations",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"quotations",
        ],

        "deals_invoices"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)            }",
            "module_name"=>"Invoices",
            "profile_title"=>"Invoices",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"invoices",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"invoices",
        ],

        "deals_payments"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)                }",
            "module_name"=>"Payments",
            "profile_title"=>"Payments",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"payments",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"payments",
        ],

        "deals_tasks"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)                    }",
            "module_name"=>"Tasks",
            "profile_title"=>"Tasks",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"tasks",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"tasks",
        ],

        "deals_activities"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)                        }",
            "module_name"=>"Activities",
            "profile_title"=>"Activities",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"activities",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"activities",
        ],

        "deals_expected_revenue"=>[
            "filter_str"=>"{dealId:btoa(dealsNode?.record_id)                            }",
            "module_name"=>"ExpectedRevenue",
            "profile_title"=>"Revenue",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"expectedrevenue",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"expected_revenue",
        ],

    ],

    "expected_revenue"=>[

        "expected_revenue_clients"=>[
            "filter_str"=>"{recordId:btoa(expected_revenueNode?.client_id)    }",
            "module_name"=>"Clients",
            "profile_title"=>"Client Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"clients",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"clients",
        ],

        "expected_revenue_deals"=>[
            "filter_str"=>"{recordId:btoa(expected_revenueNode?.deal_id)        }",
            "module_name"=>"Deals",
            "profile_title"=>"Deal",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"deals",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"deals",
        ],

        "expected_revenue_invoices"=>[
            "filter_str"=>"{recordId:btoa(expected_revenueNode?.invoice_id)            }",
            "module_name"=>"Invoices",
            "profile_title"=>"Invoices",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"invoices",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"invoices",
        ],

        "expected_revenue_payments"=>[
            "filter_str"=>"{transactionRef:btoa(expected_revenueNode?.payment_ref_no)                }",
            "module_name"=>"Payments",
            "profile_title"=>"Payments",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"payments",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"payments",
        ],

        "expected_revenue_activities"=>[
            "filter_str"=>"{dealId:btoa(expected_revenueNode?.record_id)                    }",
            "module_name"=>"Activities",
            "profile_title"=>"Activities",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"activities",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"activities",
        ],

    ],

    "quotations"=>[

        "quotations_clients"=>[
            "filter_str"=>"{recordId:btoa(quotationsNode?.client_id)    }",
            "module_name"=>"Clients",
            "profile_title"=>"Client Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"clients",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"clients",
        ],

        "quotations_deals"=>[
            "filter_str"=>"{recordId:btoa(quotationsNode?.deal_id)        }",
            "module_name"=>"Deals",
            "profile_title"=>"Deal Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"deals",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"deals",
        ],

        "quotations_quotation_items"=>[
            "filter_str"=>"{quotationId:btoa(quotationsNode?.record_id)            }",
            "module_name"=>"QuotationItems",
            "profile_title"=>"Quotation Items",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"quotationitems",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"quotation_items",
        ],

        "quotations_invoices"=>[
            "filter_str"=>"{quotationId:btoa(quotationsNode?.record_id)                }",
            "module_name"=>"Invoices",
            "profile_title"=>"Invoices",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"invoices",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"invoices",
        ],

    ],

    "quotation_items"=>[

        "quotation_items_quotations"=>[
            "filter_str"=>"{recordId:btoa(quotation_itemsNode?.quotation_id)    }",
            "module_name"=>"Quotations",
            "profile_title"=>"Quotation Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"quotations",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"quotations",
        ],

    ],

    "invoices"=>[

        "invoices_clients"=>[
            "filter_str"=>"{recordId:btoa(invoicesNode?.client_id)    }",
            "module_name"=>"Clients",
            "profile_title"=>"Client Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"clients",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"clients",
        ],

        "invoices_deals"=>[
            "filter_str"=>"{recordId:btoa(invoicesNode?.deal_id)        }",
            "module_name"=>"Deals",
            "profile_title"=>"Deal Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"deals",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"deals",
        ],

        "invoices_quotations"=>[
            "filter_str"=>"{recordId:btoa(invoicesNode?.quotation_id)            }",
            "module_name"=>"Quotations",
            "profile_title"=>"Quotation Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"quotations",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"quotations",
        ],

        "invoices_invoice_items"=>[
            "filter_str"=>"{invoiceId:btoa(invoicesNode?.record_id)                }",
            "module_name"=>"InvoiceItems",
            "profile_title"=>"Invoice Items",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"invoiceitems",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"invoice_items",
        ],

        "invoices_payments"=>[
            "filter_str"=>"{invoiceId:btoa(invoicesNode?.record_id)                    }",
            "module_name"=>"Payments",
            "profile_title"=>"Payments",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"payments",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"payments",
        ],

    ],

    "invoice_items"=>[

        "invoice_items_invoices"=>[
            "filter_str"=>"{recordId:btoa(invoice_itemsNode?.invoice_id)    }",
            "module_name"=>"Invoices",
            "profile_title"=>"Invoice Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"invoices",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"invoices",
        ],

        "invoice_items_services"=>[
            "filter_str"=>"{recordId:btoa(invoice_itemsNode?.item_id)        }",
            "module_name"=>"Services",
            "profile_title"=>"Service detail",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"services",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"services",
        ],

    ],

    "services"=>[

        "services_invoice_items"=>[
            "filter_str"=>"{itemId:btoa(servicesNode?.record_id)    }",
            "module_name"=>"InvoiceItems",
            "profile_title"=>"Invoice Items",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"invoiceitems",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"invoice_items",
        ],

    ],

    "payments"=>[

        "payments_invoices"=>[
            "filter_str"=>"{recordId:btoa(paymentsNode?.invoice_id)    }",
            "module_name"=>"Invoices",
            "profile_title"=>"Invoice Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"invoices",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"invoices",
        ],

        "payments_deals"=>[
            "filter_str"=>"{recordId:btoa(paymentsNode?.deal_id)        }",
            "module_name"=>"Deals",
            "profile_title"=>"Deal Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"deals",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"deals",
        ],

        "payments_clients"=>[
            "filter_str"=>"{recordId:btoa(paymentsNode?.client_id)            }",
            "module_name"=>"Clients",
            "profile_title"=>"Client Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"clients",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"clients",
        ],

    ],

    "tasks"=>[

        "tasks_clients"=>[
            "filter_str"=>"{recordId:btoa(tasksNode?.client_id)    }",
            "module_name"=>"Clients",
            "profile_title"=>"Client Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"clients",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"clients",
        ],

        "tasks_deals"=>[
            "filter_str"=>"{recordId:btoa(tasksNode?.deal_id)        }",
            "module_name"=>"Deals",
            "profile_title"=>"Deal Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"deals",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"deals",
        ],

        "tasks_users"=>[
            "filter_str"=>"{recordId:btoa(tasksNode?.assigned_sales_rep)            }",
            "module_name"=>"Users",
            "profile_title"=>"Assigned User",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"users",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"users",
        ],

    ],

    "activities"=>[

        "activities_clients"=>[
            "filter_str"=>"{recordId:btoa(activitiesNode?.client_id)    }",
            "module_name"=>"Clients",
            "profile_title"=>"Client Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"clients",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"clients",
        ],

        "activities_deals"=>[
            "filter_str"=>"{recordId:btoa(activitiesNode?.deal_id)        }",
            "module_name"=>"Deals",
            "profile_title"=>"Deal Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"deals",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"deals",
        ],

        "activities_users"=>[
            "filter_str"=>"{recordId:btoa(activitiesNode?.performed_by)            }",
            "module_name"=>"Users",
            "profile_title"=>"Performed By",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"users",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"users",
        ],

    ],

    "users"=>[

        "users_leads"=>[
            "filter_str"=>"{assignedSalesRep:btoa(usersNode?.record_id)    }",
            "module_name"=>"Leads",
            "profile_title"=>"Assigned Leads",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"leads",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"leads",
        ],

        "users_clients"=>[
            "filter_str"=>"{assignedSalesRep:btoa(usersNode?.record_id)        }",
            "module_name"=>"Clients",
            "profile_title"=>"Assigned Clients",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"clients",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"clients",
        ],

        "users_deals"=>[
            "filter_str"=>"{assignedSalesRep:btoa(usersNode?.record_id)            }",
            "module_name"=>"Deals",
            "profile_title"=>"Assigned Deals",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"deals",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"deals",
        ],

        "users_tasks"=>[
            "filter_str"=>"{assignedSalesRep:btoa(usersNode?.record_id)                }",
            "module_name"=>"Tasks",
            "profile_title"=>"Assigned Tasks",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"tasks",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"tasks",
        ],

    ],

    "system_users"=>[

        "system_users_page_manifest_"=>[
            "filter_str"=>"{projectId:btoa(system_usersNode?.project_id)    }",
            "module_name"=>"PageManifest",
            "profile_title"=>"Project Pages",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"pagemanifest",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"page_manifest_",
        ],

        "system_users_user_manifest_"=>[
            "filter_str"=>"{userId:btoa(system_usersNode?.record_id)        }",
            "module_name"=>"UserManifest",
            "profile_title"=>"User Access",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"usermanifest",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"user_manifest_",
        ],

    ],

    "system_role_bundles"=>[

        "system_role_bundles_user_bundle_role_functions"=>[
            "filter_str"=>"{bundleId:btoa(system_role_bundlesNode?.bundle_id)    }",
            "module_name"=>"UserBundleRoleFunctions",
            "profile_title"=>"Role Functions",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"userbundlerolefunctions",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"user_bundle_role_functions",
        ],

    ],

    "user_bundle_role_functions"=>[

        "user_bundle_role_functions_system_role_bundles"=>[
            "filter_str"=>"{bundleId:btoa(user_bundle_role_functionsNode?.bundle_id)    }",
            "module_name"=>"SystemRoleBundles",
            "profile_title"=>"Bundle Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"systemrolebundles",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"system_role_bundles",
        ],

    ],

    "user_manifest_"=>[

        "user_manifest__system_users"=>[
            "filter_str"=>"{recordId:btoa(user_manifest_Node?.user_id)    }",
            "module_name"=>"SystemUsers",
            "profile_title"=>"User Details",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"systemusers",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"system_users",
        ],

    ],

    "page_manifest_"=>[

        "page_manifest__system_users"=>[
            "filter_str"=>"{projectId:btoa(page_manifest_Node?.project_id)    }",
            "module_name"=>"SystemUsers",
            "profile_title"=>"Project Users",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"systemusers",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"system_users",
        ],

    ],

    "system_module_manifest_"=>[

        "system_module_manifest__page_manifest_"=>[
            "filter_str"=>"{moduleKey:btoa(system_module_manifest_Node?.module_key)    }",
            "module_name"=>"PageManifest",
            "profile_title"=>"Related Pages",
            "custom"=>false,
            "external"=>true,
            "enabled"=>true,
            "alias"=>"pagemanifest",
            "event_name"=>"",
            "event_path"=>"",
            "list_table_name"=>"page_manifest_",
        ],

    ],

];



///Ai Notes universal database connection mapping
$connection_col_mapping=[

    "clients"=>[
        "record_id" => "expected_revenue:client_id:revenue_title:apiRoutes.expectedrevenue.base",
    ],

    "leads"=>[
        "assigned_sales_rep" => "users:record_id:full_name:apiRoutes.users.base",
    ],

    "deals"=>[
        "client_id" => "clients:record_id:full_name:apiRoutes.clients.base",
        "record_id" => "expected_revenue:deal_id:revenue_title:apiRoutes.expectedrevenue.base",
    ],

    "expected_revenue"=>[
        "client_id" => "clients:record_id:full_name:apiRoutes.clients.base",
        "deal_id" => "deals:record_id:deal_title:apiRoutes.deals.base",
        "invoice_id" => "invoices:record_id:invoice_title:apiRoutes.invoices.base",
        "payment_ref_no" => "payments:transaction_ref:transaction_ref:apiRoutes.payments.base",
        "record_id" => "activities:deal_id:activity_title:apiRoutes.activities.base",
    ],

    "quotations"=>[
        "client_id" => "clients:record_id:full_name:apiRoutes.clients.base",
        "deal_id" => "deals:record_id:deal_title:apiRoutes.deals.base",
        "record_id" => "invoices:quotation_id:invoice_title:apiRoutes.invoices.base",
    ],

    "quotation_items"=>[
        "quotation_id" => "quotations:record_id:quotation_title:apiRoutes.quotations.base",
    ],

    "invoices"=>[
        "client_id" => "clients:record_id:full_name:apiRoutes.clients.base",
        "deal_id" => "deals:record_id:deal_title:apiRoutes.deals.base",
        "quotation_id" => "quotations:record_id:quotation_title:apiRoutes.quotations.base",
        "record_id" => "payments:invoice_id:transaction_ref:apiRoutes.payments.base",
    ],

    "invoice_items"=>[
        "invoice_id" => "invoices:record_id:invoice_title:apiRoutes.invoices.base",
        "item_id" => "services:record_id:service_name:apiRoutes.services.base",
    ],

    "services"=>[
        "record_id" => "invoice_items:item_id:invoice_item_name:apiRoutes.invoiceitems.base",
    ],

    "payments"=>[
        "invoice_id" => "invoices:record_id:invoice_title:apiRoutes.invoices.base",
        "deal_id" => "deals:record_id:deal_title:apiRoutes.deals.base",
        "client_id" => "clients:record_id:full_name:apiRoutes.clients.base",
    ],

    "tasks"=>[
        "client_id" => "clients:record_id:full_name:apiRoutes.clients.base",
        "deal_id" => "deals:record_id:deal_title:apiRoutes.deals.base",
        "assigned_sales_rep" => "users:record_id:full_name:apiRoutes.users.base",
    ],

    "activities"=>[
        "client_id" => "clients:record_id:full_name:apiRoutes.clients.base",
        "deal_id" => "deals:record_id:deal_title:apiRoutes.deals.base",
        "performed_by" => "users:record_id:full_name:apiRoutes.users.base",
    ],

    "users"=>[
        "record_id" => "tasks:assigned_sales_rep:task_title:apiRoutes.tasks.base",
    ],

    "system_users"=>[
        "project_id" => "page_manifest_:project_id:page_url:apiRoutes.pagemanifest.base",
        "record_id" => "user_manifest_:user_id:user_name:apiRoutes.usermanifest.base",
    ],

    "system_role_bundles"=>[
        "bundle_id" => "user_bundle_role_functions:bundle_id:role_name:apiRoutes.userbundlerolefunctions.base",
    ],

    "user_bundle_role_functions"=>[
        "bundle_id" => "system_role_bundles:bundle_id:bundle_name:apiRoutes.systemrolebundles.base",
    ],

    "user_manifest_"=>[
        "user_id" => "system_users:record_id:name:apiRoutes.systemusers.base",
    ],

    "page_manifest_"=>[
        "project_id" => "system_users:project_id:name:apiRoutes.systemusers.base",
    ],

    "system_module_manifest_"=>[
        "module_key" => "page_manifest_:module_key:page_url:apiRoutes.pagemanifest.base",
    ],

];


  
///Ai Notes on each row you add more actions eg, view collections, send message dont remove commented code replace instead
$list_drop_down_mappper=[

    "clients"=>[

        "list : Deals"=>[
            "fe"=>"viewDeals({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})",
            "file"=>"deals-automapper",
            "module_name"=>"Deals",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"clients",
            "childTable"=>"deals",
            "fileTitle"=>"Deals",
            "alias"=>"deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : Quotations"=>[
            "fe"=>"viewQuotations({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})",
            "file"=>"quotations-automapper",
            "module_name"=>"Quotations",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationsList",
            "parentTable"=>"clients",
            "childTable"=>"quotations",
            "fileTitle"=>"Quotations",
            "alias"=>"quotations",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotations/logicControl"
        ],

        "list : Invoices"=>[
            "fe"=>"viewInvoices({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})",
            "file"=>"invoices-automapper",
            "module_name"=>"Invoices",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"clients",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoices",
            "alias"=>"invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : Payments"=>[
            "fe"=>"viewPayments({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})",
            "file"=>"payments-automapper",
            "module_name"=>"Payments",
            "functionType"=>"autoMapper",
            "parentName"=>"PaymentsList",
            "parentTable"=>"clients",
            "childTable"=>"payments",
            "fileTitle"=>"Payments",
            "alias"=>"payments",
            "functionType"=>"autoMapper",
            "basepath"=>"../../payments/logicControl"
        ],

        "list : Tasks"=>[
            "fe"=>"viewTasks({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})",
            "file"=>"tasks-automapper",
            "module_name"=>"Tasks",
            "functionType"=>"autoMapper",
            "parentName"=>"TasksList",
            "parentTable"=>"clients",
            "childTable"=>"tasks",
            "fileTitle"=>"Tasks",
            "alias"=>"tasks",
            "functionType"=>"autoMapper",
            "basepath"=>"../../tasks/logicControl"
        ],

        "list : Activities"=>[
            "fe"=>"viewActivities({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})",
            "file"=>"activities-automapper",
            "module_name"=>"Activities",
            "functionType"=>"autoMapper",
            "parentName"=>"ActivitiesList",
            "parentTable"=>"clients",
            "childTable"=>"activities",
            "fileTitle"=>"Activities",
            "alias"=>"activities",
            "functionType"=>"autoMapper",
            "basepath"=>"../../activities/logicControl"
        ],

        "list : Expected Revenue"=>[
            "fe"=>"viewExpectedRevenue({childCol:`clientId`,parentColVal:listclients_result.record_id,parentName:listclients_result.full_name})",
            "file"=>"expected_revenue-automapper",
            "module_name"=>"ExpectedRevenue",
            "functionType"=>"autoMapper",
            "parentName"=>"ExpectedRevenueList",
            "parentTable"=>"clients",
            "childTable"=>"expected_revenue",
            "fileTitle"=>"Expected Revenue",
            "alias"=>"expectedrevenue",
            "functionType"=>"autoMapper",
            "basepath"=>"../../expectedrevenue/logicControl"
        ],

    ],

    "leads"=>[

        "list : Assigned Sales Rep"=>[
            "fe"=>"viewUsers({childCol:`recordId`,parentColVal:listleads_result.assigned_sales_rep,parentName:listleads_result.full_name})",
            "file"=>"users-automapper",
            "module_name"=>"Users",
            "functionType"=>"autoMapper",
            "parentName"=>"UsersList",
            "parentTable"=>"leads",
            "childTable"=>"users",
            "fileTitle"=>"Assigned Sales Rep",
            "alias"=>"users",
            "functionType"=>"autoMapper",
            "basepath"=>"../../users/logicControl"
        ],

    ],

    "deals"=>[

        "list : Client Details"=>[
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:listdeals_result.client_id,parentName:listdeals_result.deal_title})",
            "file"=>"clients-automapper",
            "module_name"=>"Clients",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"deals",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "alias"=>"clients",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : Quotations"=>[
            "fe"=>"viewQuotations({childCol:`dealId`,parentColVal:listdeals_result.record_id,parentName:listdeals_result.deal_title})",
            "file"=>"quotations-automapper",
            "module_name"=>"Quotations",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationsList",
            "parentTable"=>"deals",
            "childTable"=>"quotations",
            "fileTitle"=>"Quotations",
            "alias"=>"quotations",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotations/logicControl"
        ],

        "list : Invoices"=>[
            "fe"=>"viewInvoices({childCol:`dealId`,parentColVal:listdeals_result.record_id,parentName:listdeals_result.deal_title})",
            "file"=>"invoices-automapper",
            "module_name"=>"Invoices",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"deals",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoices",
            "alias"=>"invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : Payments"=>[
            "fe"=>"viewPayments({childCol:`dealId`,parentColVal:listdeals_result.record_id,parentName:listdeals_result.deal_title})",
            "file"=>"payments-automapper",
            "module_name"=>"Payments",
            "functionType"=>"autoMapper",
            "parentName"=>"PaymentsList",
            "parentTable"=>"deals",
            "childTable"=>"payments",
            "fileTitle"=>"Payments",
            "alias"=>"payments",
            "functionType"=>"autoMapper",
            "basepath"=>"../../payments/logicControl"
        ],

        "list : Tasks"=>[
            "fe"=>"viewTasks({childCol:`dealId`,parentColVal:listdeals_result.record_id,parentName:listdeals_result.deal_title})",
            "file"=>"tasks-automapper",
            "module_name"=>"Tasks",
            "functionType"=>"autoMapper",
            "parentName"=>"TasksList",
            "parentTable"=>"deals",
            "childTable"=>"tasks",
            "fileTitle"=>"Tasks",
            "alias"=>"tasks",
            "functionType"=>"autoMapper",
            "basepath"=>"../../tasks/logicControl"
        ],

        "list : Activities"=>[
            "fe"=>"viewActivities({childCol:`dealId`,parentColVal:listdeals_result.record_id,parentName:listdeals_result.deal_title})",
            "file"=>"activities-automapper",
            "module_name"=>"Activities",
            "functionType"=>"autoMapper",
            "parentName"=>"ActivitiesList",
            "parentTable"=>"deals",
            "childTable"=>"activities",
            "fileTitle"=>"Activities",
            "alias"=>"activities",
            "functionType"=>"autoMapper",
            "basepath"=>"../../activities/logicControl"
        ],

        "list : Revenue"=>[
            "fe"=>"viewExpectedRevenue({childCol:`dealId`,parentColVal:listdeals_result.record_id,parentName:listdeals_result.deal_title})",
            "file"=>"expected_revenue-automapper",
            "module_name"=>"ExpectedRevenue",
            "functionType"=>"autoMapper",
            "parentName"=>"ExpectedRevenueList",
            "parentTable"=>"deals",
            "childTable"=>"expected_revenue",
            "fileTitle"=>"Revenue",
            "alias"=>"expectedrevenue",
            "functionType"=>"autoMapper",
            "basepath"=>"../../expectedrevenue/logicControl"
        ],

    ],

    "expected_revenue"=>[

        "list : Client Details"=>[
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:listexpected_revenue_result.client_id,parentName:listexpected_revenue_result.revenue_title})",
            "file"=>"clients-automapper",
            "module_name"=>"Clients",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "alias"=>"clients",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : Deal"=>[
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:listexpected_revenue_result.deal_id,parentName:listexpected_revenue_result.revenue_title})",
            "file"=>"deals-automapper",
            "module_name"=>"Deals",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"deals",
            "fileTitle"=>"Deal",
            "alias"=>"deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : Invoices"=>[
            "fe"=>"viewInvoices({childCol:`recordId`,parentColVal:listexpected_revenue_result.invoice_id,parentName:listexpected_revenue_result.revenue_title})",
            "file"=>"invoices-automapper",
            "module_name"=>"Invoices",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoices",
            "alias"=>"invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : Payments"=>[
            "fe"=>"viewPayments({childCol:`transactionRef`,parentColVal:listexpected_revenue_result.payment_ref_no,parentName:listexpected_revenue_result.revenue_title})",
            "file"=>"payments-automapper",
            "module_name"=>"Payments",
            "functionType"=>"autoMapper",
            "parentName"=>"PaymentsList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"payments",
            "fileTitle"=>"Payments",
            "alias"=>"payments",
            "functionType"=>"autoMapper",
            "basepath"=>"../../payments/logicControl"
        ],

        "list : Activities"=>[
            "fe"=>"viewActivities({childCol:`dealId`,parentColVal:listexpected_revenue_result.record_id,parentName:listexpected_revenue_result.revenue_title})",
            "file"=>"activities-automapper",
            "module_name"=>"Activities",
            "functionType"=>"autoMapper",
            "parentName"=>"ActivitiesList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"activities",
            "fileTitle"=>"Activities",
            "alias"=>"activities",
            "functionType"=>"autoMapper",
            "basepath"=>"../../activities/logicControl"
        ],

    ],

    "quotations"=>[

        "list : Client Details"=>[
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:listquotations_result.client_id,parentName:listquotations_result.quotation_title})",
            "file"=>"clients-automapper",
            "module_name"=>"Clients",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"quotations",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "alias"=>"clients",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : Deal Details"=>[
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:listquotations_result.deal_id,parentName:listquotations_result.quotation_title})",
            "file"=>"deals-automapper",
            "module_name"=>"Deals",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"quotations",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "alias"=>"deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : Quotation Items"=>[
            "fe"=>"viewQuotationItems({childCol:`quotationId`,parentColVal:listquotations_result.record_id,parentName:listquotations_result.quotation_title})",
            "file"=>"quotation_items-automapper",
            "module_name"=>"QuotationItems",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationItemsList",
            "parentTable"=>"quotations",
            "childTable"=>"quotation_items",
            "fileTitle"=>"Quotation Items",
            "alias"=>"quotationitems",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotationitems/logicControl"
        ],

        "list : Invoices"=>[
            "fe"=>"viewInvoices({childCol:`quotationId`,parentColVal:listquotations_result.record_id,parentName:listquotations_result.quotation_title})",
            "file"=>"invoices-automapper",
            "module_name"=>"Invoices",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"quotations",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoices",
            "alias"=>"invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

    ],

    "quotation_items"=>[

        "list : Quotation Details"=>[
            "fe"=>"viewQuotations({childCol:`recordId`,parentColVal:listquotation_items_result.quotation_id,parentName:listquotation_items_result.item_name})",
            "file"=>"quotations-automapper",
            "module_name"=>"Quotations",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationsList",
            "parentTable"=>"quotation_items",
            "childTable"=>"quotations",
            "fileTitle"=>"Quotation Details",
            "alias"=>"quotations",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotations/logicControl"
        ],

    ],

    "invoices"=>[

        "list : Client Details"=>[
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:listinvoices_result.client_id,parentName:listinvoices_result.invoice_title})",
            "file"=>"clients-automapper",
            "module_name"=>"Clients",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"invoices",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "alias"=>"clients",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : Deal Details"=>[
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:listinvoices_result.deal_id,parentName:listinvoices_result.invoice_title})",
            "file"=>"deals-automapper",
            "module_name"=>"Deals",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"invoices",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "alias"=>"deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : Quotation Details"=>[
            "fe"=>"viewQuotations({childCol:`recordId`,parentColVal:listinvoices_result.quotation_id,parentName:listinvoices_result.invoice_title})",
            "file"=>"quotations-automapper",
            "module_name"=>"Quotations",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationsList",
            "parentTable"=>"invoices",
            "childTable"=>"quotations",
            "fileTitle"=>"Quotation Details",
            "alias"=>"quotations",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotations/logicControl"
        ],

        "list : Invoice Items"=>[
            "fe"=>"viewInvoiceItems({childCol:`invoiceId`,parentColVal:listinvoices_result.record_id,parentName:listinvoices_result.invoice_title})",
            "file"=>"invoice_items-automapper",
            "module_name"=>"InvoiceItems",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoiceItemsList",
            "parentTable"=>"invoices",
            "childTable"=>"invoice_items",
            "fileTitle"=>"Invoice Items",
            "alias"=>"invoiceitems",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoiceitems/logicControl"
        ],

        "list : Payments"=>[
            "fe"=>"viewPayments({childCol:`invoiceId`,parentColVal:listinvoices_result.record_id,parentName:listinvoices_result.invoice_title})",
            "file"=>"payments-automapper",
            "module_name"=>"Payments",
            "functionType"=>"autoMapper",
            "parentName"=>"PaymentsList",
            "parentTable"=>"invoices",
            "childTable"=>"payments",
            "fileTitle"=>"Payments",
            "alias"=>"payments",
            "functionType"=>"autoMapper",
            "basepath"=>"../../payments/logicControl"
        ],

    ],

    "invoice_items"=>[

        "list : Invoice Details"=>[
            "fe"=>"viewInvoices({childCol:`recordId`,parentColVal:listinvoice_items_result.invoice_id,parentName:listinvoice_items_result.invoice_item_name})",
            "file"=>"invoices-automapper",
            "module_name"=>"Invoices",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"invoice_items",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoice Details",
            "alias"=>"invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : Service detail"=>[
            "fe"=>"viewServices({childCol:`recordId`,parentColVal:listinvoice_items_result.item_id,parentName:listinvoice_items_result.invoice_item_name})",
            "file"=>"services-automapper",
            "module_name"=>"Services",
            "functionType"=>"autoMapper",
            "parentName"=>"ServicesList",
            "parentTable"=>"invoice_items",
            "childTable"=>"services",
            "fileTitle"=>"Service detail",
            "alias"=>"services",
            "functionType"=>"autoMapper",
            "basepath"=>"../../services/logicControl"
        ],

    ],

    "services"=>[

        "list : Invoice Items"=>[
            "fe"=>"viewInvoiceItems({childCol:`itemId`,parentColVal:listservices_result.record_id,parentName:listservices_result.service_name})",
            "file"=>"invoice_items-automapper",
            "module_name"=>"InvoiceItems",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoiceItemsList",
            "parentTable"=>"services",
            "childTable"=>"invoice_items",
            "fileTitle"=>"Invoice Items",
            "alias"=>"invoiceitems",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoiceitems/logicControl"
        ],

    ],

    "payments"=>[

        "list : Invoice Details"=>[
            "fe"=>"viewInvoices({childCol:`recordId`,parentColVal:listpayments_result.invoice_id,parentName:listpayments_result.transaction_ref})",
            "file"=>"invoices-automapper",
            "module_name"=>"Invoices",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"payments",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoice Details",
            "alias"=>"invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : Deal Details"=>[
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:listpayments_result.deal_id,parentName:listpayments_result.transaction_ref})",
            "file"=>"deals-automapper",
            "module_name"=>"Deals",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"payments",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "alias"=>"deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : Client Details"=>[
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:listpayments_result.client_id,parentName:listpayments_result.transaction_ref})",
            "file"=>"clients-automapper",
            "module_name"=>"Clients",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"payments",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "alias"=>"clients",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

    ],

    "tasks"=>[

        "list : Client Details"=>[
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:listtasks_result.client_id,parentName:listtasks_result.task_title})",
            "file"=>"clients-automapper",
            "module_name"=>"Clients",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"tasks",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "alias"=>"clients",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : Deal Details"=>[
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:listtasks_result.deal_id,parentName:listtasks_result.task_title})",
            "file"=>"deals-automapper",
            "module_name"=>"Deals",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"tasks",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "alias"=>"deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : Assigned User"=>[
            "fe"=>"viewUsers({childCol:`recordId`,parentColVal:listtasks_result.assigned_sales_rep,parentName:listtasks_result.task_title})",
            "file"=>"users-automapper",
            "module_name"=>"Users",
            "functionType"=>"autoMapper",
            "parentName"=>"UsersList",
            "parentTable"=>"tasks",
            "childTable"=>"users",
            "fileTitle"=>"Assigned User",
            "alias"=>"users",
            "functionType"=>"autoMapper",
            "basepath"=>"../../users/logicControl"
        ],

    ],

    "activities"=>[

        "list : Client Details"=>[
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:listactivities_result.client_id,parentName:listactivities_result.activity_title})",
            "file"=>"clients-automapper",
            "module_name"=>"Clients",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"activities",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "alias"=>"clients",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : Deal Details"=>[
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:listactivities_result.deal_id,parentName:listactivities_result.activity_title})",
            "file"=>"deals-automapper",
            "module_name"=>"Deals",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"activities",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "alias"=>"deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : Performed By"=>[
            "fe"=>"viewUsers({childCol:`recordId`,parentColVal:listactivities_result.performed_by,parentName:listactivities_result.activity_title})",
            "file"=>"users-automapper",
            "module_name"=>"Users",
            "functionType"=>"autoMapper",
            "parentName"=>"UsersList",
            "parentTable"=>"activities",
            "childTable"=>"users",
            "fileTitle"=>"Performed By",
            "alias"=>"users",
            "functionType"=>"autoMapper",
            "basepath"=>"../../users/logicControl"
        ],

    ],

    "users"=>[

        "list : Assigned Leads"=>[
            "fe"=>"viewLeads({childCol:`assignedSalesRep`,parentColVal:listusers_result.record_id,parentName:listusers_result.full_name})",
            "file"=>"leads-automapper",
            "module_name"=>"Leads",
            "functionType"=>"autoMapper",
            "parentName"=>"LeadsList",
            "parentTable"=>"users",
            "childTable"=>"leads",
            "fileTitle"=>"Assigned Leads",
            "alias"=>"leads",
            "functionType"=>"autoMapper",
            "basepath"=>"../../leads/logicControl"
        ],

        "list : Assigned Clients"=>[
            "fe"=>"viewClients({childCol:`assignedSalesRep`,parentColVal:listusers_result.record_id,parentName:listusers_result.full_name})",
            "file"=>"clients-automapper",
            "module_name"=>"Clients",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"users",
            "childTable"=>"clients",
            "fileTitle"=>"Assigned Clients",
            "alias"=>"clients",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : Assigned Deals"=>[
            "fe"=>"viewDeals({childCol:`assignedSalesRep`,parentColVal:listusers_result.record_id,parentName:listusers_result.full_name})",
            "file"=>"deals-automapper",
            "module_name"=>"Deals",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"users",
            "childTable"=>"deals",
            "fileTitle"=>"Assigned Deals",
            "alias"=>"deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : Assigned Tasks"=>[
            "fe"=>"viewTasks({childCol:`assignedSalesRep`,parentColVal:listusers_result.record_id,parentName:listusers_result.full_name})",
            "file"=>"tasks-automapper",
            "module_name"=>"Tasks",
            "functionType"=>"autoMapper",
            "parentName"=>"TasksList",
            "parentTable"=>"users",
            "childTable"=>"tasks",
            "fileTitle"=>"Assigned Tasks",
            "alias"=>"tasks",
            "functionType"=>"autoMapper",
            "basepath"=>"../../tasks/logicControl"
        ],

    ],

    "system_users"=>[

        "list : Project Pages"=>[
            "fe"=>"viewPageManifest({childCol:`projectId`,parentColVal:listsystem_users_result.project_id,parentName:listsystem_users_result.name})",
            "file"=>"page_manifest_-automapper",
            "module_name"=>"PageManifest",
            "functionType"=>"autoMapper",
            "parentName"=>"PageManifestList",
            "parentTable"=>"system_users",
            "childTable"=>"page_manifest_",
            "fileTitle"=>"Project Pages",
            "alias"=>"pagemanifest",
            "functionType"=>"autoMapper",
            "basepath"=>"../../pagemanifest/logicControl"
        ],

        "list : User Access"=>[
            "fe"=>"viewUserManifest({childCol:`userId`,parentColVal:listsystem_users_result.record_id,parentName:listsystem_users_result.name})",
            "file"=>"user_manifest_-automapper",
            "module_name"=>"UserManifest",
            "functionType"=>"autoMapper",
            "parentName"=>"UserManifestList",
            "parentTable"=>"system_users",
            "childTable"=>"user_manifest_",
            "fileTitle"=>"User Access",
            "alias"=>"usermanifest",
            "functionType"=>"autoMapper",
            "basepath"=>"../../usermanifest/logicControl"
        ],

    ],

    "system_role_bundles"=>[

        "list : Role Functions"=>[
            "fe"=>"viewUserBundleRoleFunctions({childCol:`bundleId`,parentColVal:listsystem_role_bundles_result.bundle_id,parentName:listsystem_role_bundles_result.bundle_name})",
            "file"=>"user_bundle_role_functions-automapper",
            "module_name"=>"UserBundleRoleFunctions",
            "functionType"=>"autoMapper",
            "parentName"=>"UserBundleRoleFunctionsList",
            "parentTable"=>"system_role_bundles",
            "childTable"=>"user_bundle_role_functions",
            "fileTitle"=>"Role Functions",
            "alias"=>"userbundlerolefunctions",
            "functionType"=>"autoMapper",
            "basepath"=>"../../userbundlerolefunctions/logicControl"
        ],

    ],

    "user_bundle_role_functions"=>[

        "list : Bundle Details"=>[
            "fe"=>"viewSystemRoleBundles({childCol:`bundleId`,parentColVal:listuser_bundle_role_functions_result.bundle_id,parentName:listuser_bundle_role_functions_result.role_name})",
            "file"=>"system_role_bundles-automapper",
            "module_name"=>"SystemRoleBundles",
            "functionType"=>"autoMapper",
            "parentName"=>"SystemRoleBundlesList",
            "parentTable"=>"user_bundle_role_functions",
            "childTable"=>"system_role_bundles",
            "fileTitle"=>"Bundle Details",
            "alias"=>"systemrolebundles",
            "functionType"=>"autoMapper",
            "basepath"=>"../../systemrolebundles/logicControl"
        ],

    ],

    "user_manifest_"=>[

        "list : User Details"=>[
            "fe"=>"viewSystemUsers({childCol:`recordId`,parentColVal:listuser_manifest__result.user_id,parentName:listuser_manifest__result.user_name})",
            "file"=>"system_users-automapper",
            "module_name"=>"SystemUsers",
            "functionType"=>"autoMapper",
            "parentName"=>"SystemUsersList",
            "parentTable"=>"user_manifest_",
            "childTable"=>"system_users",
            "fileTitle"=>"User Details",
            "alias"=>"systemusers",
            "functionType"=>"autoMapper",
            "basepath"=>"../../systemusers/logicControl"
        ],

    ],

    "page_manifest_"=>[

        "list : Project Users"=>[
            "fe"=>"viewSystemUsers({childCol:`projectId`,parentColVal:listpage_manifest__result.project_id,parentName:listpage_manifest__result.page_url})",
            "file"=>"system_users-automapper",
            "module_name"=>"SystemUsers",
            "functionType"=>"autoMapper",
            "parentName"=>"SystemUsersList",
            "parentTable"=>"page_manifest_",
            "childTable"=>"system_users",
            "fileTitle"=>"Project Users",
            "alias"=>"systemusers",
            "functionType"=>"autoMapper",
            "basepath"=>"../../systemusers/logicControl"
        ],

    ],

    "system_module_manifest_"=>[

        "list : Related Pages"=>[
            "fe"=>"viewPageManifest({childCol:`moduleKey`,parentColVal:listsystem_module_manifest__result.module_key,parentName:listsystem_module_manifest__result.module_name})",
            "file"=>"page_manifest_-automapper",
            "module_name"=>"PageManifest",
            "functionType"=>"autoMapper",
            "parentName"=>"PageManifestList",
            "parentTable"=>"system_module_manifest_",
            "childTable"=>"page_manifest_",
            "fileTitle"=>"Related Pages",
            "alias"=>"pagemanifest",
            "functionType"=>"autoMapper",
            "basepath"=>"../../pagemanifest/logicControl"
        ],

    ],

];


/// Ai Notes buttons you want on the profile /form page dont remove commented code replace instead 
$profile_mapper_buttons_list_=[

    "clients"=>[

        "list : View Deals"=>[
            "module_name"=>"Deals",
            "fe"=>"viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})",
            "alias"=>"deals",
            "file"=>"deals-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"clients",
            "childTable"=>"deals",
            "fileTitle"=>"Deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : View Quotations"=>[
            "module_name"=>"Quotations",
            "fe"=>"viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})",
            "alias"=>"quotations",
            "file"=>"quotations-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationsList",
            "parentTable"=>"clients",
            "childTable"=>"quotations",
            "fileTitle"=>"Quotations",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotations/logicControl"
        ],

        "list : View Invoices"=>[
            "module_name"=>"Invoices",
            "fe"=>"viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})",
            "alias"=>"invoices",
            "file"=>"invoices-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"clients",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : View Payments"=>[
            "module_name"=>"Payments",
            "fe"=>"viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})",
            "alias"=>"payments",
            "file"=>"payments-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"PaymentsList",
            "parentTable"=>"clients",
            "childTable"=>"payments",
            "fileTitle"=>"Payments",
            "functionType"=>"autoMapper",
            "basepath"=>"../../payments/logicControl"
        ],

        "list : View Tasks"=>[
            "module_name"=>"Tasks",
            "fe"=>"viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})",
            "alias"=>"tasks",
            "file"=>"tasks-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"TasksList",
            "parentTable"=>"clients",
            "childTable"=>"tasks",
            "fileTitle"=>"Tasks",
            "functionType"=>"autoMapper",
            "basepath"=>"../../tasks/logicControl"
        ],

        "list : View Activities"=>[
            "module_name"=>"Activities",
            "fe"=>"viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})",
            "alias"=>"activities",
            "file"=>"activities-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ActivitiesList",
            "parentTable"=>"clients",
            "childTable"=>"activities",
            "fileTitle"=>"Activities",
            "functionType"=>"autoMapper",
            "basepath"=>"../../activities/logicControl"
        ],

        "list : View Expected Revenue"=>[
            "module_name"=>"ExpectedRevenue",
            "fe"=>"viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})",
            "alias"=>"expectedrevenue",
            "file"=>"expected_revenue-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ExpectedRevenueList",
            "parentTable"=>"clients",
            "childTable"=>"expected_revenue",
            "fileTitle"=>"Expected Revenue",
            "functionType"=>"autoMapper",
            "basepath"=>"../../expectedrevenue/logicControl"
        ],

    ],

    "leads"=>[

        "list : View Assigned Sales Rep"=>[
            "module_name"=>"Users",
            "fe"=>"viewUsers({childCol:`recordId`,parentColVal:leadsNode.assigned_sales_rep,parentName:leadsNode.full_name})",
            "alias"=>"users",
            "file"=>"users-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"UsersList",
            "parentTable"=>"leads",
            "childTable"=>"users",
            "fileTitle"=>"Assigned Sales Rep",
            "functionType"=>"autoMapper",
            "basepath"=>"../../users/logicControl"
        ],

    ],

    "deals"=>[

        "list : View Client Details"=>[
            "module_name"=>"Clients",
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:dealsNode.client_id,parentName:dealsNode.deal_title})",
            "alias"=>"clients",
            "file"=>"clients-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"deals",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : View Quotations"=>[
            "module_name"=>"Quotations",
            "fe"=>"viewQuotations({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})",
            "alias"=>"quotations",
            "file"=>"quotations-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationsList",
            "parentTable"=>"deals",
            "childTable"=>"quotations",
            "fileTitle"=>"Quotations",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotations/logicControl"
        ],

        "list : View Invoices"=>[
            "module_name"=>"Invoices",
            "fe"=>"viewInvoices({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})",
            "alias"=>"invoices",
            "file"=>"invoices-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"deals",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : View Payments"=>[
            "module_name"=>"Payments",
            "fe"=>"viewPayments({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})",
            "alias"=>"payments",
            "file"=>"payments-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"PaymentsList",
            "parentTable"=>"deals",
            "childTable"=>"payments",
            "fileTitle"=>"Payments",
            "functionType"=>"autoMapper",
            "basepath"=>"../../payments/logicControl"
        ],

        "list : View Tasks"=>[
            "module_name"=>"Tasks",
            "fe"=>"viewTasks({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})",
            "alias"=>"tasks",
            "file"=>"tasks-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"TasksList",
            "parentTable"=>"deals",
            "childTable"=>"tasks",
            "fileTitle"=>"Tasks",
            "functionType"=>"autoMapper",
            "basepath"=>"../../tasks/logicControl"
        ],

        "list : View Activities"=>[
            "module_name"=>"Activities",
            "fe"=>"viewActivities({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})",
            "alias"=>"activities",
            "file"=>"activities-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ActivitiesList",
            "parentTable"=>"deals",
            "childTable"=>"activities",
            "fileTitle"=>"Activities",
            "functionType"=>"autoMapper",
            "basepath"=>"../../activities/logicControl"
        ],

        "list : View Revenue"=>[
            "module_name"=>"ExpectedRevenue",
            "fe"=>"viewExpectedRevenue({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})",
            "alias"=>"expectedrevenue",
            "file"=>"expected_revenue-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ExpectedRevenueList",
            "parentTable"=>"deals",
            "childTable"=>"expected_revenue",
            "fileTitle"=>"Revenue",
            "functionType"=>"autoMapper",
            "basepath"=>"../../expectedrevenue/logicControl"
        ],

    ],

    "expected_revenue"=>[

        "list : View Client Details"=>[
            "module_name"=>"Clients",
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})",
            "alias"=>"clients",
            "file"=>"clients-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : View Deal"=>[
            "module_name"=>"Deals",
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})",
            "alias"=>"deals",
            "file"=>"deals-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"deals",
            "fileTitle"=>"Deal",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : View Invoices"=>[
            "module_name"=>"Invoices",
            "fe"=>"viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})",
            "alias"=>"invoices",
            "file"=>"invoices-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : View Payments"=>[
            "module_name"=>"Payments",
            "fe"=>"viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})",
            "alias"=>"payments",
            "file"=>"payments-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"PaymentsList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"payments",
            "fileTitle"=>"Payments",
            "functionType"=>"autoMapper",
            "basepath"=>"../../payments/logicControl"
        ],

        "list : View Activities"=>[
            "module_name"=>"Activities",
            "fe"=>"viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})",
            "alias"=>"activities",
            "file"=>"activities-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ActivitiesList",
            "parentTable"=>"expected_revenue",
            "childTable"=>"activities",
            "fileTitle"=>"Activities",
            "functionType"=>"autoMapper",
            "basepath"=>"../../activities/logicControl"
        ],

    ],

    "quotations"=>[

        "list : View Client Details"=>[
            "module_name"=>"Clients",
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:quotationsNode.client_id,parentName:quotationsNode.quotation_title})",
            "alias"=>"clients",
            "file"=>"clients-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"quotations",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : View Deal Details"=>[
            "module_name"=>"Deals",
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:quotationsNode.deal_id,parentName:quotationsNode.quotation_title})",
            "alias"=>"deals",
            "file"=>"deals-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"quotations",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : View Quotation Items"=>[
            "module_name"=>"QuotationItems",
            "fe"=>"viewQuotationItems({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})",
            "alias"=>"quotationitems",
            "file"=>"quotation_items-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationItemsList",
            "parentTable"=>"quotations",
            "childTable"=>"quotation_items",
            "fileTitle"=>"Quotation Items",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotationitems/logicControl"
        ],

        "list : View Invoices"=>[
            "module_name"=>"Invoices",
            "fe"=>"viewInvoices({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})",
            "alias"=>"invoices",
            "file"=>"invoices-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"quotations",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoices",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

    ],

    "quotation_items"=>[

        "list : View Quotation Details"=>[
            "module_name"=>"Quotations",
            "fe"=>"viewQuotations({childCol:`recordId`,parentColVal:quotation_itemsNode.quotation_id,parentName:quotation_itemsNode.item_name})",
            "alias"=>"quotations",
            "file"=>"quotations-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationsList",
            "parentTable"=>"quotation_items",
            "childTable"=>"quotations",
            "fileTitle"=>"Quotation Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotations/logicControl"
        ],

    ],

    "invoices"=>[

        "list : View Client Details"=>[
            "module_name"=>"Clients",
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:invoicesNode.client_id,parentName:invoicesNode.invoice_title})",
            "alias"=>"clients",
            "file"=>"clients-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"invoices",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : View Deal Details"=>[
            "module_name"=>"Deals",
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:invoicesNode.deal_id,parentName:invoicesNode.invoice_title})",
            "alias"=>"deals",
            "file"=>"deals-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"invoices",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : View Quotation Details"=>[
            "module_name"=>"Quotations",
            "fe"=>"viewQuotations({childCol:`recordId`,parentColVal:invoicesNode.quotation_id,parentName:invoicesNode.invoice_title})",
            "alias"=>"quotations",
            "file"=>"quotations-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"QuotationsList",
            "parentTable"=>"invoices",
            "childTable"=>"quotations",
            "fileTitle"=>"Quotation Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../quotations/logicControl"
        ],

        "list : View Invoice Items"=>[
            "module_name"=>"InvoiceItems",
            "fe"=>"viewInvoiceItems({childCol:`invoiceId`,parentColVal:invoicesNode.record_id,parentName:invoicesNode.invoice_title})",
            "alias"=>"invoiceitems",
            "file"=>"invoice_items-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoiceItemsList",
            "parentTable"=>"invoices",
            "childTable"=>"invoice_items",
            "fileTitle"=>"Invoice Items",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoiceitems/logicControl"
        ],

        "list : View Payments"=>[
            "module_name"=>"Payments",
            "fe"=>"viewPayments({childCol:`invoiceId`,parentColVal:invoicesNode.record_id,parentName:invoicesNode.invoice_title})",
            "alias"=>"payments",
            "file"=>"payments-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"PaymentsList",
            "parentTable"=>"invoices",
            "childTable"=>"payments",
            "fileTitle"=>"Payments",
            "functionType"=>"autoMapper",
            "basepath"=>"../../payments/logicControl"
        ],

    ],

    "invoice_items"=>[

        "list : View Invoice Details"=>[
            "module_name"=>"Invoices",
            "fe"=>"viewInvoices({childCol:`recordId`,parentColVal:invoice_itemsNode.invoice_id,parentName:invoice_itemsNode.invoice_item_name})",
            "alias"=>"invoices",
            "file"=>"invoices-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"invoice_items",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoice Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : View Service detail"=>[
            "module_name"=>"Services",
            "fe"=>"viewServices({childCol:`recordId`,parentColVal:invoice_itemsNode.item_id,parentName:invoice_itemsNode.invoice_item_name})",
            "alias"=>"services",
            "file"=>"services-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ServicesList",
            "parentTable"=>"invoice_items",
            "childTable"=>"services",
            "fileTitle"=>"Service detail",
            "functionType"=>"autoMapper",
            "basepath"=>"../../services/logicControl"
        ],

    ],

    "services"=>[

        "list : View Invoice Items"=>[
            "module_name"=>"InvoiceItems",
            "fe"=>"viewInvoiceItems({childCol:`itemId`,parentColVal:servicesNode.record_id,parentName:servicesNode.service_name})",
            "alias"=>"invoiceitems",
            "file"=>"invoice_items-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoiceItemsList",
            "parentTable"=>"services",
            "childTable"=>"invoice_items",
            "fileTitle"=>"Invoice Items",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoiceitems/logicControl"
        ],

    ],

    "payments"=>[

        "list : View Invoice Details"=>[
            "module_name"=>"Invoices",
            "fe"=>"viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})",
            "alias"=>"invoices",
            "file"=>"invoices-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"InvoicesList",
            "parentTable"=>"payments",
            "childTable"=>"invoices",
            "fileTitle"=>"Invoice Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../invoices/logicControl"
        ],

        "list : View Deal Details"=>[
            "module_name"=>"Deals",
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})",
            "alias"=>"deals",
            "file"=>"deals-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"payments",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : View Client Details"=>[
            "module_name"=>"Clients",
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})",
            "alias"=>"clients",
            "file"=>"clients-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"payments",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

    ],

    "tasks"=>[

        "list : View Client Details"=>[
            "module_name"=>"Clients",
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:tasksNode.client_id,parentName:tasksNode.task_title})",
            "alias"=>"clients",
            "file"=>"clients-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"tasks",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : View Deal Details"=>[
            "module_name"=>"Deals",
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:tasksNode.deal_id,parentName:tasksNode.task_title})",
            "alias"=>"deals",
            "file"=>"deals-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"tasks",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : View Assigned User"=>[
            "module_name"=>"Users",
            "fe"=>"viewUsers({childCol:`recordId`,parentColVal:tasksNode.assigned_sales_rep,parentName:tasksNode.task_title})",
            "alias"=>"users",
            "file"=>"users-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"UsersList",
            "parentTable"=>"tasks",
            "childTable"=>"users",
            "fileTitle"=>"Assigned User",
            "functionType"=>"autoMapper",
            "basepath"=>"../../users/logicControl"
        ],

    ],

    "activities"=>[

        "list : View Client Details"=>[
            "module_name"=>"Clients",
            "fe"=>"viewClients({childCol:`recordId`,parentColVal:activitiesNode.client_id,parentName:activitiesNode.activity_title})",
            "alias"=>"clients",
            "file"=>"clients-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"activities",
            "childTable"=>"clients",
            "fileTitle"=>"Client Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : View Deal Details"=>[
            "module_name"=>"Deals",
            "fe"=>"viewDeals({childCol:`recordId`,parentColVal:activitiesNode.deal_id,parentName:activitiesNode.activity_title})",
            "alias"=>"deals",
            "file"=>"deals-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"activities",
            "childTable"=>"deals",
            "fileTitle"=>"Deal Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : View Performed By"=>[
            "module_name"=>"Users",
            "fe"=>"viewUsers({childCol:`recordId`,parentColVal:activitiesNode.performed_by,parentName:activitiesNode.activity_title})",
            "alias"=>"users",
            "file"=>"users-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"UsersList",
            "parentTable"=>"activities",
            "childTable"=>"users",
            "fileTitle"=>"Performed By",
            "functionType"=>"autoMapper",
            "basepath"=>"../../users/logicControl"
        ],

    ],

    "users"=>[

        "list : View Assigned Leads"=>[
            "module_name"=>"Leads",
            "fe"=>"viewLeads({childCol:`assignedSalesRep`,parentColVal:usersNode.record_id,parentName:usersNode.full_name})",
            "alias"=>"leads",
            "file"=>"leads-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"LeadsList",
            "parentTable"=>"users",
            "childTable"=>"leads",
            "fileTitle"=>"Assigned Leads",
            "functionType"=>"autoMapper",
            "basepath"=>"../../leads/logicControl"
        ],

        "list : View Assigned Clients"=>[
            "module_name"=>"Clients",
            "fe"=>"viewClients({childCol:`assignedSalesRep`,parentColVal:usersNode.record_id,parentName:usersNode.full_name})",
            "alias"=>"clients",
            "file"=>"clients-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"ClientsList",
            "parentTable"=>"users",
            "childTable"=>"clients",
            "fileTitle"=>"Assigned Clients",
            "functionType"=>"autoMapper",
            "basepath"=>"../../clients/logicControl"
        ],

        "list : View Assigned Deals"=>[
            "module_name"=>"Deals",
            "fe"=>"viewDeals({childCol:`assignedSalesRep`,parentColVal:usersNode.record_id,parentName:usersNode.full_name})",
            "alias"=>"deals",
            "file"=>"deals-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"DealsList",
            "parentTable"=>"users",
            "childTable"=>"deals",
            "fileTitle"=>"Assigned Deals",
            "functionType"=>"autoMapper",
            "basepath"=>"../../deals/logicControl"
        ],

        "list : View Assigned Tasks"=>[
            "module_name"=>"Tasks",
            "fe"=>"viewTasks({childCol:`assignedSalesRep`,parentColVal:usersNode.record_id,parentName:usersNode.full_name})",
            "alias"=>"tasks",
            "file"=>"tasks-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"TasksList",
            "parentTable"=>"users",
            "childTable"=>"tasks",
            "fileTitle"=>"Assigned Tasks",
            "functionType"=>"autoMapper",
            "basepath"=>"../../tasks/logicControl"
        ],

    ],

    "system_users"=>[

        "list : View Project Pages"=>[
            "module_name"=>"PageManifest",
            "fe"=>"viewPageManifest({childCol:`projectId`,parentColVal:system_usersNode.project_id,parentName:system_usersNode.name})",
            "alias"=>"pagemanifest",
            "file"=>"page_manifest_-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"PageManifestList",
            "parentTable"=>"system_users",
            "childTable"=>"page_manifest_",
            "fileTitle"=>"Project Pages",
            "functionType"=>"autoMapper",
            "basepath"=>"../../pagemanifest/logicControl"
        ],

        "list : View User Access"=>[
            "module_name"=>"UserManifest",
            "fe"=>"viewUserManifest({childCol:`userId`,parentColVal:system_usersNode.record_id,parentName:system_usersNode.name})",
            "alias"=>"usermanifest",
            "file"=>"user_manifest_-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"UserManifestList",
            "parentTable"=>"system_users",
            "childTable"=>"user_manifest_",
            "fileTitle"=>"User Access",
            "functionType"=>"autoMapper",
            "basepath"=>"../../usermanifest/logicControl"
        ],

    ],

    "system_role_bundles"=>[

        "list : View Role Functions"=>[
            "module_name"=>"UserBundleRoleFunctions",
            "fe"=>"viewUserBundleRoleFunctions({childCol:`bundleId`,parentColVal:system_role_bundlesNode.bundle_id,parentName:system_role_bundlesNode.bundle_name})",
            "alias"=>"userbundlerolefunctions",
            "file"=>"user_bundle_role_functions-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"UserBundleRoleFunctionsList",
            "parentTable"=>"system_role_bundles",
            "childTable"=>"user_bundle_role_functions",
            "fileTitle"=>"Role Functions",
            "functionType"=>"autoMapper",
            "basepath"=>"../../userbundlerolefunctions/logicControl"
        ],

    ],

    "user_bundle_role_functions"=>[

        "list : View Bundle Details"=>[
            "module_name"=>"SystemRoleBundles",
            "fe"=>"viewSystemRoleBundles({childCol:`bundleId`,parentColVal:user_bundle_role_functionsNode.bundle_id,parentName:user_bundle_role_functionsNode.role_name})",
            "alias"=>"systemrolebundles",
            "file"=>"system_role_bundles-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"SystemRoleBundlesList",
            "parentTable"=>"user_bundle_role_functions",
            "childTable"=>"system_role_bundles",
            "fileTitle"=>"Bundle Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../systemrolebundles/logicControl"
        ],

    ],

    "user_manifest_"=>[

        "list : View User Details"=>[
            "module_name"=>"SystemUsers",
            "fe"=>"viewSystemUsers({childCol:`recordId`,parentColVal:user_manifest_Node.user_id,parentName:user_manifest_Node.user_name})",
            "alias"=>"systemusers",
            "file"=>"system_users-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"SystemUsersList",
            "parentTable"=>"user_manifest_",
            "childTable"=>"system_users",
            "fileTitle"=>"User Details",
            "functionType"=>"autoMapper",
            "basepath"=>"../../systemusers/logicControl"
        ],

    ],

    "page_manifest_"=>[

        "list : View Project Users"=>[
            "module_name"=>"SystemUsers",
            "fe"=>"viewSystemUsers({childCol:`projectId`,parentColVal:page_manifest_Node.project_id,parentName:page_manifest_Node.page_url})",
            "alias"=>"systemusers",
            "file"=>"system_users-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"SystemUsersList",
            "parentTable"=>"page_manifest_",
            "childTable"=>"system_users",
            "fileTitle"=>"Project Users",
            "functionType"=>"autoMapper",
            "basepath"=>"../../systemusers/logicControl"
        ],

    ],

    "system_module_manifest_"=>[

        "list : View Related Pages"=>[
            "module_name"=>"PageManifest",
            "fe"=>"viewPageManifest({childCol:`moduleKey`,parentColVal:system_module_manifest_Node.module_key,parentName:system_module_manifest_Node.module_name})",
            "alias"=>"pagemanifest",
            "file"=>"page_manifest_-automapper",
            "functionType"=>"autoMapper",
            "parentName"=>"PageManifestList",
            "parentTable"=>"system_module_manifest_",
            "childTable"=>"page_manifest_",
            "fileTitle"=>"Related Pages",
            "functionType"=>"autoMapper",
            "basepath"=>"../../pagemanifest/logicControl"
        ],

    ],

];



    ///Auto generated profile data map
    $customProfileDataMap=[

        "clients"=>[

        "deals"=>[
            "_clients_full_name_client_id"=>"clientsNode?.full_name",
            "client_id"=>"clientsNode?.record_id",
        ],

        "quotations"=>[
            "_clients_full_name_client_id"=>"clientsNode?.full_name",
            "client_id"=>"clientsNode?.record_id",
        ],

        "invoices"=>[
            "_clients_full_name_client_id"=>"clientsNode?.full_name",
            "client_id"=>"clientsNode?.record_id",
        ],

        "payments"=>[
            "_clients_full_name_client_id"=>"clientsNode?.full_name",
            "client_id"=>"clientsNode?.record_id",
        ],

        "tasks"=>[
            "_clients_full_name_client_id"=>"clientsNode?.full_name",
            "client_id"=>"clientsNode?.record_id",
        ],

        "activities"=>[
            "_clients_full_name_client_id"=>"clientsNode?.full_name",
            "client_id"=>"clientsNode?.record_id",
        ],

        "expected_revenue"=>[
            "_clients_full_name_client_id"=>"clientsNode?.full_name",
            "client_id"=>"clientsNode?.record_id",
        ],

    ],

    "leads"=>[

        "users"=>[
            "_leads_full_name_record_id"=>"leadsNode?.full_name",
            "record_id"=>"leadsNode?.assigned_sales_rep",
        ],

    ],

    "deals"=>[

        "clients"=>[
            "_deals_deal_title_record_id"=>"dealsNode?.deal_title",
            "record_id"=>"dealsNode?.client_id",
        ],

        "quotations"=>[
            "_deals_deal_title_deal_id"=>"dealsNode?.deal_title",
            "deal_id"=>"dealsNode?.record_id",
        ],

        "invoices"=>[
            "_deals_deal_title_deal_id"=>"dealsNode?.deal_title",
            "deal_id"=>"dealsNode?.record_id",
        ],

        "payments"=>[
            "_deals_deal_title_deal_id"=>"dealsNode?.deal_title",
            "deal_id"=>"dealsNode?.record_id",
        ],

        "tasks"=>[
            "_deals_deal_title_deal_id"=>"dealsNode?.deal_title",
            "deal_id"=>"dealsNode?.record_id",
        ],

        "activities"=>[
            "_deals_deal_title_deal_id"=>"dealsNode?.deal_title",
            "deal_id"=>"dealsNode?.record_id",
        ],

        "expected_revenue"=>[
            "_deals_deal_title_deal_id"=>"dealsNode?.deal_title",
            "deal_id"=>"dealsNode?.record_id",
        ],

    ],

    "expected_revenue"=>[

        "clients"=>[
            "_expected_revenue_revenue_title_record_id"=>"expected_revenueNode?.revenue_title",
            "record_id"=>"expected_revenueNode?.client_id",
        ],

        "deals"=>[
            "_expected_revenue_revenue_title_record_id"=>"expected_revenueNode?.revenue_title",
            "record_id"=>"expected_revenueNode?.deal_id",
        ],

        "invoices"=>[
            "_expected_revenue_revenue_title_record_id"=>"expected_revenueNode?.revenue_title",
            "record_id"=>"expected_revenueNode?.invoice_id",
        ],

        "payments"=>[
            "_expected_revenue_revenue_title_transaction_ref"=>"expected_revenueNode?.revenue_title",
            "transaction_ref"=>"expected_revenueNode?.payment_ref_no",
        ],

        "activities"=>[
            "_expected_revenue_revenue_title_deal_id"=>"expected_revenueNode?.revenue_title",
            "deal_id"=>"expected_revenueNode?.record_id",
        ],

    ],

    "quotations"=>[

        "clients"=>[
            "_quotations_quotation_title_record_id"=>"quotationsNode?.quotation_title",
            "record_id"=>"quotationsNode?.client_id",
        ],

        "deals"=>[
            "_quotations_quotation_title_record_id"=>"quotationsNode?.quotation_title",
            "record_id"=>"quotationsNode?.deal_id",
        ],

        "quotation_items"=>[
            "_quotations_quotation_title_quotation_id"=>"quotationsNode?.quotation_title",
            "quotation_id"=>"quotationsNode?.record_id",
        ],

        "invoices"=>[
            "_quotations_quotation_title_quotation_id"=>"quotationsNode?.quotation_title",
            "quotation_id"=>"quotationsNode?.record_id",
        ],

    ],

    "quotation_items"=>[

        "quotations"=>[
            "_quotation_items_item_name_record_id"=>"quotation_itemsNode?.item_name",
            "record_id"=>"quotation_itemsNode?.quotation_id",
        ],

    ],

    "invoices"=>[

        "clients"=>[
            "_invoices_invoice_title_record_id"=>"invoicesNode?.invoice_title",
            "record_id"=>"invoicesNode?.client_id",
        ],

        "deals"=>[
            "_invoices_invoice_title_record_id"=>"invoicesNode?.invoice_title",
            "record_id"=>"invoicesNode?.deal_id",
        ],

        "quotations"=>[
            "_invoices_invoice_title_record_id"=>"invoicesNode?.invoice_title",
            "record_id"=>"invoicesNode?.quotation_id",
        ],

        "invoice_items"=>[
            "_invoices_invoice_title_invoice_id"=>"invoicesNode?.invoice_title",
            "invoice_id"=>"invoicesNode?.record_id",
        ],

        "payments"=>[
            "_invoices_invoice_title_invoice_id"=>"invoicesNode?.invoice_title",
            "invoice_id"=>"invoicesNode?.record_id",
        ],

    ],

    "invoice_items"=>[

        "invoices"=>[
            "_invoice_items_invoice_item_name_record_id"=>"invoice_itemsNode?.invoice_item_name",
            "record_id"=>"invoice_itemsNode?.invoice_id",
        ],

        "services"=>[
            "_invoice_items_invoice_item_name_record_id"=>"invoice_itemsNode?.invoice_item_name",
            "record_id"=>"invoice_itemsNode?.item_id",
        ],

    ],

    "services"=>[

        "invoice_items"=>[
            "_services_service_name_item_id"=>"servicesNode?.service_name",
            "item_id"=>"servicesNode?.record_id",
        ],

    ],

    "payments"=>[

        "invoices"=>[
            "_payments_transaction_ref_record_id"=>"paymentsNode?.transaction_ref",
            "record_id"=>"paymentsNode?.invoice_id",
        ],

        "deals"=>[
            "_payments_transaction_ref_record_id"=>"paymentsNode?.transaction_ref",
            "record_id"=>"paymentsNode?.deal_id",
        ],

        "clients"=>[
            "_payments_transaction_ref_record_id"=>"paymentsNode?.transaction_ref",
            "record_id"=>"paymentsNode?.client_id",
        ],

    ],

    "tasks"=>[

        "clients"=>[
            "_tasks_task_title_record_id"=>"tasksNode?.task_title",
            "record_id"=>"tasksNode?.client_id",
        ],

        "deals"=>[
            "_tasks_task_title_record_id"=>"tasksNode?.task_title",
            "record_id"=>"tasksNode?.deal_id",
        ],

        "users"=>[
            "_tasks_task_title_record_id"=>"tasksNode?.task_title",
            "record_id"=>"tasksNode?.assigned_sales_rep",
        ],

    ],

    "activities"=>[

        "clients"=>[
            "_activities_activity_title_record_id"=>"activitiesNode?.activity_title",
            "record_id"=>"activitiesNode?.client_id",
        ],

        "deals"=>[
            "_activities_activity_title_record_id"=>"activitiesNode?.activity_title",
            "record_id"=>"activitiesNode?.deal_id",
        ],

        "users"=>[
            "_activities_activity_title_record_id"=>"activitiesNode?.activity_title",
            "record_id"=>"activitiesNode?.performed_by",
        ],

    ],

    "users"=>[

        "leads"=>[
            "_users_full_name_assigned_sales_rep"=>"usersNode?.full_name",
            "assigned_sales_rep"=>"usersNode?.record_id",
        ],

        "clients"=>[
            "_users_full_name_assigned_sales_rep"=>"usersNode?.full_name",
            "assigned_sales_rep"=>"usersNode?.record_id",
        ],

        "deals"=>[
            "_users_full_name_assigned_sales_rep"=>"usersNode?.full_name",
            "assigned_sales_rep"=>"usersNode?.record_id",
        ],

        "tasks"=>[
            "_users_full_name_assigned_sales_rep"=>"usersNode?.full_name",
            "assigned_sales_rep"=>"usersNode?.record_id",
        ],

    ],

    "system_users"=>[

        "page_manifest_"=>[
            "_system_users_name_project_id"=>"system_usersNode?.name",
            "project_id"=>"system_usersNode?.project_id",
        ],

        "user_manifest_"=>[
            "_system_users_name_user_id"=>"system_usersNode?.name",
            "user_id"=>"system_usersNode?.record_id",
        ],

    ],

    "system_role_bundles"=>[

        "user_bundle_role_functions"=>[
            "_system_role_bundles_bundle_name_bundle_id"=>"system_role_bundlesNode?.bundle_name",
            "bundle_id"=>"system_role_bundlesNode?.bundle_id",
        ],

    ],

    "user_bundle_role_functions"=>[

        "system_role_bundles"=>[
            "_user_bundle_role_functions_role_name_bundle_id"=>"user_bundle_role_functionsNode?.role_name",
            "bundle_id"=>"user_bundle_role_functionsNode?.bundle_id",
        ],

    ],

    "user_manifest_"=>[

        "system_users"=>[
            "_user_manifest__user_name_record_id"=>"user_manifest_Node?.user_name",
            "record_id"=>"user_manifest_Node?.user_id",
        ],

    ],

    "page_manifest_"=>[

        "system_users"=>[
            "_page_manifest__page_url_project_id"=>"page_manifest_Node?.page_url",
            "project_id"=>"page_manifest_Node?.project_id",
        ],

    ],

    "system_module_manifest_"=>[

        "page_manifest_"=>[
            "_system_module_manifest__module_name_module_key"=>"system_module_manifest_Node?.module_name",
            "module_key"=>"system_module_manifest_Node?.module_key",
        ],

    ],

];




?>
