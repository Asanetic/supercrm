// sidebarConfigPOS.js
//
// Links built from the modules that actually exist under app/imsv2/
// (each has a real *Schema.js + list/profile/import page.jsx). Every href
// uses routes.imsv2 ('/ims/imsv2') — the previous version of this file
// pointed at routes.novaerpv9, a route prefix with no corresponding app
// directory in this project, so none of those links ever resolved.
//
// Modules that only have a *Schema.js so far (mosymetrics) are left out —
// there's no list/profile page to link to yet. calls/messages now have
// full pages and are grouped into "Communications" below alongside
// Message Templates and Reminders — every module that's a channel for
// reaching a contact (or the log/config behind one), in one place, instead
// of scattered standalone submenus.

export const sidebarConfig = [

  {
    type: "link",
    label: "Dashboard",
    icon: "fa fa-dashboard",
    href: (routes) => `${routes.imsv2}/dashboard/main`,
    roles: []
  },

  {
    type: "submenu",
    label: "Contacts",
    icon: "fa fa-address-book",
    roles: [],
    items: [
      { label: "All Contacts", href: (routes) => `${routes.imsv2}/contacts/list`, roles: [] },
      { label: "Add Contact", href: (routes) => `${routes.imsv2}/contacts/profile`, roles: [] },
      { label: "Import Contacts", href: (routes) => `${routes.imsv2}/contacts/import`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: " Deals",
    icon: "fa fa-handshake-o mr-1",
    roles: [],
    items: [
      { label: "All Deals", href: (routes) => `${routes.imsv2}/opportunities/list`, roles: [] },
      { label: "Add Deal", href: (routes) => `${routes.imsv2}/opportunities/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Activities",
    icon: "fa fa-calendar-check-o",
    roles: [],
    items: [
      { label: "All Activities", href: (routes) => `${routes.imsv2}/activities/list`, roles: [] },
      { label: "Log Activity", href: (routes) => `${routes.imsv2}/activities/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Revenue Plan",
    icon: "fa fa-line-chart",
    roles: [],
    items: [
      { label: "Expected Revenue", href: (routes) => `${routes.imsv2}/revenueplan/list`, roles: [] },
      { label: "Add expected revenue ", href: (routes) => `${routes.imsv2}/revenueplan/profile`, roles: [] },
      { label: "Income Sources", href: (routes) => `${routes.imsv2}/incomesources/list`, roles: [] },
      { label : "Income plan", href: (routes) => `${routes.imsv2}/incomeplan/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Payments",
    icon: "fa fa-money",
    roles: [],
    items: [
      { label: "Payment history", href: (routes) => `${routes.imsv2}/paymenthistory/list`, roles: [] },
      { label: "Log a Payment", href: (routes) => `${routes.imsv2}/paymenthistory/profile`, roles: [] },
      { label: "Payment Requests", href: (routes) => `${routes.imsv2}/paymentrequests/list`, roles: [] },
    ]
  },

  {
    type: "submenu",
    label: "Notes",
    icon: "fa fa-sticky-note",
    roles: [],
    items: [
      { label: "All Notes", href: (routes) => `${routes.imsv2}/notes/list`, roles: [] },
      { label: "Add Note", href: (routes) => `${routes.imsv2}/notes/profile`, roles: [] },
    ],
  },

  // Every channel for reaching a contact (or the config/log behind one),
  // grouped together instead of four standalone submenus.
  {
    type: "submenu",
    label: "Communications",
    icon: "fa fa-comments-o",
    roles: [],
    items: [
      { label: "Messages", href: (routes) => `${routes.imsv2}/messages/list`, roles: [] },
      { label: "Calls", href: (routes) => `${routes.imsv2}/calls/list`, roles: [] },
      { label: "Message Templates", href: (routes) => `${routes.imsv2}/messagetemplates/list`, roles: [] },
      { label: "Add Template", href: (routes) => `${routes.imsv2}/messagetemplates/profile`, roles: [] },
      { label: "All Reminders", href: (routes) => `${routes.imsv2}/mosyreminders/list`, roles: [] },
      { label: "Reminder Log", href: (routes) => `${routes.imsv2}/mosyreminderlogs/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Admin",
    icon: "fa fa-shield",
    roles: [],
    items: [
      { label: "System Users", href: (routes) => `${routes.imsv2}/systemusers/list`, roles: [] },
      { label: "Add System User", href: (routes) => `${routes.imsv2}/systemusers/profile`, roles: [] },
    ],
  },

];
