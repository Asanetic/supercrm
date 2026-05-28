<?php

/*
|--------------------------------------------------------------------------
| Generated Event Mapping String
|--------------------------------------------------------------------------
*/

/*

// LEADS

leads:convert-lead:profile|'record_id'|user-check,Convert Lead,convertLead,../logicControl
@convertLead:DataMapAdd:clients=Convert {{full_name}} to client,leads:full_name|record_id:lead_id

leads:mark-qualified:profile|'record_id'|check-circle,Mark Qualified,markQualifiedLead,../logicControl
@markQualifiedLead:DataMapUpdate:leads=Mark {{full_name}} qualified,lead_status|Qualified

leads:mark-lost:profile|'record_id'|x-circle,Mark Lost,markLostLead,../logicControl
@markLostLead:DataMapUpdate:leads=Mark {{full_name}} lost,lead_status|Lost

leads:add-task:profile|'record_id'|check-square,Add Task,addLeadTask,../logicControl
@addLeadTask:DataMapAdd:tasks=Add task for {{full_name}},leads:full_name|record_id:lead_id

leads:hot-leads:list|'Hot'|flame,Hot Leads,filterHotLeads,../logicControl
@filterHotLeads:DataQueryCol:leads=leadTemperature,Hot

leads:qualified-leads:list|'Qualified'|badge-check,Qualified Leads,filterQualifiedLeads,../logicControl
@filterQualifiedLeads:DataQueryCol:leads=leadStatus,Qualified


// CLIENTS

clients:activate-client:profile|'record_id'|check-circle,Activate Client,activateClient,../logicControl
@activateClient:DataMapUpdate:clients=Activate {{full_name}} client,client_status|Active

clients:suspend-client:profile|'record_id'|pause-circle,Suspend Client,suspendClient,../logicControl
@suspendClient:DataMapUpdate:clients=Suspend {{full_name}} client,client_status|Suspended

clients:create-deal:profile|'record_id'|briefcase,Create Deal,createClientDeal,../logicControl
@createClientDeal:DataMapAdd:deals=Create deal for {{full_name}},clients:full_name|record_id:client_id

clients:create-invoice:profile|'record_id'|file-text,Create Invoice,createClientInvoice,../logicControl
@createClientInvoice:DataMapAdd:invoices=Create invoice for {{full_name}},clients:full_name|record_id:client_id

clients:active-clients:list|'Active'|user-check,Active Clients,filterActiveClients,../logicControl
@filterActiveClients:DataQueryCol:clients=clientStatus,Active

clients:inactive-clients:list|'Inactive'|user-x,Inactive Clients,filterInactiveClients,../logicControl
@filterInactiveClients:DataQueryCol:clients=clientStatus,Inactive


// DEALS

deals:mark-won:profile|'record_id'|trophy,Mark Won,markDealWon,../logicControl
@markDealWon:DataMapUpdate:deals=Mark {{deal_title}} won,deal_status|Won

deals:mark-lost:profile|'record_id'|x-circle,Mark Lost,markDealLost,../logicControl
@markDealLost:DataMapUpdate:deals=Mark {{deal_title}} lost,deal_status|Lost

deals:create-quotation:profile|'record_id'|file-plus,Create Quotation,createDealQuotation,../logicControl
@createDealQuotation:DataMapAdd:quotations=Create quotation for {{deal_title}},deals:deal_title|record_id:deal_id

deals:add-followup-task:profile|'record_id'|calendar,Add Follow Up,addDealFollowupTask,../logicControl
@addDealFollowupTask:DataMapAdd:tasks=Add follow up task for {{deal_title}},deals:deal_title|record_id:deal_id

deals:won-deals:list|'Won'|trophy,Won Deals,filterWonDeals,../logicControl
@filterWonDeals:DataQueryCol:deals=dealStatus,Won

deals:lost-deals:list|'Lost'|x-circle,Lost Deals,filterLostDeals,../logicControl
@filterLostDeals:DataQueryCol:deals=dealStatus,Lost


// PRODUCTS

products:activate-product:profile|'record_id'|check-circle,Activate Product,activateProduct,../logicControl
@activateProduct:DataMapUpdate:products=Activate {{product_name}} product,product_status|Active

products:disable-product:profile|'record_id'|pause-circle,Disable Product,disableProduct,../logicControl
@disableProduct:DataMapUpdate:products=Disable {{product_name}} product,product_status|Inactive

products:out-of-stock-products:list|'Out Of Stock'|alert-triangle,Out Of Stock Products,filterOutOfStockProducts,../logicControl
@filterOutOfStockProducts:DataQueryCol:products=productStatus,Out Of Stock

products:active-products:list|'Active'|check-circle,Active Products,filterActiveProducts,../logicControl
@filterActiveProducts:DataQueryCol:products=productStatus,Active


// SERVICES

services:activate-service:profile|'record_id'|check-circle,Activate Service,activateService,../logicControl
@activateService:DataMapUpdate:services=Activate {{service_name}} service,service_status|Active

services:disable-service:profile|'record_id'|pause-circle,Disable Service,disableService,../logicControl
@disableService:DataMapUpdate:services=Disable {{service_name}} service,service_status|Inactive

services:recurring-services:list|'Recurring'|refresh-cw,Recurring Services,filterRecurringServices,../logicControl
@filterRecurringServices:DataQueryCol:services=billingType,Recurring

services:one-time-services:list|'One Time'|credit-card,One Time Services,filterOneTimeServices,../logicControl
@filterOneTimeServices:DataQueryCol:services=billingType,One Time


// QUOTATIONS

quotations:approve-quotation:profile|'record_id'|check-circle,Approve Quotation,approveQuotation,../logicControl
@approveQuotation:DataMapUpdate:quotations=Approve {{quotation_title}} quotation,quotation_status|Approved

quotations:reject-quotation:profile|'record_id'|x-circle,Reject Quotation,rejectQuotation,../logicControl
@rejectQuotation:DataMapUpdate:quotations=Reject {{quotation_title}} quotation,quotation_status|Rejected

quotations:convert-to-invoice:profile|'record_id'|file-text,Convert To Invoice,convertQuotationToInvoice,../logicControl
@convertQuotationToInvoice:DataMapAdd:invoices=Convert {{quotation_title}} to invoice,quotations:quotation_title|record_id:quotation_id

quotations:expired-quotations:list|'Expired'|clock,Expired Quotations,filterExpiredQuotations,../logicControl
@filterExpiredQuotations:DataQueryCol:quotations=quotationStatus,Expired


// INVOICES

invoices:mark-paid:profile|'record_id'|check-circle,Mark Paid,markInvoicePaid,../logicControl
@markInvoicePaid:DataMapUpdate:invoices=Mark {{invoice_title}} paid,invoice_status|Paid

invoices:mark-overdue:profile|'record_id'|alert-circle,Mark Overdue,markInvoiceOverdue,../logicControl
@markInvoiceOverdue:DataMapUpdate:invoices=Mark {{invoice_title}} overdue,invoice_status|Overdue

invoices:add-payment:profile|'record_id'|credit-card,Add Payment,addInvoicePayment,../logicControl
@addInvoicePayment:DataMapAdd:payments=Add payment for {{invoice_title}},invoices:invoice_title|record_id:invoice_id

invoices:add-invoice-item:profile|'record_id'|plus-circle,Add Invoice Item,addInvoiceItem,../logicControl
@addInvoiceItem:DataMapAdd:invoice_items=Add item to {{invoice_title}} invoice,invoices:invoice_title|record_id:invoice_id

invoices:pending-invoices:list|'Pending'|clock,Pending Invoices,filterPendingInvoices,../logicControl
@filterPendingInvoices:DataQueryCol:invoices=invoiceStatus,Pending


// PAYMENTS

payments:confirm-payment:profile|'record_id'|check-circle,Confirm Payment,confirmPayment,../logicControl
@confirmPayment:DataMapUpdate:payments=Confirm payment transaction,payment_status|Paid

payments:refund-payment:profile|'record_id'|rotate-ccw,Refund Payment,refundPayment,../logicControl
@refundPayment:DataMapUpdate:payments=Refund payment transaction,payment_status|Refunded

payments:failed-payments:list|'Failed'|x-circle,Failed Payments,filterFailedPayments,../logicControl
@filterFailedPayments:DataQueryCol:payments=paymentStatus,Failed

payments:successful-payments:list|'Paid'|badge-check,Successful Payments,filterSuccessfulPayments,../logicControl
@filterSuccessfulPayments:DataQueryCol:payments=paymentStatus,Paid


// TASKS

tasks:mark-completed:profile|'record_id'|check-circle,Mark Completed,markTaskCompleted,../logicControl
@markTaskCompleted:DataMapUpdate:tasks=Mark {{task_title}} completed,task_status|Completed

tasks:mark-overdue:profile|'record_id'|alert-circle,Mark Overdue,markTaskOverdue,../logicControl
@markTaskOverdue:DataMapUpdate:tasks=Mark {{task_title}} overdue,task_status|Overdue

tasks:pending-tasks:list|'Pending'|clock,Pending Tasks,filterPendingTasks,../logicControl
@filterPendingTasks:DataQueryCol:tasks=taskStatus,Pending

tasks:completed-tasks:list|'Completed'|check-circle,Completed Tasks,filterCompletedTasks,../logicControl
@filterCompletedTasks:DataQueryCol:tasks=taskStatus,Completed


// ACTIVITIES

activities:mark-completed:profile|'record_id'|check-circle,Mark Completed,markActivityCompleted,../logicControl
@markActivityCompleted:DataMapUpdate:activities=Mark {{activity_title}} completed,activity_status|Completed

activities:pending-activities:list|'Pending'|clock,Pending Activities,filterPendingActivities,../logicControl
@filterPendingActivities:DataQueryCol:activities=activityStatus,Pending

activities:completed-activities:list|'Completed'|check-circle,Completed Activities,filterCompletedActivities,../logicControl
@filterCompletedActivities:DataQueryCol:activities=activityStatus,Completed


// USERS

users:activate-user:profile|'record_id'|user-check,Activate User,activateUser,../logicControl
@activateUser:DataMapUpdate:users=Activate {{full_name}} user,account_status|Active

users:suspend-user:profile|'record_id'|pause-circle,Suspend User,suspendUser,../logicControl
@suspendUser:DataMapUpdate:users=Suspend {{full_name}} user,account_status|Suspended

users:active-users:list|'Active'|user-check,Active Users,filterActiveUsers,../logicControl
@filterActiveUsers:DataQueryCol:users=accountStatus,Active

users:suspended-users:list|'Suspended'|pause-circle,Suspended Users,filterSuspendedUsers,../logicControl
@filterSuspendedUsers:DataQueryCol:users=accountStatus,Suspended


// EXPECTED REVENUE

expected_revenue:mark-complete:profile|'record_id'|check-circle,Mark Complete,markRevenueComplete,../logicControl
@markRevenueComplete:DataMapUpdate:expected_revenue=Mark {{revenue_title}} complete,revenue_status|Completed

expected_revenue:mark-pending:profile|'record_id'|clock,Mark Pending,markRevenuePending,../logicControl
@markRevenuePending:DataMapUpdate:expected_revenue=Mark {{revenue_title}} pending,revenue_status|Pending

expected_revenue:mark-postponed:profile|'record_id'|pause-circle,Mark Postponed,markRevenuePostponed,../logicControl
@markRevenuePostponed:DataMapUpdate:expected_revenue=Mark {{revenue_title}} postponed,revenue_status|Postponed

expected_revenue:mark-cancelled:profile|'record_id'|x-circle,Mark Cancelled,markRevenueCancelled,../logicControl
@markRevenueCancelled:DataMapUpdate:expected_revenue=Mark {{revenue_title}} cancelled,revenue_status|Cancelled

expected_revenue:mark-paid:profile|'record_id'|badge-check,Mark Paid,markRevenuePaid,../logicControl
@markRevenuePaid:DataMapUpdate:expected_revenue=Mark {{revenue_title}} paid,payment_status|Paid

expected_revenue:mark-unpaid:profile|'record_id'|alert-circle,Mark Unpaid,markRevenueUnpaid,../logicControl
@markRevenueUnpaid:DataMapUpdate:expected_revenue=Mark {{revenue_title}} unpaid,payment_status|Unpaid

expected_revenue:create-invoice:profile|'record_id'|file-text,Create Invoice,createRevenueInvoice,../logicControl
@createRevenueInvoice:DataMapAdd:invoices=Create invoice for {{revenue_title}},expected_revenue:revenue_title|record_id:expected_revenue_id

expected_revenue:add-activity:profile|'record_id'|calendar,Add Activity,addRevenueActivity,../logicControl
@addRevenueActivity:DataMapAdd:activities=Add activity for {{revenue_title}},expected_revenue:revenue_title|record_id:revenue_id

expected_revenue:client-revenue:list|'client_id'|building,Filter By Client,filterRevenueByClient,../logicControl
@filterRevenueByClient:DataQueryMap:expected_revenue=Filter by client , clients:full_name|record_id:client_id

expected_revenue:deal-revenue:list|'deal_id'|briefcase,Filter By Deal,filterRevenueByDeal,../logicControl
@filterRevenueByDeal:DataQueryMap:expected_revenue=Filter by deal, deals:deal_title|record_id:deal_id

expected_revenue:status-revenue:list|'revenue_status'|layers,Filter By Status,filterRevenueByStatus,../logicControl
@filterRevenueByStatus:DataQueryGroupCol:expected_revenue=Filter by status , payment_status

expected_revenue:filter-by-month:list|'revenue_status'|layers,Filter By Month , filterRevenueByMonth,../logicControl
@filterRevenueByMonth:DataQueryGroupCol:expected_revenue=Filter by Month, revenue_month




*/

