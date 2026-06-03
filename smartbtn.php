

/* ====================================================== */
/* PRIMARY TABLE : activities */
/* BUTTON        : check-circle: Mark Completed */
/* ====================================================== */


<MosyActionButton
    source="ActivitiesProfile"
    action="activities_DataMap_markActivityCompleted_btn"
    label="Mark Completed"
    icon="check-circle"

    onClick={()=>{

        markActivityCompleted({

            title: `Mark {{activity_title}} completed`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "activities",

            destTable: "activities",

            fieldsetstr: 'activity_status|Completed',

            profileDataNode: activitiesNode,

            dataInterpreter: InteprateActivitiesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : activities */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ActivitiesProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:activitiesNode.client_id,parentName:activitiesNode.activity_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : activities */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="ActivitiesProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:activitiesNode.deal_id,parentName:activitiesNode.activity_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : activities */
/* BUTTON        : list : View Performed By */
/* ====================================================== */


<MosyActionButton
    source="ActivitiesProfile"
    action="view_performed_by_profile_action_btn"
    label="View Performed By"
    icon="list"

    onClick={()=>{

        viewUsers({childCol:`recordId`,parentColVal:activitiesNode.performed_by,parentName:activitiesNode.activity_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : activities */
/* BUTTON        : clock: Pending Activities */
/* ====================================================== */


<MosyActionButton
    source="ActivitiesProfile"
    action="activities_DataMapQCol_filterPendingActivities_btn"
    label="Pending Activities"
    icon="clock"

    onClick={()=>{

        filterPendingActivities({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "activityStatus",

            colVal: "Pending",

            tableName: "activities",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : activities */
/* BUTTON        : check-circle: Completed Activities */
/* ====================================================== */


<MosyActionButton
    source="ActivitiesProfile"
    action="activities_DataMapQCol_filterCompletedActivities_btn"
    label="Completed Activities"
    icon="check-circle"

    onClick={()=>{

        filterCompletedActivities({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "activityStatus",

            colVal: "Completed",

            tableName: "activities",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="send_message_profile_action_btn"
    label="Send message"
    icon="send"

    onClick={()=>{

        sendSmartMessage('Inactive')

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create payment request */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create payment request"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-check: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="user-check"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-times: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="user-times"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : trophy: Mark Won */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_markDealWon_btn"
    label="Mark Won"
    icon="trophy"

    onClick={()=>{

        markDealWon({

            title: `Mark {{deal_title}} won`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "deals",

            fieldsetstr: 'deal_status|Won',

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_markDealLost_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markDealLost({

            title: `Mark {{deal_title}} lost`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "deals",

            fieldsetstr: 'deal_status|Lost',

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : file-text-o: Create Quotation */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_createDealQuotation_btn"
    label="Create Quotation"
    icon="file-text-o"

    onClick={()=>{

        createDealQuotation({

            title: `Create quotation for {{deal_title}}`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "quotations",

            fieldsetstr: "deals:deal_title|record_id:deal_id",

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : calendar: Add Follow Up */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_addDealFollowupTask_btn"
    label="Add Follow Up"
    icon="calendar"

    onClick={()=>{

        addDealFollowupTask({

            title: `Add follow up task for {{deal_title}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "tasks",

            fieldsetstr: "deals:deal_title|record_id:deal_id",

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:dealsNode.client_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Revenue */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_revenue_profile_action_btn"
    label="View Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : trophy: Won Deals */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMapQCol_filterWonDeals_btn"
    label="Won Deals"
    icon="trophy"

    onClick={()=>{

        filterWonDeals({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "dealStatus",

            colVal: "Won",

            tableName: "deals",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : x-circle: Lost Deals */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMapQCol_filterLostDeals_btn"
    label="Lost Deals"
    icon="x-circle"

    onClick={()=>{

        filterLostDeals({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "dealStatus",

            colVal: "Lost",

            tableName: "deals",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoice_items */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="InvoiceItemsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:invoice_itemsNode.invoice_id,parentName:invoice_itemsNode.invoice_item_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoice_items */
/* BUTTON        : list : View Service detail */
/* ====================================================== */


<MosyActionButton
    source="InvoiceItemsProfile"
    action="view_service_detail_profile_action_btn"
    label="View Service detail"
    icon="list"

    onClick={()=>{

        viewServices({childCol:`recordId`,parentColVal:invoice_itemsNode.item_id,parentName:invoice_itemsNode.invoice_item_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : check-circle: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMap_markInvoicePaid_btn"
    label="Mark Paid"
    icon="check-circle"

    onClick={()=>{

        markInvoicePaid({

            title: `Mark {{invoice_title}} paid`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "invoices",

            destTable: "invoices",

            fieldsetstr: 'invoice_status|Paid',

            profileDataNode: invoicesNode,

            dataInterpreter: InteprateInvoicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : alert-circle: Mark Overdue */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMap_markInvoiceOverdue_btn"
    label="Mark Overdue"
    icon="alert-circle"

    onClick={()=>{

        markInvoiceOverdue({

            title: `Mark {{invoice_title}} overdue`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "invoices",

            destTable: "invoices",

            fieldsetstr: 'invoice_status|Overdue',

            profileDataNode: invoicesNode,

            dataInterpreter: InteprateInvoicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : credit-card: Add Payment */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMap_addInvoicePayment_btn"
    label="Add Payment"
    icon="credit-card"

    onClick={()=>{

        addInvoicePayment({

            title: `Add payment for {{invoice_title}}`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "invoices",

            destTable: "payments",

            fieldsetstr: "invoices:invoice_title|record_id:invoice_id",

            profileDataNode: invoicesNode,

            dataInterpreter: InteprateInvoicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : plus-circle: Add Invoice Item */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMap_addInvoiceItem_btn"
    label="Add Invoice Item"
    icon="plus-circle"

    onClick={()=>{

        addInvoiceItem({

            title: `Add item to {{invoice_title}} invoice`,

            component: InvoiceItemsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "invoices",

            destTable: "invoice_items",

            fieldsetstr: "invoices:invoice_title|record_id:invoice_id",

            profileDataNode: invoicesNode,

            dataInterpreter: InteprateInvoicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:invoicesNode.client_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:invoicesNode.deal_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Quotation Details */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_quotation_details_profile_action_btn"
    label="View Quotation Details"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`recordId`,parentColVal:invoicesNode.quotation_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Invoice Items */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_invoice_items_profile_action_btn"
    label="View Invoice Items"
    icon="list"

    onClick={()=>{

        viewInvoiceItems({childCol:`invoiceId`,parentColVal:invoicesNode.record_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`invoiceId`,parentColVal:invoicesNode.record_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : clock: Pending Invoices */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMapQCol_filterPendingInvoices_btn"
    label="Pending Invoices"
    icon="clock"

    onClick={()=>{

        filterPendingInvoices({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "invoiceStatus",

            colVal: "Pending",

            tableName: "invoices",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-check: Convert Lead */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert Lead"
    icon="user-check"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : credit-card: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestPaymentFromLead_btn"
    label="Request payment"
    icon="credit-card"

    onClick={()=>{

        requestPaymentFromLead({

            requestData:
            {
                
            },

            title:`Request payment`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Messag to lead`,
                modalTitle:`Send Invoice Message`,
                subject:`Payment Request`,
                message:`Hello {name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment pesaa */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment pesaa"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 - 1961',

            },

            title:`Request money to lead`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Assigned Sales Rep */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_assigned_sales_rep_profile_action_btn"
    label="View Assigned Sales Rep"
    icon="list"

    onClick={()=>{

        viewUsers({childCol:`recordId`,parentColVal:leadsNode.assigned_sales_rep,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : fire: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="fire"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : page_manifest_ */
/* BUTTON        : list : View Project Users */
/* ====================================================== */


<MosyActionButton
    source="PageManifestProfile"
    action="view_project_users_profile_action_btn"
    label="View Project Users"
    icon="list"

    onClick={()=>{

        viewSystemUsers({childCol:`projectId`,parentColVal:page_manifest_Node.project_id,parentName:page_manifest_Node.page_url})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : check-circle: Activate Product */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMap_activateProduct_btn"
    label="Activate Product"
    icon="check-circle"

    onClick={()=>{

        activateProduct({

            title: `Activate {{product_name}} product`,

            component: ProductsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "products",

            destTable: "products",

            fieldsetstr: 'product_status|Active',

            profileDataNode: productsNode,

            dataInterpreter: InteprateProductsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : pause-circle: Disable Product */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMap_disableProduct_btn"
    label="Disable Product"
    icon="pause-circle"

    onClick={()=>{

        disableProduct({

            title: `Disable {{product_name}} product`,

            component: ProductsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "products",

            destTable: "products",

            fieldsetstr: 'product_status|Inactive',

            profileDataNode: productsNode,

            dataInterpreter: InteprateProductsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : exclamation-triangle: Out Of Stock Products */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMapQCol_filterOutOfStockProducts_btn"
    label="Out Of Stock Products"
    icon="exclamation-triangle"

    onClick={()=>{

        filterOutOfStockProducts({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "productStatus",

            colVal: "Out Of Stock",

            tableName: "products",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : tags: Filter Categories */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMapQCol_filterProdByCategory_btn"
    label="Filter Categories"
    icon="tags"

    onClick={()=>{

        filterProdByCategory({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Search Categories",

            parentColName: "category",

            parentTableName: "products",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : check-circle: Active Products */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMapQCol_filterActiveProducts_btn"
    label="Active Products"
    icon="check-circle"

    onClick={()=>{

        filterActiveProducts({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "productStatus",

            colVal: "Active",

            tableName: "products",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotation_items */
/* BUTTON        : list : View Quotation Details */
/* ====================================================== */


<MosyActionButton
    source="QuotationItemsProfile"
    action="view_quotation_details_profile_action_btn"
    label="View Quotation Details"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`recordId`,parentColVal:quotation_itemsNode.quotation_id,parentName:quotation_itemsNode.item_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : check-circle: Approve Quotation */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMap_approveQuotation_btn"
    label="Approve Quotation"
    icon="check-circle"

    onClick={()=>{

        approveQuotation({

            title: `Approve {{quotation_title}} quotation`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "quotations",

            destTable: "quotations",

            fieldsetstr: 'quotation_status|Approved',

            profileDataNode: quotationsNode,

            dataInterpreter: InteprateQuotationsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : x-circle: Reject Quotation */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMap_rejectQuotation_btn"
    label="Reject Quotation"
    icon="x-circle"

    onClick={()=>{

        rejectQuotation({

            title: `Reject {{quotation_title}} quotation`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "quotations",

            destTable: "quotations",

            fieldsetstr: 'quotation_status|Rejected',

            profileDataNode: quotationsNode,

            dataInterpreter: InteprateQuotationsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : file-text: Convert To Invoice */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMap_convertQuotationToInvoice_btn"
    label="Convert To Invoice"
    icon="file-text"

    onClick={()=>{

        convertQuotationToInvoice({

            title: `Convert {{quotation_title}} to invoice`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "quotations",

            destTable: "invoices",

            fieldsetstr: "quotations:quotation_title|record_id:quotation_id",

            profileDataNode: quotationsNode,

            dataInterpreter: InteprateQuotationsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:quotationsNode.client_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:quotationsNode.deal_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Quotation Items */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_quotation_items_profile_action_btn"
    label="View Quotation Items"
    icon="list"

    onClick={()=>{

        viewQuotationItems({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : clock: Expired Quotations */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMapQCol_filterExpiredQuotations_btn"
    label="Expired Quotations"
    icon="clock"

    onClick={()=>{

        filterExpiredQuotations({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "quotationStatus",

            colVal: "Expired",

            tableName: "quotations",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : check-circle: Activate Service */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="services_DataMap_activateService_btn"
    label="Activate Service"
    icon="check-circle"

    onClick={()=>{

        activateService({

            title: `Activate {{service_name}} service`,

            component: ServicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "services",

            destTable: "services",

            fieldsetstr: 'service_status|Active',

            profileDataNode: servicesNode,

            dataInterpreter: InteprateServicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : pause-circle: Disable Service */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="services_DataMap_disableService_btn"
    label="Disable Service"
    icon="pause-circle"

    onClick={()=>{

        disableService({

            title: `Disable {{service_name}} service`,

            component: ServicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "services",

            destTable: "services",

            fieldsetstr: 'service_status|Inactive',

            profileDataNode: servicesNode,

            dataInterpreter: InteprateServicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : list : View Invoice Items */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="view_invoice_items_profile_action_btn"
    label="View Invoice Items"
    icon="list"

    onClick={()=>{

        viewInvoiceItems({childCol:`itemId`,parentColVal:servicesNode.record_id,parentName:servicesNode.service_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : bolt: Filter Categories */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="services_DataMapQCol_filterByCategory_btn"
    label="Filter Categories"
    icon="bolt"

    onClick={()=>{

        filterByCategory({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Search Categories",

            parentColName: "category",

            parentTableName: "services",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : smart_payment_requests */
/* BUTTON        : credit-card: Create Payment Request */
/* ====================================================== */


<MosyActionButton
    source="SmartPaymentRequestsProfile"
    action="create_payment_request_profile_action_btn"
    label="Create Payment Request"
    icon="credit-card"

    onClick={()=>{

        createPayrequest('Inactive')

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : system_module_manifest_ */
/* BUTTON        : list : View Related Pages */
/* ====================================================== */


<MosyActionButton
    source="SystemModuleManifestProfile"
    action="view_related_pages_profile_action_btn"
    label="View Related Pages"
    icon="list"

    onClick={()=>{

        viewPageManifest({childCol:`moduleKey`,parentColVal:system_module_manifest_Node.module_key,parentName:system_module_manifest_Node.module_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : system_role_bundles */
/* BUTTON        : list : View Role Functions */
/* ====================================================== */


<MosyActionButton
    source="SystemRoleBundlesProfile"
    action="view_role_functions_profile_action_btn"
    label="View Role Functions"
    icon="list"

    onClick={()=>{

        viewUserBundleRoleFunctions({childCol:`bundleId`,parentColVal:system_role_bundlesNode.bundle_id,parentName:system_role_bundlesNode.bundle_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : system_users */
/* BUTTON        : list : View Project Pages */
/* ====================================================== */


<MosyActionButton
    source="SystemUsersProfile"
    action="view_project_pages_profile_action_btn"
    label="View Project Pages"
    icon="list"

    onClick={()=>{

        viewPageManifest({childCol:`projectId`,parentColVal:system_usersNode.project_id,parentName:system_usersNode.name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : system_users */
/* BUTTON        : list : View User Access */
/* ====================================================== */


<MosyActionButton
    source="SystemUsersProfile"
    action="view_user_access_profile_action_btn"
    label="View User Access"
    icon="list"

    onClick={()=>{

        viewUserManifest({childCol:`userId`,parentColVal:system_usersNode.record_id,parentName:system_usersNode.name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : check-circle: Mark Completed */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMap_markTaskCompleted_btn"
    label="Mark Completed"
    icon="check-circle"

    onClick={()=>{

        markTaskCompleted({

            title: `Mark {{task_title}} completed`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "tasks",

            destTable: "tasks",

            fieldsetstr: 'task_status|Completed',

            profileDataNode: tasksNode,

            dataInterpreter: InteprateTasksEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : alert-circle: Mark Overdue */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMap_markTaskOverdue_btn"
    label="Mark Overdue"
    icon="alert-circle"

    onClick={()=>{

        markTaskOverdue({

            title: `Mark {{task_title}} overdue`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "tasks",

            destTable: "tasks",

            fieldsetstr: 'task_status|Overdue',

            profileDataNode: tasksNode,

            dataInterpreter: InteprateTasksEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:tasksNode.client_id,parentName:tasksNode.task_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:tasksNode.deal_id,parentName:tasksNode.task_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : list : View Assigned User */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="view_assigned_user_profile_action_btn"
    label="View Assigned User"
    icon="list"

    onClick={()=>{

        viewUsers({childCol:`recordId`,parentColVal:tasksNode.assigned_sales_rep,parentName:tasksNode.task_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : clock: Pending Tasks */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMapQCol_filterPendingTasks_btn"
    label="Pending Tasks"
    icon="clock"

    onClick={()=>{

        filterPendingTasks({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "taskStatus",

            colVal: "Pending",

            tableName: "tasks",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : check-circle: Completed Tasks */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMapQCol_filterCompletedTasks_btn"
    label="Completed Tasks"
    icon="check-circle"

    onClick={()=>{

        filterCompletedTasks({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "taskStatus",

            colVal: "Completed",

            tableName: "tasks",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : user_bundle_role_functions */
/* BUTTON        : list : View Bundle Details */
/* ====================================================== */


<MosyActionButton
    source="UserBundleRoleFunctionsProfile"
    action="view_bundle_details_profile_action_btn"
    label="View Bundle Details"
    icon="list"

    onClick={()=>{

        viewSystemRoleBundles({childCol:`bundleId`,parentColVal:user_bundle_role_functionsNode.bundle_id,parentName:user_bundle_role_functionsNode.role_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : user_manifest_ */
/* BUTTON        : list : View User Details */
/* ====================================================== */


<MosyActionButton
    source="UserManifestProfile"
    action="view_user_details_profile_action_btn"
    label="View User Details"
    icon="list"

    onClick={()=>{

        viewSystemUsers({childCol:`recordId`,parentColVal:user_manifest_Node.user_id,parentName:user_manifest_Node.user_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : users */
/* BUTTON        : user-check: Activate User */
/* ====================================================== */


<MosyActionButton
    source="UsersProfile"
    action="users_DataMap_activateUser_btn"
    label="Activate User"
    icon="user-check"

    onClick={()=>{

        activateUser({

            title: `Activate {{full_name}} user`,

            component: UsersProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "users",

            destTable: "users",

            fieldsetstr: 'account_status|Active',

            profileDataNode: usersNode,

            dataInterpreter: InteprateUsersEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : users */
/* BUTTON        : pause-circle: Suspend User */
/* ====================================================== */


<MosyActionButton
    source="UsersProfile"
    action="users_DataMap_suspendUser_btn"
    label="Suspend User"
    icon="pause-circle"

    onClick={()=>{

        suspendUser({

            title: `Suspend {{full_name}} user`,

            component: UsersProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "users",

            destTable: "users",

            fieldsetstr: 'account_status|Suspended',

            profileDataNode: usersNode,

            dataInterpreter: InteprateUsersEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : users */
/* BUTTON        : list : View Assigned Leads */
/* ====================================================== */


<MosyActionButton
    source="UsersProfile"
    action="view_assigned_leads_profile_action_btn"
    label="View Assigned Leads"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`assignedSalesRep`,parentColVal:usersNode.record_id,parentName:usersNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : users */
/* BUTTON        : list : View Assigned Clients */
/* ====================================================== */


<MosyActionButton
    source="UsersProfile"
    action="view_assigned_clients_profile_action_btn"
    label="View Assigned Clients"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`assignedSalesRep`,parentColVal:usersNode.record_id,parentName:usersNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : users */
/* BUTTON        : list : View Assigned Deals */
/* ====================================================== */


<MosyActionButton
    source="UsersProfile"
    action="view_assigned_deals_profile_action_btn"
    label="View Assigned Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`assignedSalesRep`,parentColVal:usersNode.record_id,parentName:usersNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : users */
/* BUTTON        : list : View Assigned Tasks */
/* ====================================================== */


<MosyActionButton
    source="UsersProfile"
    action="view_assigned_tasks_profile_action_btn"
    label="View Assigned Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`assignedSalesRep`,parentColVal:usersNode.record_id,parentName:usersNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : users */
/* BUTTON        : user-check: Active Users */
/* ====================================================== */


<MosyActionButton
    source="UsersProfile"
    action="users_DataMapQCol_filterActiveUsers_btn"
    label="Active Users"
    icon="user-check"

    onClick={()=>{

        filterActiveUsers({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "accountStatus",

            colVal: "Active",

            tableName: "users",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : users */
/* BUTTON        : pause-circle: Suspended Users */
/* ====================================================== */


<MosyActionButton
    source="UsersProfile"
    action="users_DataMapQCol_filterSuspendedUsers_btn"
    label="Suspended Users"
    icon="pause-circle"

    onClick={()=>{

        filterSuspendedUsers({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "accountStatus",

            colVal: "Suspended",

            tableName: "users",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-check: Convert Lead */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert Lead"
    icon="user-check"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Assigned Sales Rep */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_assigned_sales_rep_profile_action_btn"
    label="View Assigned Sales Rep"
    icon="list"

    onClick={()=>{

        viewUsers({childCol:`recordId`,parentColVal:leadsNode.assigned_sales_rep,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-check: Convert Lead */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert Lead"
    icon="user-check"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Assigned Sales Rep */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_assigned_sales_rep_profile_action_btn"
    label="View Assigned Sales Rep"
    icon="list"

    onClick={()=>{

        viewUsers({childCol:`recordId`,parentColVal:leadsNode.assigned_sales_rep,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-check: Convert Lead */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert Lead"
    icon="user-check"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Assigned Sales Rep */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_assigned_sales_rep_profile_action_btn"
    label="View Assigned Sales Rep"
    icon="list"

    onClick={()=>{

        viewUsers({childCol:`recordId`,parentColVal:leadsNode.assigned_sales_rep,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-check: Convert Lead */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert Lead"
    icon="user-check"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-check: Convert Lead */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert Lead"
    icon="user-check"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-check: Convert Lead */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert Lead"
    icon="user-check"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name:leads",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-plus: Convert to client */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert to client"
    icon="user-plus"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name:leads,business_name:business_name:leads,converted_lead_id:record_id:leads,phone_number:phone_number,email_address:email_address:leads,alternative_phone_number:alternative_phone_number:leads,website_url:website_url:leads,industry_type:industry_type:leads,lead_source:lead_source:leads,profile_photo:profile_photo:leads",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-plus: Convert to client */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert to client"
    icon="user-plus"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name,leads:business_name|business_name:business_name,leads:converted_lead_id|record_id,leads:phone_number|phone_number:phone_number, leads:email_address|email_address:email_address,leads:alternative_phone_number|alternative_phone_number:alternative_phone_number,leads:website_url|website_url:website_url,leads:industry_type|industry_type:industry_type,leads:lead_source|lead_sourcelead_source,leads:profile_photo|profile_photo:profile_photo",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-plus: Convert to client */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert to client"
    icon="user-plus"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name,leads:business_name|business_name:business_name,leads:converted_lead_id|record_id,leads:phone_number|phone_number:phone_number, leads:email_address|email_address:email_address,leads:alternative_phone_number|alternative_phone_number:alternative_phone_number,leads:website_url|website_url:website_url,leads:industry_type|industry_type:industry_type,leads:lead_source|lead_sourcelead_source,leads:profile_photo|profile_photo:profile_photo",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`leadId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : check-circle: Mark Completed */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMap_markTaskCompleted_btn"
    label="Mark Completed"
    icon="check-circle"

    onClick={()=>{

        markTaskCompleted({

            title: `Mark {{task_title}} completed`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "tasks",

            destTable: "tasks",

            fieldsetstr: 'task_status|Completed',

            profileDataNode: tasksNode,

            dataInterpreter: InteprateTasksEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : alert-circle: Mark Overdue */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMap_markTaskOverdue_btn"
    label="Mark Overdue"
    icon="alert-circle"

    onClick={()=>{

        markTaskOverdue({

            title: `Mark {{task_title}} overdue`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "tasks",

            destTable: "tasks",

            fieldsetstr: 'task_status|Overdue',

            profileDataNode: tasksNode,

            dataInterpreter: InteprateTasksEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:tasksNode.client_id,parentName:tasksNode.task_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:tasksNode.deal_id,parentName:tasksNode.task_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : list : View Assigned User */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="view_assigned_user_profile_action_btn"
    label="View Assigned User"
    icon="list"

    onClick={()=>{

        viewUsers({childCol:`recordId`,parentColVal:tasksNode.assigned_sales_rep,parentName:tasksNode.task_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : clock: Pending Tasks */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMapQCol_filterPendingTasks_btn"
    label="Pending Tasks"
    icon="clock"

    onClick={()=>{

        filterPendingTasks({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "taskStatus",

            colVal: "Pending",

            tableName: "tasks",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : check-circle: Completed Tasks */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMapQCol_filterCompletedTasks_btn"
    label="Completed Tasks"
    icon="check-circle"

    onClick={()=>{

        filterCompletedTasks({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "taskStatus",

            colVal: "Completed",

            tableName: "tasks",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create payment request */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create payment request"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-check: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="user-check"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-times: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="user-times"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create payment request */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create payment request"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-check: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="user-check"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-times: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="user-times"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create payment request */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create payment request"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-check: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="user-check"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-times: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="user-times"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-plus: Convert to client */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert to client"
    icon="user-plus"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name,leads:business_name|business_name:business_name,leads:record_id|record_id:converted_lead_id,leads:phone_number|phone_number:phone_number, leads:email_address|email_address:email_address,leads:alternative_phone_number|alternative_phone_number:alternative_phone_number,leads:website_url|website_url:website_url,leads:industry_type|industry_type:industry_type,leads:lead_source|lead_sourcelead_source,leads:profile_photo|profile_photo:profile_photo",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`leadId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-plus: Convert to client */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert to client"
    icon="user-plus"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name,leads:business_name|business_name:business_name,leads:record_id|record_id:converted_lead_id,leads:phone_number|phone_number:phone_number, leads:email_address|email_address:email_address,leads:alternative_phone_number|alternative_phone_number:alternative_phone_number,leads:website_url|website_url:website_url,leads:industry_type|industry_type:industry_type,leads:lead_source|lead_source:lead_source,leads:profile_photo|profile_photo:profile_photo",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`leadId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Add expected pay */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Add expected pay"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-check: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="user-check"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-times: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="user-times"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Add pay expectation */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Add pay expectation"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-check: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="user-check"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-times: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="user-times"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create Payment Expectation */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create Payment Expectation"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-check: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="user-check"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-times: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="user-times"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-plus: Convert to client */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert to client"
    icon="user-plus"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name,leads:business_name|business_name:business_name,leads:record_id|record_id:converted_lead_id,leads:phone_number|phone_number:phone_number, leads:email_address|email_address:email_address,leads:alternative_phone_number|alternative_phone_number:alternative_phone_number,leads:website_url|website_url:website_url,leads:industry_type|industry_type:industry_type,leads:lead_source|lead_source:lead_source,leads:profile_photo|profile_photo:profile_photo",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`leadId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '409 1961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-plus: Convert to client */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert to client"
    icon="user-plus"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name,leads:business_name|business_name:business_name,leads:record_id|record_id:converted_lead_id,leads:phone_number|phone_number:phone_number, leads:email_address|email_address:email_address,leads:alternative_phone_number|alternative_phone_number:alternative_phone_number,leads:website_url|website_url:website_url,leads:industry_type|industry_type:industry_type,leads:lead_source|lead_source:lead_source,leads:profile_photo|profile_photo:profile_photo",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`leadId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
related_record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '4091961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-plus: Convert to client */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert to client"
    icon="user-plus"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name,leads:business_name|business_name:business_name,leads:record_id|record_id:converted_lead_id,leads:phone_number|phone_number:phone_number, leads:email_address|email_address:email_address,leads:alternative_phone_number|alternative_phone_number:alternative_phone_number,leads:website_url|website_url:website_url,leads:industry_type|industry_type:industry_type,leads:lead_source|lead_source:lead_source,leads:profile_photo|profile_photo:profile_photo",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`leadId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create Payment Expectation */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create Payment Expectation"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-check: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="user-check"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : user-times: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="user-times"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create Payment Expectation */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create Payment Expectation"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : bolt: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="bolt"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : times-circle: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="times-circle"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create Payment Expectation */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create Payment Expectation"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : bolt: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="bolt"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : times-circle: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="times-circle"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create Payment Expectation */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create Payment Expectation"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : bolt: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="bolt"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : times-circle: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="times-circle"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create Payment Expectation */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create Payment Expectation"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : bolt: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="bolt"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : times-circle: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="times-circle"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_SmartMsg_sendClientMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendClientMessage({

            profileDataNode:
            {
                tel : clientsNode?.phone_number,
email : clientsNode?.email_address,
record_id : clientsNode?.record_id,
name : clientsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${clientsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${clientsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : check-circle: Activate Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_activateClient_btn"
    label="Activate Client"
    icon="check-circle"

    onClick={()=>{

        activateClient({

            title: `Activate {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Active',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : pause-circle: Suspend Client */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_suspendClient_btn"
    label="Suspend Client"
    icon="pause-circle"

    onClick={()=>{

        suspendClient({

            title: `Suspend {{full_name}} client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "clients",

            fieldsetstr: 'client_status|Suspended',

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : line-chart: Create Payment Expectation */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientRevenueProjections_btn"
    label="Create Payment Expectation"
    icon="line-chart"

    onClick={()=>{

        createClientRevenueProjections({

            title: `Add payment request for {{full_name}}`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "expected_revenue",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : briefcase: Create Deal */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientDeal_btn"
    label="Create Deal"
    icon="briefcase"

    onClick={()=>{

        createClientDeal({

            title: `Create deal for {{full_name}}`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "deals",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMap_createClientInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createClientInvoice({

            title: `Create invoice for {{full_name}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "clients",

            destTable: "invoices",

            fieldsetstr: "clients:full_name|record_id:client_id",

            profileDataNode: clientsNode,

            dataInterpreter: InteprateClientsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Deals */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_deals_profile_action_btn"
    label="View Deals"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Expected Revenue */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_expected_revenue_profile_action_btn"
    label="View Expected Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`clientId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Lead profile */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_lead_profile_profile_action_btn"
    label="View Lead profile"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:clientsNode.converted_lead_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:clientsNode.record_id,parentName:clientsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : bolt: Active Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterActiveClients_btn"
    label="Active Clients"
    icon="bolt"

    onClick={()=>{

        filterActiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Active",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : clients */
/* BUTTON        : times-circle: Inactive Clients */
/* ====================================================== */


<MosyActionButton
    source="ClientsProfile"
    action="clients_DataMapQCol_filterInactiveClients_btn"
    label="Inactive Clients"
    icon="times-circle"

    onClick={()=>{

        filterInactiveClients({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "clientStatus",

            colVal: "Inactive",

            tableName: "clients",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_sendLeadMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        sendLeadMessage({

            profileDataNode:
            {
                tel : leadsNode?.phone_number,
email : leadsNode?.email_address,
record_id : leadsNode?.record_id,
name : leadsNode?.full_name,

            },

            uiOptions:
            {
                title:`Send Message to ${leadsNode?.full_name}`,
                modalTitle:`Send message`,
                subject:`Greetings and welcome to our system`,
                message:`Hello ${leadsNode?.full_name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_SmartMsg_requestLeadPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        requestLeadPayment({

            requestData:
            {
                payer_phone : leadsNode?.phone_number,
payer_email : leadsNode?.email_address,
related_record_id : leadsNode?.record_id,
payer_name : leadsNode?.full_name,
payment_shortcode : '4091961',

            },

            title:`Create payment request to ${leadsNode?.full_name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : user-plus: Convert to client */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_convertLead_btn"
    label="Convert to client"
    icon="user-plus"

    onClick={()=>{

        convertLead({

            title: `Convert {{full_name}} to client`,

            component: ClientsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "clients",

            fieldsetstr: "leads:full_name|full_name:full_name,leads:business_name|business_name:business_name,leads:record_id|record_id:converted_lead_id,leads:phone_number|phone_number:phone_number, leads:email_address|email_address:email_address,leads:alternative_phone_number|alternative_phone_number:alternative_phone_number,leads:website_url|website_url:website_url,leads:industry_type|industry_type:industry_type,leads:lead_source|lead_source:lead_source,leads:profile_photo|profile_photo:profile_photo,leads:record_id|converted_lead_id:record_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Mark Qualified */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markQualifiedLead_btn"
    label="Mark Qualified"
    icon="check-circle"

    onClick={()=>{

        markQualifiedLead({

            title: `Mark {{full_name}} qualified`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Qualified',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_markLostLead_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markLostLead({

            title: `Mark {{full_name}} lost`,

            component: LeadsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "leads",

            fieldsetstr: 'lead_status|Lost',

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-square: Add Task */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMap_addLeadTask_btn"
    label="Add Task"
    icon="check-square"

    onClick={()=>{

        addLeadTask({

            title: `Add task for {{full_name}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "leads",

            destTable: "tasks",

            fieldsetstr: "leads:full_name|record_id:lead_id",

            profileDataNode: leadsNode,

            dataInterpreter: InteprateLeadsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Client profile */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_client_profile_profile_action_btn"
    label="View Client profile"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:leadsNode.converted_client_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`leadId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : list : View Message history */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="view_message_history_profile_action_btn"
    label="View Message history"
    icon="list"

    onClick={()=>{

        viewSmartMessages({childCol:`relatedRecordId`,parentColVal:leadsNode.record_id,parentName:leadsNode.full_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : bolt: Hot Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterHotLeads_btn"
    label="Hot Leads"
    icon="bolt"

    onClick={()=>{

        filterHotLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadTemperature",

            colVal: "Hot",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : leads */
/* BUTTON        : check-circle: Qualified Leads */
/* ====================================================== */


<MosyActionButton
    source="LeadsProfile"
    action="leads_DataMapQCol_filterQualifiedLeads_btn"
    label="Qualified Leads"
    icon="check-circle"

    onClick={()=>{

        filterQualifiedLeads({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "leadStatus",

            colVal: "Qualified",

            tableName: "leads",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : trophy: Mark Won */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_markDealWon_btn"
    label="Mark Won"
    icon="trophy"

    onClick={()=>{

        markDealWon({

            title: `Mark {{deal_title}} won`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "deals",

            fieldsetstr: 'deal_status|Won',

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_markDealLost_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markDealLost({

            title: `Mark {{deal_title}} lost`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "deals",

            fieldsetstr: 'deal_status|Lost',

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : file-text-o: Create Quotation */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_createDealQuotation_btn"
    label="Create Quotation"
    icon="file-text-o"

    onClick={()=>{

        createDealQuotation({

            title: `Create quotation for {{deal_title}}`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "quotations",

            fieldsetstr: "deals:deal_title|record_id:deal_id",

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : calendar: Add Follow Up */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_addDealFollowupTask_btn"
    label="Add Follow Up"
    icon="calendar"

    onClick={()=>{

        addDealFollowupTask({

            title: `Add follow up task for {{deal_title}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "tasks",

            fieldsetstr: "deals:deal_title|record_id:deal_id",

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:dealsNode.client_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Revenue */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_revenue_profile_action_btn"
    label="View Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : trophy: Won Deals */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMapQCol_filterWonDeals_btn"
    label="Won Deals"
    icon="trophy"

    onClick={()=>{

        filterWonDeals({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "dealStatus",

            colVal: "Won",

            tableName: "deals",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : x-circle: Lost Deals */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMapQCol_filterLostDeals_btn"
    label="Lost Deals"
    icon="x-circle"

    onClick={()=>{

        filterLostDeals({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "dealStatus",

            colVal: "Lost",

            tableName: "deals",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : trophy: Mark Won */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_markDealWon_btn"
    label="Mark Won"
    icon="trophy"

    onClick={()=>{

        markDealWon({

            title: `Mark {{deal_title}} won`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "deals",

            fieldsetstr: 'deal_status|Won',

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_markDealLost_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markDealLost({

            title: `Mark {{deal_title}} lost`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "deals",

            fieldsetstr: 'deal_status|Lost',

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : file-text-o: Create Quotation */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_createDealQuotation_btn"
    label="Create Quotation"
    icon="file-text-o"

    onClick={()=>{

        createDealQuotation({

            title: `Create quotation for {{deal_title}}`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "quotations",

            fieldsetstr: "deals:deal_title|record_id:deal_id",

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : calendar: Add Follow Up */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_addDealFollowupTask_btn"
    label="Add Follow Up"
    icon="calendar"

    onClick={()=>{

        addDealFollowupTask({

            title: `Add follow up task for {{deal_title}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "tasks",

            fieldsetstr: "deals:deal_title|record_id:deal_id",

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:dealsNode.client_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Revenue */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_revenue_profile_action_btn"
    label="View Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : trophy: Won Deals */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMapQCol_filterWonDeals_btn"
    label="Won Deals"
    icon="trophy"

    onClick={()=>{

        filterWonDeals({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "dealStatus",

            colVal: "Won",

            tableName: "deals",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : x-circle: Lost Deals */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMapQCol_filterLostDeals_btn"
    label="Lost Deals"
    icon="x-circle"

    onClick={()=>{

        filterLostDeals({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "dealStatus",

            colVal: "Lost",

            tableName: "deals",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : trophy: Mark Won */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_markDealWon_btn"
    label="Mark Won"
    icon="trophy"

    onClick={()=>{

        markDealWon({

            title: `Mark {{deal_title}} won`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "deals",

            fieldsetstr: 'deal_status|Won',

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : x-circle: Mark Lost */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_markDealLost_btn"
    label="Mark Lost"
    icon="x-circle"

    onClick={()=>{

        markDealLost({

            title: `Mark {{deal_title}} lost`,

            component: DealsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "deals",

            fieldsetstr: 'deal_status|Lost',

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : file-text-o: Create Quotation */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_createDealQuotation_btn"
    label="Create Quotation"
    icon="file-text-o"

    onClick={()=>{

        createDealQuotation({

            title: `Create quotation for {{deal_title}}`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "quotations",

            fieldsetstr: "deals:deal_title|record_id:deal_id",

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : calendar: Add Follow Up */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMap_addDealFollowupTask_btn"
    label="Add Follow Up"
    icon="calendar"

    onClick={()=>{

        addDealFollowupTask({

            title: `Add follow up task for {{deal_title}}`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "deals",

            destTable: "tasks",

            fieldsetstr: "deals:deal_title|record_id:deal_id",

            profileDataNode: dealsNode,

            dataInterpreter: InteprateDealsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:dealsNode.client_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Quotations */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_quotations_profile_action_btn"
    label="View Quotations"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Tasks */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_tasks_profile_action_btn"
    label="View Tasks"
    icon="list"

    onClick={()=>{

        viewTasks({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : list : View Revenue */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="view_revenue_profile_action_btn"
    label="View Revenue"
    icon="list"

    onClick={()=>{

        viewExpectedRevenue({childCol:`dealId`,parentColVal:dealsNode.record_id,parentName:dealsNode.deal_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : trophy: Won Deals */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMapQCol_filterWonDeals_btn"
    label="Won Deals"
    icon="trophy"

    onClick={()=>{

        filterWonDeals({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "dealStatus",

            colVal: "Won",

            tableName: "deals",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : deals */
/* BUTTON        : x-circle: Lost Deals */
/* ====================================================== */


<MosyActionButton
    source="DealsProfile"
    action="deals_DataMapQCol_filterLostDeals_btn"
    label="Lost Deals"
    icon="x-circle"

    onClick={()=>{

        filterLostDeals({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "dealStatus",

            colVal: "Lost",

            tableName: "deals",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : check-circle: Activate Product */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMap_activateProduct_btn"
    label="Activate Product"
    icon="check-circle"

    onClick={()=>{

        activateProduct({

            title: `Activate {{product_name}} product`,

            component: ProductsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "products",

            destTable: "products",

            fieldsetstr: 'product_status|Active',

            profileDataNode: productsNode,

            dataInterpreter: InteprateProductsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : pause-circle: Disable Product */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMap_disableProduct_btn"
    label="Disable Product"
    icon="pause-circle"

    onClick={()=>{

        disableProduct({

            title: `Disable {{product_name}} product`,

            component: ProductsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "products",

            destTable: "products",

            fieldsetstr: 'product_status|Inactive',

            profileDataNode: productsNode,

            dataInterpreter: InteprateProductsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : exclamation-triangle: Out Of Stock Products */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMapQCol_filterOutOfStockProducts_btn"
    label="Out Of Stock Products"
    icon="exclamation-triangle"

    onClick={()=>{

        filterOutOfStockProducts({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "productStatus",

            colVal: "Out Of Stock",

            tableName: "products",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : tags: Filter Categories */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMapQCol_filterProdByCategory_btn"
    label="Filter Categories"
    icon="tags"

    onClick={()=>{

        filterProdByCategory({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Search Categories",

            parentColName: "category",

            parentTableName: "products",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : products */
/* BUTTON        : check-circle: Active Products */
/* ====================================================== */


<MosyActionButton
    source="ProductsProfile"
    action="products_DataMapQCol_filterActiveProducts_btn"
    label="Active Products"
    icon="check-circle"

    onClick={()=>{

        filterActiveProducts({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "productStatus",

            colVal: "Active",

            tableName: "products",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : check-circle: Activate Service */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="services_DataMap_activateService_btn"
    label="Activate Service"
    icon="check-circle"

    onClick={()=>{

        activateService({

            title: `Activate {{service_name}} service`,

            component: ServicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "services",

            destTable: "services",

            fieldsetstr: 'service_status|Active',

            profileDataNode: servicesNode,

            dataInterpreter: InteprateServicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : pause-circle: Disable Service */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="services_DataMap_disableService_btn"
    label="Disable Service"
    icon="pause-circle"

    onClick={()=>{

        disableService({

            title: `Disable {{service_name}} service`,

            component: ServicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "services",

            destTable: "services",

            fieldsetstr: 'service_status|Inactive',

            profileDataNode: servicesNode,

            dataInterpreter: InteprateServicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : list : View Invoice Items */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="view_invoice_items_profile_action_btn"
    label="View Invoice Items"
    icon="list"

    onClick={()=>{

        viewInvoiceItems({childCol:`itemId`,parentColVal:servicesNode.record_id,parentName:servicesNode.service_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : bolt: Filter Categories */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="services_DataMapQCol_filterByCategory_btn"
    label="Filter Categories"
    icon="bolt"

    onClick={()=>{

        filterByCategory({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Search Categories",

            parentColName: "category",

            parentTableName: "services",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : check-circle: Activate Service */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="services_DataMap_activateService_btn"
    label="Activate Service"
    icon="check-circle"

    onClick={()=>{

        activateService({

            title: `Activate {{service_name}} service`,

            component: ServicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "services",

            destTable: "services",

            fieldsetstr: 'service_status|Active',

            profileDataNode: servicesNode,

            dataInterpreter: InteprateServicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : pause-circle: Disable Service */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="services_DataMap_disableService_btn"
    label="Disable Service"
    icon="pause-circle"

    onClick={()=>{

        disableService({

            title: `Disable {{service_name}} service`,

            component: ServicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "services",

            destTable: "services",

            fieldsetstr: 'service_status|Inactive',

            profileDataNode: servicesNode,

            dataInterpreter: InteprateServicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : list : View Invoice Items */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="view_invoice_items_profile_action_btn"
    label="View Invoice Items"
    icon="list"

    onClick={()=>{

        viewInvoiceItems({childCol:`itemId`,parentColVal:servicesNode.record_id,parentName:servicesNode.service_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : services */
/* BUTTON        : bolt: Filter Categories */
/* ====================================================== */


<MosyActionButton
    source="ServicesProfile"
    action="services_DataMapQCol_filterByCategory_btn"
    label="Filter Categories"
    icon="bolt"

    onClick={()=>{

        filterByCategory({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Search Categories",

            parentColName: "category",

            parentTableName: "services",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : check-circle: Approve Quotation */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMap_approveQuotation_btn"
    label="Approve Quotation"
    icon="check-circle"

    onClick={()=>{

        approveQuotation({

            title: `Approve {{quotation_title}} quotation`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "quotations",

            destTable: "quotations",

            fieldsetstr: 'quotation_status|Approved',

            profileDataNode: quotationsNode,

            dataInterpreter: InteprateQuotationsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : x-circle: Reject Quotation */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMap_rejectQuotation_btn"
    label="Reject Quotation"
    icon="x-circle"

    onClick={()=>{

        rejectQuotation({

            title: `Reject {{quotation_title}} quotation`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "quotations",

            destTable: "quotations",

            fieldsetstr: 'quotation_status|Rejected',

            profileDataNode: quotationsNode,

            dataInterpreter: InteprateQuotationsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : file-text: Convert To Invoice */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMap_convertQuotationToInvoice_btn"
    label="Convert To Invoice"
    icon="file-text"

    onClick={()=>{

        convertQuotationToInvoice({

            title: `Convert {{quotation_title}} to invoice`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "quotations",

            destTable: "invoices",

            fieldsetstr: "quotations:quotation_title|record_id:quotation_id",

            profileDataNode: quotationsNode,

            dataInterpreter: InteprateQuotationsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:quotationsNode.client_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:quotationsNode.deal_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Quotation Items */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_quotation_items_profile_action_btn"
    label="View Quotation Items"
    icon="list"

    onClick={()=>{

        viewQuotationItems({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : clock: Expired Quotations */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMapQCol_filterExpiredQuotations_btn"
    label="Expired Quotations"
    icon="clock"

    onClick={()=>{

        filterExpiredQuotations({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "quotationStatus",

            colVal: "Expired",

            tableName: "quotations",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : check-circle: Approve Quotation */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMap_approveQuotation_btn"
    label="Approve Quotation"
    icon="check-circle"

    onClick={()=>{

        approveQuotation({

            title: `Approve {{quotation_title}} quotation`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "quotations",

            destTable: "quotations",

            fieldsetstr: 'quotation_status|Approved',

            profileDataNode: quotationsNode,

            dataInterpreter: InteprateQuotationsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : x-circle: Reject Quotation */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMap_rejectQuotation_btn"
    label="Reject Quotation"
    icon="x-circle"

    onClick={()=>{

        rejectQuotation({

            title: `Reject {{quotation_title}} quotation`,

            component: QuotationsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "quotations",

            destTable: "quotations",

            fieldsetstr: 'quotation_status|Rejected',

            profileDataNode: quotationsNode,

            dataInterpreter: InteprateQuotationsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : file-text: Convert To Invoice */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMap_convertQuotationToInvoice_btn"
    label="Convert To Invoice"
    icon="file-text"

    onClick={()=>{

        convertQuotationToInvoice({

            title: `Convert {{quotation_title}} to invoice`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "quotations",

            destTable: "invoices",

            fieldsetstr: "quotations:quotation_title|record_id:quotation_id",

            profileDataNode: quotationsNode,

            dataInterpreter: InteprateQuotationsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:quotationsNode.client_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:quotationsNode.deal_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Quotation Items */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_quotation_items_profile_action_btn"
    label="View Quotation Items"
    icon="list"

    onClick={()=>{

        viewQuotationItems({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`quotationId`,parentColVal:quotationsNode.record_id,parentName:quotationsNode.quotation_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : quotations */
/* BUTTON        : clock: Expired Quotations */
/* ====================================================== */


<MosyActionButton
    source="QuotationsProfile"
    action="quotations_DataMapQCol_filterExpiredQuotations_btn"
    label="Expired Quotations"
    icon="clock"

    onClick={()=>{

        filterExpiredQuotations({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "quotationStatus",

            colVal: "Expired",

            tableName: "quotations",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : check-circle: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMap_markInvoicePaid_btn"
    label="Mark Paid"
    icon="check-circle"

    onClick={()=>{

        markInvoicePaid({

            title: `Mark {{invoice_title}} paid`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "invoices",

            destTable: "invoices",

            fieldsetstr: 'invoice_status|Paid',

            profileDataNode: invoicesNode,

            dataInterpreter: InteprateInvoicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : alert-circle: Mark Overdue */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMap_markInvoiceOverdue_btn"
    label="Mark Overdue"
    icon="alert-circle"

    onClick={()=>{

        markInvoiceOverdue({

            title: `Mark {{invoice_title}} overdue`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "invoices",

            destTable: "invoices",

            fieldsetstr: 'invoice_status|Overdue',

            profileDataNode: invoicesNode,

            dataInterpreter: InteprateInvoicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : credit-card: Add Payment */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMap_addInvoicePayment_btn"
    label="Add Payment"
    icon="credit-card"

    onClick={()=>{

        addInvoicePayment({

            title: `Add payment for {{invoice_title}}`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "invoices",

            destTable: "payments",

            fieldsetstr: "invoices:invoice_title|record_id:invoice_id",

            profileDataNode: invoicesNode,

            dataInterpreter: InteprateInvoicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : plus-circle: Add Invoice Item */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMap_addInvoiceItem_btn"
    label="Add Invoice Item"
    icon="plus-circle"

    onClick={()=>{

        addInvoiceItem({

            title: `Add item to {{invoice_title}} invoice`,

            component: InvoiceItemsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "invoices",

            destTable: "invoice_items",

            fieldsetstr: "invoices:invoice_title|record_id:invoice_id",

            profileDataNode: invoicesNode,

            dataInterpreter: InteprateInvoicesEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:invoicesNode.client_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:invoicesNode.deal_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Quotation Details */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_quotation_details_profile_action_btn"
    label="View Quotation Details"
    icon="list"

    onClick={()=>{

        viewQuotations({childCol:`recordId`,parentColVal:invoicesNode.quotation_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Invoice Items */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_invoice_items_profile_action_btn"
    label="View Invoice Items"
    icon="list"

    onClick={()=>{

        viewInvoiceItems({childCol:`invoiceId`,parentColVal:invoicesNode.record_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`invoiceId`,parentColVal:invoicesNode.record_id,parentName:invoicesNode.invoice_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : invoices */
/* BUTTON        : clock: Pending Invoices */
/* ====================================================== */


<MosyActionButton
    source="InvoicesProfile"
    action="invoices_DataMapQCol_filterPendingInvoices_btn"
    label="Pending Invoices"
    icon="clock"

    onClick={()=>{

        filterPendingInvoices({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "invoiceStatus",

            colVal: "Pending",

            tableName: "invoices",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : send: Send Ack message */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_SmartMsg_sendAckMessage_btn"
    label="Send Ack message"
    icon="send"

    onClick={()=>{

        sendAckMessage({

            profileDataNode:
            {
                tel : paymentsNode?.tel,
email : paymentsNode?.email,
record_id : paymentsNode?.record_id,
name : paymentsNode?.name,
amount : paymentsNode?.amount_paid,

            },

            uiOptions:
            {
                title:`Send Message to ${paymentsNode?.name}`,
                modalTitle:`Send message`,
                subject:`Payment received`,
                message:`Hello ${payments?.name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : send: Send Ack message */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_SmartMsg_sendAckMessage_btn"
    label="Send Ack message"
    icon="send"

    onClick={()=>{

        sendAckMessage({

            profileDataNode:
            {
                tel : paymentsNode?.tel,
email : paymentsNode?.email,
record_id : paymentsNode?.record_id,
name : paymentsNode?.name,
amount : paymentsNode?.amount_paid,

            },

            uiOptions:
            {
                title:`Send Message to ${paymentsNode?.name}`,
                modalTitle:`Send message`,
                subject:`Payment received`,
                message:`Hello ${paymentsNode?.name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Confirm Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_confirmPayment_btn"
    label="Confirm Payment"
    icon="check-circle"

    onClick={()=>{

        confirmPayment({

            title: `Confirm payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : undo: Refund Payment */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMap_refundPayment_btn"
    label="Refund Payment"
    icon="undo"

    onClick={()=>{

        refundPayment({

            title: `Refund payment transaction`,

            component: PaymentsProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "payments",

            destTable: "payments",

            fieldsetstr: 'payment_status|Refunded',

            profileDataNode: paymentsNode,

            dataInterpreter: IntepratePaymentsEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Invoice Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_invoice_details_profile_action_btn"
    label="View Invoice Details"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:paymentsNode.invoice_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:paymentsNode.deal_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:paymentsNode.client_id,parentName:paymentsNode.transaction_ref})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : x-circle: Failed Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterFailedPayments_btn"
    label="Failed Payments"
    icon="x-circle"

    onClick={()=>{

        filterFailedPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Failed",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : payments */
/* BUTTON        : check-circle: Successful Payments */
/* ====================================================== */


<MosyActionButton
    source="PaymentsProfile"
    action="payments_DataMapQCol_filterSuccessfulPayments_btn"
    label="Successful Payments"
    icon="check-circle"

    onClick={()=>{

        filterSuccessfulPayments({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "paymentStatus",

            colVal: "Paid",

            tableName: "payments",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : send: Send reminder */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_sendReminderMessage_btn"
    label="Send reminder"
    icon="send"

    onClick={()=>{

        sendReminderMessage({

            profileDataNode:
            {
                tel : expected_revenueNode?.tel,
email : expected_revenueNode?.email,
record_id : expected_revenueNode?.record_id,
name : expected_revenueNode?.name,
amount : expected_revenueNode?.amount_paid,

            },

            uiOptions:
            {
                title:`Send reminder to ${expected_revenueNode?.name}`,
                modalTitle:`Send message`,
                subject:`Payment reminder`,
                message:`Hello ${expected_revenueNode?.name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : send: Send reminder */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_sendReminderMessage_btn"
    label="Send reminder"
    icon="send"

    onClick={()=>{

        sendReminderMessage({

            profileDataNode:
            {
                tel : expected_revenueNode?.tel,
email : expected_revenueNode?.email,
record_id : expected_revenueNode?.record_id,
name : expected_revenueNode?.name,
amount : expected_revenueNode?.amount_paid,

            },

            uiOptions:
            {
                title:`Send reminder to ${expected_revenueNode?.name}`,
                modalTitle:`Send message`,
                subject:`Payment reminder`,
                message:`Hello ${expected_revenueNode?.name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : send: Send reminder */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_sendReminderMessage_btn"
    label="Send reminder"
    icon="send"

    onClick={()=>{

        sendReminderMessage({

            profileDataNode:
            {
                tel : expected_revenueNode?.tel,
email : expected_revenueNode?.email,
record_id : expected_revenueNode?.record_id,
name : expected_revenueNode?.name,
amount : expected_revenueNode?.amount_paid,

            },

            uiOptions:
            {
                title:`Send reminder to ${expected_revenueNode?.name}`,
                modalTitle:`Send message`,
                subject:`Payment reminder`,
                message:`Hello ${expected_revenueNode?.name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : send: Send reminder */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_sendReminderMessage_btn"
    label="Send reminder"
    icon="send"

    onClick={()=>{

        sendReminderMessage({

            profileDataNode:
            {
                tel : expected_revenueNode?.tel,
email : expected_revenueNode?.email,
record_id : expected_revenueNode?.record_id,
name : expected_revenueNode?.name,
amount : expected_revenueNode?.expected_amount,

            },

            uiOptions:
            {
                title:`Send reminder to ${expected_revenueNode?.name}`,
                modalTitle:`Send message`,
                subject:`Payment reminder`,
                message:`Hello ${expected_revenueNode?.name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : check-circle: Mark Completed */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMap_markTaskCompleted_btn"
    label="Mark Completed"
    icon="check-circle"

    onClick={()=>{

        markTaskCompleted({

            title: `Mark {{task_title}} completed`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "tasks",

            destTable: "tasks",

            fieldsetstr: 'task_status|Completed',

            profileDataNode: tasksNode,

            dataInterpreter: InteprateTasksEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : alert-circle: Mark Overdue */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMap_markTaskOverdue_btn"
    label="Mark Overdue"
    icon="alert-circle"

    onClick={()=>{

        markTaskOverdue({

            title: `Mark {{task_title}} overdue`,

            component: TasksProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "tasks",

            destTable: "tasks",

            fieldsetstr: 'task_status|Overdue',

            profileDataNode: tasksNode,

            dataInterpreter: InteprateTasksEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:tasksNode.client_id,parentName:tasksNode.task_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : list : View Deal Details */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="view_deal_details_profile_action_btn"
    label="View Deal Details"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:tasksNode.deal_id,parentName:tasksNode.task_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : list : View Assigned User */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="view_assigned_user_profile_action_btn"
    label="View Assigned User"
    icon="list"

    onClick={()=>{

        viewUsers({childCol:`recordId`,parentColVal:tasksNode.assigned_sales_rep,parentName:tasksNode.task_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : clock: Pending Tasks */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMapQCol_filterPendingTasks_btn"
    label="Pending Tasks"
    icon="clock"

    onClick={()=>{

        filterPendingTasks({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "taskStatus",

            colVal: "Pending",

            tableName: "tasks",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : tasks */
/* BUTTON        : check-circle: Completed Tasks */
/* ====================================================== */


<MosyActionButton
    source="TasksProfile"
    action="tasks_DataMapQCol_filterCompletedTasks_btn"
    label="Completed Tasks"
    icon="check-circle"

    onClick={()=>{

        filterCompletedTasks({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            colName: "taskStatus",

            colVal: "Completed",

            tableName: "tasks",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : smart_messages */
/* BUTTON        : list : View Clients */
/* ====================================================== */


<MosyActionButton
    source="SmartMessagesProfile"
    action="view_clients_profile_action_btn"
    label="View Clients"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:smart_messagesNode.related_record_id,parentName:smart_messagesNode.recipient_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : smart_messages */
/* BUTTON        : list : View Leads */
/* ====================================================== */


<MosyActionButton
    source="SmartMessagesProfile"
    action="view_leads_profile_action_btn"
    label="View Leads"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:smart_messagesNode.related_record_id,parentName:smart_messagesNode.recipient_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : smart_messages */
/* BUTTON        : send: Send Message */
/* ====================================================== */


<MosyActionButton
    source="SmartMessagesProfile"
    action="smart_messages_SmartMsg_reSendMessage_btn"
    label="Send Message"
    icon="send"

    onClick={()=>{

        reSendMessage({

            profileDataNode:
            {
                tel : smart_messagesNode?.recipient_phone,
email : smart_messagesNode?.recipient_email,
record_id : smart_messagesNode?.related_record_id,
name : smart_messagesNode?.recipient_name,

            },

            uiOptions:
            {
                title:`Send Message`,
                modalTitle:`Send message`,
                subject:`${smart_messagesNode?.message_subject}`,
                message:`${smart_messagesNode?.message_content}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : smart_messages */
/* BUTTON        : list : View Clients */
/* ====================================================== */


<MosyActionButton
    source="SmartMessagesProfile"
    action="view_clients_profile_action_btn"
    label="View Clients"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:smart_messagesNode.related_record_id,parentName:smart_messagesNode.recipient_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : smart_messages */
/* BUTTON        : list : View Leads */
/* ====================================================== */


<MosyActionButton
    source="SmartMessagesProfile"
    action="view_leads_profile_action_btn"
    label="View Leads"
    icon="list"

    onClick={()=>{

        viewLeads({childCol:`recordId`,parentColVal:smart_messagesNode.related_record_id,parentName:smart_messagesNode.recipient_name})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : send: Send reminder */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_sendReminderMessage_btn"
    label="Send reminder"
    icon="send"

    onClick={()=>{

        sendReminderMessage({

            profileDataNode:
            {
                tel : expected_revenueNode?.tel,
email : expected_revenueNode?.email,
record_id : expected_revenueNode?.record_id,
name : expected_revenueNode?.name,
amount : expected_revenueNode?.expected_amount,

            },

            uiOptions:
            {
                title:`Send reminder to ${expected_revenueNode?.name}`,
                modalTitle:`Send message`,
                subject:`Payment reminder`,
                message:`Hello ${expected_revenueNode?.name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_generateRequestPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        generateRequestPayment({

            requestData:
            {
                payer_phone : expected_revenueNode?.tel,
payer_email : expected_revenueNode?.email,
related_record_id : expected_revenueNode?.record_id,
payer_name : expected_revenueNode?.name,
payment_shortcode : '4091961',

            },

            title:`Create payment request to ${expected_revenueNode?.name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : send: Send reminder */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_sendReminderMessage_btn"
    label="Send reminder"
    icon="send"

    onClick={()=>{

        sendReminderMessage({

            profileDataNode:
            {
                tel : expected_revenueNode?.tel,
email : expected_revenueNode?.email,
record_id : expected_revenueNode?.record_id,
name : expected_revenueNode?.name,
amount : expected_revenueNode?.expected_amount,

            },

            uiOptions:
            {
                title:`Send reminder to ${expected_revenueNode?.name}`,
                modalTitle:`Send message`,
                subject:`Payment reminder`,
                message:`Hello ${expected_revenueNode?.name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_generateRequestPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        generateRequestPayment({

            requestData:
            {
                amount : expected_revenueNode?.expected_amount,
payer_phone : expected_revenueNode?.tel,
payer_email : expected_revenueNode?.email,
related_record_id : expected_revenueNode?.record_id,
payer_name : expected_revenueNode?.name,
payment_shortcode : '4091961',

            },

            title:`Create payment request to ${expected_revenueNode?.name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : send: Send reminder */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_sendReminderMessage_btn"
    label="Send reminder"
    icon="send"

    onClick={()=>{

        sendReminderMessage({

            profileDataNode:
            {
                tel : expected_revenueNode?.tel,
email : expected_revenueNode?.email,
record_id : expected_revenueNode?.record_id,
name : expected_revenueNode?.name,
amount : expected_revenueNode?.expected_amount,

            },

            uiOptions:
            {
                title:`Send reminder to ${expected_revenueNode?.name}`,
                modalTitle:`Send message`,
                subject:`Payment reminder`,
                message:`Hello ${expected_revenueNode?.name}`
            }

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : copy: Request payment */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_SmartMsg_generateRequestPayment_btn"
    label="Request payment"
    icon="copy"

    onClick={()=>{

        generateRequestPayment({

            requestData:
            {
                amount : expected_revenueNode?.expected_amount,
payer_phone : expected_revenueNode?.tel,
payer_email : expected_revenueNode?.email,
payment_for : expected_revenueNode?.revenue_title,
related_record_id : expected_revenueNode?.record_id,
payer_name : expected_revenueNode?.name,
payment_shortcode : '4091961',

            },

            title:`Create payment request to ${expected_revenueNode?.name}`

        });

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : check-circle: Mark Complete */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueComplete_btn"
    label="Mark Complete"
    icon="check-circle"

    onClick={()=>{

        markRevenueComplete({

            title: `Mark {{revenue_title}} complete`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Completed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : clock: Mark Pending */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePending_btn"
    label="Mark Pending"
    icon="clock"

    onClick={()=>{

        markRevenuePending({

            title: `Mark {{revenue_title}} pending`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Pending',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : pause-circle: Mark Postponed */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePostponed_btn"
    label="Mark Postponed"
    icon="pause-circle"

    onClick={()=>{

        markRevenuePostponed({

            title: `Mark {{revenue_title}} postponed`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Postponed',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : x-circle: Mark Cancelled */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueCancelled_btn"
    label="Mark Cancelled"
    icon="x-circle"

    onClick={()=>{

        markRevenueCancelled({

            title: `Mark {{revenue_title}} cancelled`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'revenue_status|Cancelled',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : badge-check: Mark Paid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenuePaid_btn"
    label="Mark Paid"
    icon="badge-check"

    onClick={()=>{

        markRevenuePaid({

            title: `Mark {{revenue_title}} paid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Paid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : alert-circle: Mark Unpaid */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_markRevenueUnpaid_btn"
    label="Mark Unpaid"
    icon="alert-circle"

    onClick={()=>{

        markRevenueUnpaid({

            title: `Mark {{revenue_title}} unpaid`,

            component: ExpectedRevenueProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "expected_revenue",

            fieldsetstr: 'payment_status|Unpaid',

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : file-text: Create Invoice */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_createRevenueInvoice_btn"
    label="Create Invoice"
    icon="file-text"

    onClick={()=>{

        createRevenueInvoice({

            title: `Create invoice for {{revenue_title}}`,

            component: InvoicesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "invoices",

            fieldsetstr: "expected_revenue:revenue_title|record_id:expected_revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Add Activity */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMap_addRevenueActivity_btn"
    label="Add Activity"
    icon="calendar"

    onClick={()=>{

        addRevenueActivity({

            title: `Add activity for {{revenue_title}}`,

            component: ActivitiesProfile,

            stateitemsetters: stateItemSetters,

            parentTable: "expected_revenue",

            destTable: "activities",

            fieldsetstr: "expected_revenue:revenue_title|record_id:revenue_id",

            profileDataNode: expected_revenueNode,

            dataInterpreter: InteprateExpectedRevenueEvent

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Client Details */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_client_details_profile_action_btn"
    label="View Client Details"
    icon="list"

    onClick={()=>{

        viewClients({childCol:`recordId`,parentColVal:expected_revenueNode.client_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_deal_profile_action_btn"
    label="View Deal"
    icon="list"

    onClick={()=>{

        viewDeals({childCol:`recordId`,parentColVal:expected_revenueNode.deal_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Invoices */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_invoices_profile_action_btn"
    label="View Invoices"
    icon="list"

    onClick={()=>{

        viewInvoices({childCol:`recordId`,parentColVal:expected_revenueNode.invoice_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Payments */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_payments_profile_action_btn"
    label="View Payments"
    icon="list"

    onClick={()=>{

        viewPayments({childCol:`transactionRef`,parentColVal:expected_revenueNode.payment_ref_no,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list : View Activities */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="view_activities_profile_action_btn"
    label="View Activities"
    icon="list"

    onClick={()=>{

        viewActivities({childCol:`dealId`,parentColVal:expected_revenueNode.record_id,parentName:expected_revenueNode.revenue_title})

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : building: Filter By Client */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByClient_btn"
    label="Filter By Client"
    icon="building"

    onClick={()=>{

        filterRevenueByClient({

            title : "Filter by client",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "client_id",
            displayField : "full_name",
            parentTableName : "clients",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : briefcase: Filter By Deal */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByDeal_btn"
    label="Filter By Deal"
    icon="briefcase"

    onClick={()=>{

        filterRevenueByDeal({

            title : "Filter by deal",
            customQueryStr : customQueryStr,
            stateItemSetters : stateItemSetters,
            parentColName : "record_id",
            childColName : "deal_id",
            displayField : "deal_title",
            parentTableName : "deals",
            childTableName : "expected_revenue"

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : list-alt: Filter By Status */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByStatus_btn"
    label="Filter By Status"
    icon="list-alt"

    onClick={()=>{

        filterRevenueByStatus({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by status",

            parentColName: "payment_status",

            parentTableName: "expected_revenue",

        })

    }}
/>

/* ====================================================== */
/* PRIMARY TABLE : expected_revenue */
/* BUTTON        : calendar: Filter By Month */
/* ====================================================== */


<MosyActionButton
    source="ExpectedRevenueProfile"
    action="expected_revenue_DataMapQCol_filterRevenueByMonth_btn"
    label="Filter By Month"
    icon="calendar"

    onClick={()=>{

        filterRevenueByMonth({

            customQueryStr : customQueryStr,

            stateItemSetters: stateItemSetters,

            title: "Filter by Month",

            parentColName: "revenue_month",

            parentTableName: "expected_revenue",

        })

    }}
/>