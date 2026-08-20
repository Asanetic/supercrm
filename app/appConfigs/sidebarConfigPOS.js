// sidebarConfigPOS.js
//
// Links built from the modules that actually exist under app/novaerpv9/
// (each has a real *Schema.js + list/profile/import page.jsx). Every href
// uses routes.novaerpv9 ('/novaerpv9') — an earlier version of this file
// pointed at routes.novaerpv4, a route prefix with no corresponding app
// directory in this project, so none of those links ever resolved.

export const sidebarConfig = [

  {
    type: "link",
    label: "Dashboard",
    icon: "fa fa-dashboard",
    href: (routes) => `${routes.novaerpv9}/dashboard/main`,
    roles: []
  },

  {
    type: "submenu",
    label: "Leads",
    icon: "fa fa-bullseye",
    roles: [],
    items: [
      { label: "All Leads", href: (routes) => `${routes.novaerpv9}/leads/list`, roles: [] },
      { label: "Add Lead", href: (routes) => `${routes.novaerpv9}/leads/profile`, roles: [] },
      { label: "Import Leads", href: (routes) => `${routes.novaerpv9}/leads/import`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Clients",
    icon: "fa fa-users",
    roles: [],
    items: [
      { label: "All Clients", href: (routes) => `${routes.novaerpv9}/clients/list`, roles: [] },
      { label: "Add Client", href: (routes) => `${routes.novaerpv9}/clients/profile`, roles: [] },
      { label: "Import Clients", href: (routes) => `${routes.novaerpv9}/clients/import`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: " Deals",
    icon: "fa fa-handshake-o",
    roles: [],
    items: [
      { label: "All Deals", href: (routes) => `${routes.novaerpv9}/deals/list`, roles: [] },
      { label: "Add Deal", href: (routes) => `${routes.novaerpv9}/deals/profile`, roles: [] },
      { label: "Import Deals", href: (routes) => `${routes.novaerpv9}/deals/import`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Quotations",
    icon: "fa fa-file-text-o",
    roles: [],
    items: [
      { label: "All Quotations", href: (routes) => `${routes.novaerpv9}/quotations/list`, roles: [] },
      { label: "Add Quotation", href: (routes) => `${routes.novaerpv9}/quotations/profile`, roles: [] },
      { label: "Import Quotations", href: (routes) => `${routes.novaerpv9}/quotations/import`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Revenue Plan",
    icon: "fa fa-line-chart",
    roles: [],
    items: [
      { label: "All Revenue Plans", href: (routes) => `${routes.novaerpv9}/revenueplan/list`, roles: [] },
      { label: "Add Revenue Plan", href: (routes) => `${routes.novaerpv9}/revenueplan/profile`, roles: [] },
      { label: "Import Revenue Plans", href: (routes) => `${routes.novaerpv9}/revenueplan/import`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Communications",
    icon: "fa fa-comments",
    roles: [],
    items: [
      { label: "Messages", href: (routes) => `${routes.novaerpv9}/messages/list`, roles: [] },
      { label: "Compose Message", href: (routes) => `${routes.novaerpv9}/messages/profile`, roles: [] },
      { label: "Import Messages", href: (routes) => `${routes.novaerpv9}/messages/import`, roles: [] },
      { label: "Call History", href: (routes) => `${routes.novaerpv9}/callhistory/list`, roles: [] },
      { label: "Log a Call", href: (routes) => `${routes.novaerpv9}/callhistory/profile`, roles: [] },
      { label: "Import Call History", href: (routes) => `${routes.novaerpv9}/callhistory/import`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Payments",
    icon: "fa fa-money",
    roles: [],
    items: [
      { label: "All Payments", href: (routes) => `${routes.novaerpv9}/payments/list`, roles: [] },
      { label: "Log a Payment", href: (routes) => `${routes.novaerpv9}/payments/profile`, roles: [] },
      { label: "Import Payments", href: (routes) => `${routes.novaerpv9}/payments/import`, roles: [] },
      { label: "Payment Requests", href: (routes) => `${routes.novaerpv9}/smartpaymentrequests/list`, roles: [] },
      { label: "New Payment Request", href: (routes) => `${routes.novaerpv9}/smartpaymentrequests/profile`, roles: [] },
      { label: "Import Payment Requests", href: (routes) => `${routes.novaerpv9}/smartpaymentrequests/import`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Personal Tools",
    icon: "fa fa-address-book",
    roles: [],
    items: [
      { label: "Phonebook", href: (routes) => `${routes.novaerpv9}/phonebook/list`, roles: [] },
      { label: "Add Contact", href: (routes) => `${routes.novaerpv9}/phonebook/profile`, roles: [] },
      { label: "Import Contacts", href: (routes) => `${routes.novaerpv9}/phonebook/import`, roles: [] },
      { label: "Quick Notes", href: (routes) => `${routes.novaerpv9}/quicknotes/list`, roles: [] },
      { label: "Add Note", href: (routes) => `${routes.novaerpv9}/quicknotes/profile`, roles: [] },
      { label: "Import Notes", href: (routes) => `${routes.novaerpv9}/quicknotes/import`, roles: [] },
    ],
  },

];