/*
|--------------------------------------------------------------------------
| Generated Event Mapper Array
|--------------------------------------------------------------------------
*/

$eventMappingArray=[

    "leads"=>[

        "profile"=>[

            "user-check: Convert Lead" => [
                "fe" => "convertLead('record_id')",
                "be" => "convertLead()",
                "file" => "convert-lead",
                "funName" => "convertLead",
                "destTable" => "clients",
                "logicFlow" => "Convert {{full_name}} to client,leads:full_name|record_id:lead_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

            "check-circle: Mark Qualified" => [
                "fe" => "markQualifiedLead('record_id')",
                "be" => "markQualifiedLead()",
                "file" => "mark-qualified",
                "funName" => "markQualifiedLead",
                "destTable" => "leads",
                "logicFlow" => "Mark {{full_name}} qualified,lead_status|Qualified",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "x-circle: Mark Lost" => [
                "fe" => "markLostLead('record_id')",
                "be" => "markLostLead()",
                "file" => "mark-lost",
                "funName" => "markLostLead",
                "destTable" => "leads",
                "logicFlow" => "Mark {{full_name}} lost,lead_status|Lost",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "check-square: Add Task" => [
                "fe" => "addLeadTask('record_id')",
                "be" => "addLeadTask()",
                "file" => "add-task",
                "funName" => "addLeadTask",
                "destTable" => "tasks",
                "logicFlow" => "Add task for {{full_name}},leads:full_name|record_id:lead_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "flame: Hot Leads" => [
                "fe" => "filterHotLeads('Hot')",
                "be" => "filterHotLeads()",
                "file" => "hot-leads",
                "funName" => "filterHotLeads",
                "destTable" => "leads",
                "logicFlow" => "leadTemperature,Hot",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

            "badge-check: Qualified Leads" => [
                "fe" => "filterQualifiedLeads('Qualified')",
                "be" => "filterQualifiedLeads()",
                "file" => "qualified-leads",
                "funName" => "filterQualifiedLeads",
                "destTable" => "leads",
                "logicFlow" => "leadStatus,Qualified",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "clients"=>[

        "profile"=>[

            "check-circle: Activate Client" => [
                "fe" => "activateClient('record_id')",
                "be" => "activateClient()",
                "file" => "activate-client",
                "funName" => "activateClient",
                "destTable" => "clients",
                "logicFlow" => "Activate {{full_name}} client,client_status|Active",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "pause-circle: Suspend Client" => [
                "fe" => "suspendClient('record_id')",
                "be" => "suspendClient()",
                "file" => "suspend-client",
                "funName" => "suspendClient",
                "destTable" => "clients",
                "logicFlow" => "Suspend {{full_name}} client,client_status|Suspended",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "briefcase: Create Deal" => [
                "fe" => "createClientDeal('record_id')",
                "be" => "createClientDeal()",
                "file" => "create-deal",
                "funName" => "createClientDeal",
                "destTable" => "deals",
                "logicFlow" => "Create deal for {{full_name}},clients:full_name|record_id:client_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

            "file-text: Create Invoice" => [
                "fe" => "createClientInvoice('record_id')",
                "be" => "createClientInvoice()",
                "file" => "create-invoice",
                "funName" => "createClientInvoice",
                "destTable" => "invoices",
                "logicFlow" => "Create invoice for {{full_name}},clients:full_name|record_id:client_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "user-check: Active Clients" => [
                "fe" => "filterActiveClients('Active')",
                "be" => "filterActiveClients()",
                "file" => "active-clients",
                "funName" => "filterActiveClients",
                "destTable" => "clients",
                "logicFlow" => "clientStatus,Active",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

            "user-x: Inactive Clients" => [
                "fe" => "filterInactiveClients('Inactive')",
                "be" => "filterInactiveClients()",
                "file" => "inactive-clients",
                "funName" => "filterInactiveClients",
                "destTable" => "clients",
                "logicFlow" => "clientStatus,Inactive",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "deals"=>[

        "profile"=>[

            "trophy: Mark Won" => [
                "fe" => "markDealWon('record_id')",
                "be" => "markDealWon()",
                "file" => "mark-won",
                "funName" => "markDealWon",
                "destTable" => "deals",
                "logicFlow" => "Mark {{deal_title}} won,deal_status|Won",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "x-circle: Mark Lost" => [
                "fe" => "markDealLost('record_id')",
                "be" => "markDealLost()",
                "file" => "mark-lost",
                "funName" => "markDealLost",
                "destTable" => "deals",
                "logicFlow" => "Mark {{deal_title}} lost,deal_status|Lost",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "file-plus: Create Quotation" => [
                "fe" => "createDealQuotation('record_id')",
                "be" => "createDealQuotation()",
                "file" => "create-quotation",
                "funName" => "createDealQuotation",
                "destTable" => "quotations",
                "logicFlow" => "Create quotation for {{deal_title}},deals:deal_title|record_id:deal_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

            "calendar: Add Follow Up" => [
                "fe" => "addDealFollowupTask('record_id')",
                "be" => "addDealFollowupTask()",
                "file" => "add-followup-task",
                "funName" => "addDealFollowupTask",
                "destTable" => "tasks",
                "logicFlow" => "Add follow up task for {{deal_title}},deals:deal_title|record_id:deal_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "trophy: Won Deals" => [
                "fe" => "filterWonDeals('Won')",
                "be" => "filterWonDeals()",
                "file" => "won-deals",
                "funName" => "filterWonDeals",
                "destTable" => "deals",
                "logicFlow" => "dealStatus,Won",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

            "x-circle: Lost Deals" => [
                "fe" => "filterLostDeals('Lost')",
                "be" => "filterLostDeals()",
                "file" => "lost-deals",
                "funName" => "filterLostDeals",
                "destTable" => "deals",
                "logicFlow" => "dealStatus,Lost",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "products"=>[

        "profile"=>[

            "check-circle: Activate Product" => [
                "fe" => "activateProduct('record_id')",
                "be" => "activateProduct()",
                "file" => "activate-product",
                "funName" => "activateProduct",
                "destTable" => "products",
                "logicFlow" => "Activate {{product_name}} product,product_status|Active",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "pause-circle: Disable Product" => [
                "fe" => "disableProduct('record_id')",
                "be" => "disableProduct()",
                "file" => "disable-product",
                "funName" => "disableProduct",
                "destTable" => "products",
                "logicFlow" => "Disable {{product_name}} product,product_status|Inactive",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "alert-triangle: Out Of Stock Products" => [
                "fe" => "filterOutOfStockProducts('Out Of Stock')",
                "be" => "filterOutOfStockProducts()",
                "file" => "out-of-stock-products",
                "funName" => "filterOutOfStockProducts",
                "destTable" => "products",
                "logicFlow" => "productStatus,Out Of Stock",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

            "check-circle: Active Products" => [
                "fe" => "filterActiveProducts('Active')",
                "be" => "filterActiveProducts()",
                "file" => "active-products",
                "funName" => "filterActiveProducts",
                "destTable" => "products",
                "logicFlow" => "productStatus,Active",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "services"=>[

        "profile"=>[

            "check-circle: Activate Service" => [
                "fe" => "activateService('record_id')",
                "be" => "activateService()",
                "file" => "activate-service",
                "funName" => "activateService",
                "destTable" => "services",
                "logicFlow" => "Activate {{service_name}} service,service_status|Active",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "pause-circle: Disable Service" => [
                "fe" => "disableService('record_id')",
                "be" => "disableService()",
                "file" => "disable-service",
                "funName" => "disableService",
                "destTable" => "services",
                "logicFlow" => "Disable {{service_name}} service,service_status|Inactive",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "refresh-cw: Recurring Services" => [
                "fe" => "filterRecurringServices('Recurring')",
                "be" => "filterRecurringServices()",
                "file" => "recurring-services",
                "funName" => "filterRecurringServices",
                "destTable" => "services",
                "logicFlow" => "billingType,Recurring",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

            "credit-card: One Time Services" => [
                "fe" => "filterOneTimeServices('One Time')",
                "be" => "filterOneTimeServices()",
                "file" => "one-time-services",
                "funName" => "filterOneTimeServices",
                "destTable" => "services",
                "logicFlow" => "billingType,One Time",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "quotations"=>[

        "profile"=>[

            "check-circle: Approve Quotation" => [
                "fe" => "approveQuotation('record_id')",
                "be" => "approveQuotation()",
                "file" => "approve-quotation",
                "funName" => "approveQuotation",
                "destTable" => "quotations",
                "logicFlow" => "Approve {{quotation_title}} quotation,quotation_status|Approved",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "x-circle: Reject Quotation" => [
                "fe" => "rejectQuotation('record_id')",
                "be" => "rejectQuotation()",
                "file" => "reject-quotation",
                "funName" => "rejectQuotation",
                "destTable" => "quotations",
                "logicFlow" => "Reject {{quotation_title}} quotation,quotation_status|Rejected",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "file-text: Convert To Invoice" => [
                "fe" => "convertQuotationToInvoice('record_id')",
                "be" => "convertQuotationToInvoice()",
                "file" => "convert-to-invoice",
                "funName" => "convertQuotationToInvoice",
                "destTable" => "invoices",
                "logicFlow" => "Convert {{quotation_title}} to invoice,quotations:quotation_title|record_id:quotation_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "clock: Expired Quotations" => [
                "fe" => "filterExpiredQuotations('Expired')",
                "be" => "filterExpiredQuotations()",
                "file" => "expired-quotations",
                "funName" => "filterExpiredQuotations",
                "destTable" => "quotations",
                "logicFlow" => "quotationStatus,Expired",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "invoices"=>[

        "profile"=>[

            "check-circle: Mark Paid" => [
                "fe" => "markInvoicePaid('record_id')",
                "be" => "markInvoicePaid()",
                "file" => "mark-paid",
                "funName" => "markInvoicePaid",
                "destTable" => "invoices",
                "logicFlow" => "Mark {{invoice_title}} paid,invoice_status|Paid",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "alert-circle: Mark Overdue" => [
                "fe" => "markInvoiceOverdue('record_id')",
                "be" => "markInvoiceOverdue()",
                "file" => "mark-overdue",
                "funName" => "markInvoiceOverdue",
                "destTable" => "invoices",
                "logicFlow" => "Mark {{invoice_title}} overdue,invoice_status|Overdue",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "credit-card: Add Payment" => [
                "fe" => "addInvoicePayment('record_id')",
                "be" => "addInvoicePayment()",
                "file" => "add-payment",
                "funName" => "addInvoicePayment",
                "destTable" => "payments",
                "logicFlow" => "Add payment for {{invoice_title}},invoices:invoice_title|record_id:invoice_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

            "plus-circle: Add Invoice Item" => [
                "fe" => "addInvoiceItem('record_id')",
                "be" => "addInvoiceItem()",
                "file" => "add-invoice-item",
                "funName" => "addInvoiceItem",
                "destTable" => "invoice_items",
                "logicFlow" => "Add item to {{invoice_title}} invoice,invoices:invoice_title|record_id:invoice_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "clock: Pending Invoices" => [
                "fe" => "filterPendingInvoices('Pending')",
                "be" => "filterPendingInvoices()",
                "file" => "pending-invoices",
                "funName" => "filterPendingInvoices",
                "destTable" => "invoices",
                "logicFlow" => "invoiceStatus,Pending",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "payments"=>[

        "profile"=>[

            "check-circle: Confirm Payment" => [
                "fe" => "confirmPayment('record_id')",
                "be" => "confirmPayment()",
                "file" => "confirm-payment",
                "funName" => "confirmPayment",
                "destTable" => "payments",
                "logicFlow" => "Confirm payment transaction,payment_status|Paid",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "rotate-ccw: Refund Payment" => [
                "fe" => "refundPayment('record_id')",
                "be" => "refundPayment()",
                "file" => "refund-payment",
                "funName" => "refundPayment",
                "destTable" => "payments",
                "logicFlow" => "Refund payment transaction,payment_status|Refunded",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "x-circle: Failed Payments" => [
                "fe" => "filterFailedPayments('Failed')",
                "be" => "filterFailedPayments()",
                "file" => "failed-payments",
                "funName" => "filterFailedPayments",
                "destTable" => "payments",
                "logicFlow" => "paymentStatus,Failed",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

            "badge-check: Successful Payments" => [
                "fe" => "filterSuccessfulPayments('Paid')",
                "be" => "filterSuccessfulPayments()",
                "file" => "successful-payments",
                "funName" => "filterSuccessfulPayments",
                "destTable" => "payments",
                "logicFlow" => "paymentStatus,Paid",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "tasks"=>[

        "profile"=>[

            "check-circle: Mark Completed" => [
                "fe" => "markTaskCompleted('record_id')",
                "be" => "markTaskCompleted()",
                "file" => "mark-completed",
                "funName" => "markTaskCompleted",
                "destTable" => "tasks",
                "logicFlow" => "Mark {{task_title}} completed,task_status|Completed",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "alert-circle: Mark Overdue" => [
                "fe" => "markTaskOverdue('record_id')",
                "be" => "markTaskOverdue()",
                "file" => "mark-overdue",
                "funName" => "markTaskOverdue",
                "destTable" => "tasks",
                "logicFlow" => "Mark {{task_title}} overdue,task_status|Overdue",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "clock: Pending Tasks" => [
                "fe" => "filterPendingTasks('Pending')",
                "be" => "filterPendingTasks()",
                "file" => "pending-tasks",
                "funName" => "filterPendingTasks",
                "destTable" => "tasks",
                "logicFlow" => "taskStatus,Pending",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

            "check-circle: Completed Tasks" => [
                "fe" => "filterCompletedTasks('Completed')",
                "be" => "filterCompletedTasks()",
                "file" => "completed-tasks",
                "funName" => "filterCompletedTasks",
                "destTable" => "tasks",
                "logicFlow" => "taskStatus,Completed",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "activities"=>[

        "profile"=>[

            "check-circle: Mark Completed" => [
                "fe" => "markActivityCompleted('record_id')",
                "be" => "markActivityCompleted()",
                "file" => "mark-completed",
                "funName" => "markActivityCompleted",
                "destTable" => "activities",
                "logicFlow" => "Mark {{activity_title}} completed,activity_status|Completed",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "clock: Pending Activities" => [
                "fe" => "filterPendingActivities('Pending')",
                "be" => "filterPendingActivities()",
                "file" => "pending-activities",
                "funName" => "filterPendingActivities",
                "destTable" => "activities",
                "logicFlow" => "activityStatus,Pending",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

            "check-circle: Completed Activities" => [
                "fe" => "filterCompletedActivities('Completed')",
                "be" => "filterCompletedActivities()",
                "file" => "completed-activities",
                "funName" => "filterCompletedActivities",
                "destTable" => "activities",
                "logicFlow" => "activityStatus,Completed",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "users"=>[

        "profile"=>[

            "user-check: Activate User" => [
                "fe" => "activateUser('record_id')",
                "be" => "activateUser()",
                "file" => "activate-user",
                "funName" => "activateUser",
                "destTable" => "users",
                "logicFlow" => "Activate {{full_name}} user,account_status|Active",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "pause-circle: Suspend User" => [
                "fe" => "suspendUser('record_id')",
                "be" => "suspendUser()",
                "file" => "suspend-user",
                "funName" => "suspendUser",
                "destTable" => "users",
                "logicFlow" => "Suspend {{full_name}} user,account_status|Suspended",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "user-check: Active Users" => [
                "fe" => "filterActiveUsers('Active')",
                "be" => "filterActiveUsers()",
                "file" => "active-users",
                "funName" => "filterActiveUsers",
                "destTable" => "users",
                "logicFlow" => "accountStatus,Active",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

            "pause-circle: Suspended Users" => [
                "fe" => "filterSuspendedUsers('Suspended')",
                "be" => "filterSuspendedUsers()",
                "file" => "suspended-users",
                "funName" => "filterSuspendedUsers",
                "destTable" => "users",
                "logicFlow" => "accountStatus,Suspended",
                "functionType" => "DataQueryCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

    "expected_revenue"=>[

        "profile"=>[

            "check-circle: Mark Complete" => [
                "fe" => "markRevenueComplete('record_id')",
                "be" => "markRevenueComplete()",
                "file" => "mark-complete",
                "funName" => "markRevenueComplete",
                "destTable" => "expected_revenue",
                "logicFlow" => "Mark {{revenue_title}} complete,revenue_status|Completed",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "clock: Mark Pending" => [
                "fe" => "markRevenuePending('record_id')",
                "be" => "markRevenuePending()",
                "file" => "mark-pending",
                "funName" => "markRevenuePending",
                "destTable" => "expected_revenue",
                "logicFlow" => "Mark {{revenue_title}} pending,revenue_status|Pending",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "pause-circle: Mark Postponed" => [
                "fe" => "markRevenuePostponed('record_id')",
                "be" => "markRevenuePostponed()",
                "file" => "mark-postponed",
                "funName" => "markRevenuePostponed",
                "destTable" => "expected_revenue",
                "logicFlow" => "Mark {{revenue_title}} postponed,revenue_status|Postponed",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "x-circle: Mark Cancelled" => [
                "fe" => "markRevenueCancelled('record_id')",
                "be" => "markRevenueCancelled()",
                "file" => "mark-cancelled",
                "funName" => "markRevenueCancelled",
                "destTable" => "expected_revenue",
                "logicFlow" => "Mark {{revenue_title}} cancelled,revenue_status|Cancelled",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "badge-check: Mark Paid" => [
                "fe" => "markRevenuePaid('record_id')",
                "be" => "markRevenuePaid()",
                "file" => "mark-paid",
                "funName" => "markRevenuePaid",
                "destTable" => "expected_revenue",
                "logicFlow" => "Mark {{revenue_title}} paid,payment_status|Paid",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "alert-circle: Mark Unpaid" => [
                "fe" => "markRevenueUnpaid('record_id')",
                "be" => "markRevenueUnpaid()",
                "file" => "mark-unpaid",
                "funName" => "markRevenueUnpaid",
                "destTable" => "expected_revenue",
                "logicFlow" => "Mark {{revenue_title}} unpaid,payment_status|Unpaid",
                "functionType" => "DataMapUpdate",
                "basePath"=>"../logicControl"
            ],

            "file-text: Create Invoice" => [
                "fe" => "createRevenueInvoice('record_id')",
                "be" => "createRevenueInvoice()",
                "file" => "create-invoice",
                "funName" => "createRevenueInvoice",
                "destTable" => "invoices",
                "logicFlow" => "Create invoice for {{revenue_title}},expected_revenue:revenue_title|record_id:expected_revenue_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

            "calendar: Add Activity" => [
                "fe" => "addRevenueActivity('record_id')",
                "be" => "addRevenueActivity()",
                "file" => "add-activity",
                "funName" => "addRevenueActivity",
                "destTable" => "activities",
                "logicFlow" => "Add activity for {{revenue_title}},expected_revenue:revenue_title|record_id:revenue_id",
                "functionType" => "DataMapAdd",
                "basePath"=>"../logicControl"
            ],

        ],

        "list"=>[

            "building: Filter By Client" => [
                "fe" => "filterRevenueByClient('client_id')",
                "be" => "filterRevenueByClient()",
                "file" => "client-revenue",
                "funName" => "filterRevenueByClient",
                "destTable" => "expected_revenue",
                "logicFlow" => "Filter by client , clients:full_name|record_id:client_id",
                "functionType" => "DataQueryMap",
                "basePath"=>"../logicControl"
            ],

            "briefcase: Filter By Deal" => [
                "fe" => "filterRevenueByDeal('deal_id')",
                "be" => "filterRevenueByDeal()",
                "file" => "deal-revenue",
                "funName" => "filterRevenueByDeal",
                "destTable" => "expected_revenue",
                "logicFlow" => "Filter by deal, deals:deal_title|record_id:deal_id",
                "functionType" => "DataQueryMap",
                "basePath"=>"../logicControl"
            ],

            "layers: Filter By Status" => [
                "fe" => "filterRevenueByStatus('revenue_status')",
                "be" => "filterRevenueByStatus()",
                "file" => "status-revenue",
                "funName" => "filterRevenueByStatus",
                "destTable" => "expected_revenue",
                "logicFlow" => "Filter by status , payment_status",
                "functionType" => "DataQueryGroupCol",
                "basePath"=>"../logicControl"
            ],

            "layers: Filter By Month" => [
                "fe" => "filterRevenueByMonth('revenue_status')",
                "be" => "filterRevenueByMonth()",
                "file" => "filter-by-month",
                "funName" => "filterRevenueByMonth",
                "destTable" => "expected_revenue",
                "logicFlow" => "Filter by Month, revenue_month",
                "functionType" => "DataQueryGroupCol",
                "basePath"=>"../logicControl"
            ],

        ],

    ],

];

?>