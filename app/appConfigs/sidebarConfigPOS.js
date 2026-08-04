// sidebarConfigPOS.js

export const sidebarConfig = [

  {
    type: "link",
    label: "Dashboard",
    icon: "fa fa-dashboard",
    href: (routes) => `${routes.crm}/dashboard/main`,
    roles: []
  },

  {
    type: "submenu",
    label: "Leads",
    icon: "fa fa-user-plus",
    roles: [],
    items: [
      { label: "All Leads", href: (routes) => `${routes.crm}/leads/list`, roles: [] },
      { label: "Add Lead", href: (routes) => `${routes.crm}/leads/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Contacts",
    icon: "fa fa-address-book",
    roles: [],
    items: [
      { label: "All Contacts", href: (routes) => `${routes.crm}/contacts/list`, roles: [] },
      { label: "Add Contact", href: (routes) => `${routes.crm}/contacts/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Companies",
    icon: "fa fa-building",
    roles: [],
    items: [
      { label: "All Companies", href: (routes) => `${routes.crm}/companies/list`, roles: [] },
      { label: "Add Company", href: (routes) => `${routes.crm}/companies/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Deals",
    icon: "fa fa-handshake-o",
    roles: [],
    items: [
      { label: "All Deals", href: (routes) => `${routes.crm}/deals/list`, roles: [] },
      { label: "Add Deal", href: (routes) => `${routes.crm}/deals/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Pipeline",
    icon: "fa fa-filter",
    roles: [],
    items: [
      { label: "Pipeline Stages", href: (routes) => `${routes.crm}/pipeline_stages/list`, roles: [] },
      { label: "Add Stage", href: (routes) => `${routes.crm}/pipeline_stages/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Tasks",
    icon: "fa fa-tasks",
    roles: [],
    items: [
      { label: "All Tasks", href: (routes) => `${routes.crm}/tasks/list`, roles: [] },
      { label: "Add Task", href: (routes) => `${routes.crm}/tasks/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Activities",
    icon: "fa fa-calendar-check-o",
    roles: [],
    items: [
      { label: "Activity Log", href: (routes) => `${routes.crm}/activities/list`, roles: [] },
      { label: "Log Activity", href: (routes) => `${routes.crm}/activities/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Notes",
    icon: "fa fa-sticky-note",
    roles: [],
    items: [
      { label: "All Notes", href: (routes) => `${routes.crm}/notes/list`, roles: [] },
      { label: "Add Note", href: (routes) => `${routes.crm}/notes/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Documents",
    icon: "fa fa-file-text-o",
    roles: [],
    items: [
      { label: "All Documents", href: (routes) => `${routes.crm}/documents/list`, roles: [] },
      { label: "Upload Document", href: (routes) => `${routes.crm}/documents/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Payments",
    icon: "fa fa-credit-card",
    roles: [],
    items: [
      { label: "Revenue plan", href: (routes) => `${routes.crm}/revenueplan/list`, roles: [] },
      { label: "Payment Requests", href: (routes) => `${routes.crm}/payment_requests/list`, roles: [] },
      { label: "Create Request", href: (routes) => `${routes.crm}/payment_requests/profile`, roles: [] },
      { label: "Payments", href: (routes) => `${routes.crm}/payments/list`, roles: [] },
      { label: "Payment Settings", href: (routes) => `${routes.crm}/payment_settings/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Smart Messaging",
    icon: "fa fa-paper-plane",
    roles: [],
    items: [
      { label: "Outgoing Messages", href: (routes) => `${routes.crm}/messages/list`, roles: [] },
      { label: "Smart Templates", href: (routes) => `${routes.crm}/message_templates/list`, roles: [] },
      { label: "Add Template", href: (routes) => `${routes.crm}/message_templates/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Users & Roles",
    icon: "fa fa-users",
    roles: [],
    items: [
      { label: "System Users", href: (routes) => `${routes.crm}/users/list`, roles: [] },
      { label: "Add User", href: (routes) => `${routes.crm}/users/profile`, roles: [] },
      { label: "System Roles", href: (routes) => `${routes.crm}/systemroles/list`, roles: [] },
      { label: "Add Role", href: (routes) => `${routes.crm}/systemroles/profile`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Modules",
    icon: "fa fa-cubes",
    roles: [],
    items: [
      { label: "System Modules", href: (routes) => `${routes.crm}/system_modules/list`, roles: [] },
      { label: "Module Permissions", href: (routes) => `${routes.crm}/system_module_manifest_/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Settings",
    icon: "fa fa-cogs",
    roles: [],
    items: [
      { label: "General Settings", href: (routes) => `${routes.crm}/dashboard/settings`, roles: [] },
    ],
  }

];
