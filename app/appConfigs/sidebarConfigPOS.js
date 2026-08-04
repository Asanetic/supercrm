// sidebarConfigPOS.js

export const sidebarConfig = [

  {
    type: "link",
    label: "Dashboard",
    icon: "fa fa-dashboard",
    href: (routes) => `${routes.financecrm}/dashboard/main`,
    roles: []
  },

  {
    type: "submenu",
    label: "Leads",
    icon: "fa fa-user-plus",
    roles: [],
    items: [
      { label: "All Leads", href: (routes) => `${routes.financecrm}/leads/list`, roles: [] },
      { label: "Add Lead", href: (routes) => `${routes.financecrm}/leads/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Clients",
    icon: "fa fa-users",
    roles: [],
    items: [
      { label: "All Clients", href: (routes) => `${routes.financecrm}/clients/list`, roles: [] },
      { label: "Add Client", href: (routes) => `${routes.financecrm}/clients/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Deals",
    icon: "fa fa-handshake-o",
    roles: [],
    items: [
      { label: "All Deals", href: (routes) => `${routes.financecrm}/deals/list`, roles: [] },
      { label: "Add Deal", href: (routes) => `${routes.financecrm}/deals/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Activities",
    icon: "fa fa-calendar-check-o",
    roles: [],
    items: [
      { label: "Activity Log", href: (routes) => `${routes.financecrm}/activities/list`, roles: [] },
      { label: "Log Activity", href: (routes) => `${routes.financecrm}/activities/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Quotations & Invoices",
    icon: "fa fa-file-text-o",
    roles: [],
    items: [
      { label: "All Quotations", href: (routes) => `${routes.financecrm}/quotations/list`, roles: [] },
      { label: "Create Quotation", href: (routes) => `${routes.financecrm}/quotations/profile`, roles: [] },
      { label: "Quotation Items", href: (routes) => `${routes.financecrm}/quotationitems/list`, roles: [] },
      { label: "All Invoices", href: (routes) => `${routes.financecrm}/invoices/list`, roles: [] },
      { label: "Create Invoice", href: (routes) => `${routes.financecrm}/invoices/profile`, roles: [] },
      { label: "Invoice Items", href: (routes) => `${routes.financecrm}/invoice_items/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Payments",
    icon: "fa fa-money",
    roles: [],
    items: [
      { label: "Revenue Forecast", href: (routes) => `${routes.financecrm}/expectedrevenue/list`, roles: [] },
      { label: "Add Forecast", href: (routes) => `${routes.financecrm}/expectedrevenue/profile`, roles: [] },
      { label: "Payments Received", href: (routes) => `${routes.financecrm}/payments/list`, roles: [] },
      { label: "Record Payment", href: (routes) => `${routes.financecrm}/payments/profile`, roles: [] },
      { label: "Payment Requests", href: (routes) => `${routes.financecrm}/paymentrequests/list`, roles: [] },
      { label: "Create Request", href: (routes) => `${routes.financecrm}/paymentrequests/profile`, roles: [] },
      { label: "Smart Payments", href: (routes) => `${routes.financecrm}/payments/list`, roles: [] },
      { label: "Payment Settings", href: (routes) => `${routes.financecrm}/paymentsettings/list`, roles: [] },

    ],
  },



  {
    type: "submenu",
    label: "Products & Services",
    icon: "fa fa-shopping-cart",
    roles: [],
    items: [
      { label: "Products", href: (routes) => `${routes.financecrm}/products/list`, roles: [] },
      { label: "Add Product", href: (routes) => `${routes.financecrm}/products/profile`, roles: [] },
      { label: "Services", href: (routes) => `${routes.financecrm}/services/list`, roles: [] },
      { label: "Add Service", href: (routes) => `${routes.financecrm}/services/profile`, roles: [] },

    ],
  },


  {
    type: "submenu",
    label: "Messaging",
    icon: "fa fa-paper-plane",
    roles: [],
    items: [
      { label: "Message Queue", href: (routes) => `${routes.financecrm}/messages/list`, roles: [] },
      { label: "Message Templates", href: (routes) => `${routes.financecrm}/messagetemplates/list`, roles: [] },
      { label: "Add Template", href: (routes) => `${routes.financecrm}/messagetemplates/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Settings",
    icon: "fa fa-cogs",
    roles: [],
    items: [
      { label: "System Settings", href: (routes) => `${routes.financecrm}/settings/list`, roles: [] },
      { label: "General Settings", href: (routes) => `${routes.financecrm}/dashboard/settings`, roles: [] },
    ],
  }

];
