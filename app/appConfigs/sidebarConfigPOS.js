// sidebarConfigPOS.js

export const sidebarConfig = [

  {
    type: "link",
    label: "Dashboard",
    icon: "fa fa-dashboard",
    href: (routes) => `${routes.assettracker}/dashboard/main`,
    roles: []
  },


  {
    type: "submenu",
    label: "Users & Roles",
    icon: "fa fa-users",
    roles: [],
    items: [
      { label: "System Users", href: (routes) => `${routes.assettracker}/system_users/list`, roles: [] },
      { label: "Add User", href: (routes) => `${routes.assettracker}/system_users/profile`, roles: [] },
      { label: "Role Bundles", href: (routes) => `${routes.assettracker}/system_role_bundles/list`, roles: [] },
      { label: "Add Bundle", href: (routes) => `${routes.assettracker}/system_role_bundles/profile`, roles: [] },
      { label: "Bundle Roles", href: (routes) => `${routes.assettracker}/user_bundle_role_functions/list`, roles: [] },
      { label: "User Permissions", href: (routes) => `${routes.assettracker}/user_manifest_/list`, roles: [] },
    ],
  },

  {
    type: "submenu",
    label: "Settings",
    icon: "fa fa-cogs",
    roles: [],
    items: [
      { label: "General Settings", href: (routes) => `${routes.assettracker}/dashboard/settings`, roles: [] },
    ],
  }

];
