// sidebarConfigPOS.js

export const sidebarConfig = [

  {
    type: "link",
    label: "Dashboard",
    icon: "fa fa-home",
    href: (routes) => `${routes.cms}/dashboard/main`,
    roles: []
  },

  {
    type: "submenu",
    label: "Leads",
    icon: "fa fa-user-plus",
    roles: [],
    items: [
      { label: "All Leads", href: (routes) => `${routes.cms}/leads/list`, roles: [] },
      { label: "New Lead", href: (routes) => `${routes.cms}/leads/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Clients",
    icon: "fa fa-users",
    roles: [],
    items: [
      { label: "All Clients", href: (routes) => `${routes.cms}/clients/list`, roles: [] },
      { label: "New Client", href: (routes) => `${routes.cms}/clients/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Deals",
    icon: "fa fa-briefcase",
    roles: [],
    items: [
      { label: "All Deals", href: (routes) => `${routes.cms}/deals/list`, roles: [] },
      { label: "New Deal", href: (routes) => `${routes.cms}/deals/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Products",
    icon: "fa fa-cube",
    roles: [],
    items: [
      { label: "All Products", href: (routes) => `${routes.cms}/products/list`, roles: [] },
      { label: "New Product", href: (routes) => `${routes.cms}/products/profile`, roles: [] },
    ],
  },


  {
    type: "submenu",
    label: "Services",
    icon: "fa fa-cogs",
    roles: [],
    items: [
      { label: "All Services", href: (routes) => `${routes.cms}/services/list`, roles: [] },
      { label: "New Service", href: (routes) => `${routes.cms}/services/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Quotations",
    icon: "fa fa-file-text",
    roles: [],
    items: [
      { label: "All Quotations", href: (routes) => `${routes.cms}/quotations/list`, roles: [] },
      { label: "New Quotation", href: (routes) => `${routes.cms}/quotations/profile`, roles: [] },
      { label: "Quotation Items", href: (routes) => `${routes.cms}/quotationitems/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Invoices",
    icon: "fa fa-file",
    roles: [],
    items: [
      { label: "All Invoices", href: (routes) => `${routes.cms}/invoices/list`, roles: [] },
      { label: "New Invoice", href: (routes) => `${routes.cms}/invoices/profile`, roles: [] },
      { label: "Invoice Items", href: (routes) => `${routes.cms}/invoiceitems/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Payments",
    icon: "fa fa-credit-card",
    roles: [],
    items: [
      { label: "All Payments", href: (routes) => `${routes.cms}/payments/list`, roles: [] },
      { label: "Record Payment", href: (routes) => `${routes.cms}/payments/profile`, roles: [] },
      { label: "Smart Payments", href: (routes) => `${routes.cms}/smartpayments/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Revenue Projections",
    icon: "fa fa-star",
    roles: [],
    items: [
      { label: "Add Revenue projection", href: (routes) => `${routes.cms}/expectedrevenue/profile`, roles: [] },
      { label: "Revenue projection list", href: (routes) => `${routes.cms}/expectedrevenue/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Tasks",
    icon: "fa fa-tasks",
    roles: [],
    items: [
      { label: "All Tasks", href: (routes) => `${routes.cms}/tasks/list`, roles: [] },
      { label: "New Task", href: (routes) => `${routes.cms}/tasks/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Activities",
    icon: "fa fa-history",
    roles: [],
    items: [
      { label: "All Activities", href: (routes) => `${routes.cms}/activities/list`, roles: [] },
      { label: "Log Activity", href: (routes) => `${routes.cms}/activities/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Communication",
    icon: "fa fa-comments",
    roles: [],
    items: [
      { label: "Client Directory", href: (routes) => `${routes.cms}/clients/list`, roles: [] },
      { label: "Lead Contacts", href: (routes) => `${routes.cms}/leads/list`, roles: [] },
      { label: "Messages", href: (routes) => `${routes.cms}/smartmessages/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Reports",
    icon: "fa fa-line-chart",
    roles: [],
    items: [
      { label: "CRM Dashboard", href: (routes) => `${routes.cms}/dashboard/main`, roles: [] },
      { label: "Sales Reports", href: (routes) => `${routes.cms}/dashboard/sales`, roles: [] },
      { label: "Lead Reports", href: (routes) => `${routes.cms}/dashboard/leads`, roles: [] },
      { label: "Revenue Reports", href: (routes) => `${routes.cms}/dashboard/payments`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Users & Staff",
    icon: "fa fa-users",
    roles: [],
    items: [
      { label: "All Users", href: (routes) => `${routes.cms}/users/list`, roles: [] },
      { label: "New User", href: (routes) => `${routes.cms}/users/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Imports",
    icon: "fa fa-upload",
    roles: [],
    items: [
      { label: "Import Clients", href: (routes) => `${routes.cms}/clients/import`, roles: [] },
      { label: "Import Leads", href: (routes) => `${routes.cms}/leads/import`, roles: [] },
      { label: "Import Products", href: (routes) => `${routes.cms}/products/import`, roles: [] },
      { label: "Import Services", href: (routes) => `${routes.cms}/services/import`, roles: [] },
      { label: "Import Deals", href: (routes) => `${routes.cms}/deals/import`, roles: [] },
      { label: "Import Payments", href: (routes) => `${routes.cms}/payments/import`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Settings",
    icon: "fa fa-gear",
    roles: [],
    items: [
      { label: "User Settings", href: (routes) => `${routes.cms}/users/list`, roles: [] },
      { label: "Product Settings", href: (routes) => `${routes.cms}/products/list`, roles: [] },
      { label: "Service Settings", href: (routes) => `${routes.cms}/services/list`, roles: [] },
      { label: "Payment Settings", href: (routes) => `${routes.cms}/payments/list`, roles: [] },
      { label: "System Settings", href: (routes) => `${routes.cms}/dashboard/main`, roles: [] },
    ],
  }

];
//