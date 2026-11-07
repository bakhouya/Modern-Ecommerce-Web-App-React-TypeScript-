

// const ROUTES = {

//     // ================= DASHBOARD =================
//     HOME: "/admin",
//     PROFILE: "/admin/profile",

//     // ================= AUTH =================
//     LOGIN: "/admin/login",

//     // ================= CATALOGUE =================
//     PRODUCTS: "/admin/products",
//     CATEGORIES: "/admin/categories",
//     BRANDS: "/admin/brands",
//     ATTRIBUTES: "/admin/attributes",

//     // ================= SALES =================
//     ORDERS: "/admin/orders",
//     INVOICES: "/admin/invoices",
//     WALLET: "/admin/wallet",

//     // ================= CUSTOMERS =================
//     CLIENTS: "/admin/clients",

//     // ================= MARKETING =================
//     MARKETING: "/admin/marketing",
//     SLIDERS: "/admin/marketing/sliders",
//     COUPONS: "/admin/marketing/coupons",
//     OFFERS: "/admin/marketing/offers",
//     CREATE: "/admin/marketing/offers/creation",
    
//     NOTIFICATIONS: "/admin/notifications",

//     // ================= CONTENT =================
//     CONTENT: "/admin/content",
//     THEMES: "/admin/themes",

//     // ================= LOGISTICS =================
//     SHIPPING: "/admin/partners/shipping",
//     EXPENSES: "/admin/expenses",

//     // ================= ANALYTICS =================
//     REPORTS: "/admin/reports",
//     VISITORS: "/admin/visitors",
//     VISITORS_MAP: "/admin/visitors/map",
//     STATISTICS: "/admin/statistics",

//     // ================= SETTINGS =================
//     SETTINGS: "/admin/settings/platform",
//     SETTING_INVOICES: "/admin/settings/invoices",
//     USERS: "/admin/users",
//     CITIES: "/admin/cities",
//     POLICY: "/admin/policies",
//     SERVICE: "/admin/services",
//     ROLES: "admin/roles" ,

//     SUPPLIER: "/admin/suppliers",
//     BRANCHES: "/admin/branches",

//     ADMIN: "/admin/administration",
// };
// export default ROUTES;





const ROUTES = {
  // ================= DASHBOARD =================
  HOME: "/admin/dashboard/overview/main",
  PROFILE: "/admin/account/profile/personal-information",

  // ================= AUTH =================
  LOGIN: "/admin/authentication/login/sign-in",

  // ================= CATALOGUE =================
  PRODUCTS: "/admin/catalogue/products/all-products/list",
  CATEGORIES: "/admin/catalogue/categories/all-categories/list",
  BRANDS: "/admin/catalogue/brands/all-brands/list",
  ATTRIBUTES: "/admin/catalogue/attributes/product-attributes/list",

  // ================= SALES =================
  ORDERS: "/admin/sales/orders/all-orders/order-management",
  ORDER_DETAILS: (id: string) => `/admin/sales/orders/all-orders/order-management/${id}`,
  INVOICES: "/admin/sales/invoices/all-invoices/invoice-management",
  WALLET: "/admin/sales/wallet/transactions/balance-management",

  // ================= CUSTOMERS =================
  CLIENTS: "/admin/customers/clients/all-customers/customer-management",

  // ================= MARKETING =================
  MARKETING: "/admin/marketing/campaigns/overview",
  SLIDERS: "/admin/marketing/content/sliders/all-sliders/management",
  COUPONS: "/admin/marketing/promotions/coupons/all-coupons/management",
  OFFERS: "/admin/marketing/promotions/offers/all-offers/management",
  CREATE: "/admin/marketing/promotions/offers/creation/new-offer",

  NOTIFICATIONS: "/admin/communication/notifications/all-notifications/management",

  // ================= CONTENT =================
  CONTENT: "/admin/content-management/pages/all-pages/management",
  THEMES: "/admin/appearance/themes/all-themes/customization",

  // ================= LOGISTICS =================
  SHIPPING: "/admin/logistics/partners/shipping/all-shipping-partners/management",
  EXPENSES: "/admin/finance/expenses/all-expenses/expense-management",

  // ================= ANALYTICS =================
  REPORTS: "/admin/analytics/reports/all-reports/business-reports",
  VISITORS: "/admin/analytics/visitors/all-visitors/visitor-management",
  VISITORS_MAP: "/admin/analytics/visitors/geographical-distribution/interactive-map",
  STATISTICS: "/admin/analytics/statistics/platform-performance/overview",

  // ================= SETTINGS =================
  SETTINGS: "/admin/settings/platform/general-configuration",
  SETTING_INVOICES: "/admin/settings/invoices/invoice-configuration",
  USERS: "/admin/administration/users/all-users/user-management",
  CITIES: "/admin/locations/cities/all-cities/management",
  POLICY: "/admin/legal/policies/all-policies/management",
  SERVICE: "/admin/platform/services/all-services/management",
  ROLES: "/admin/administration/security/roles-and-permissions/management",

  SUPPLIER: "/admin/partners/suppliers/all-suppliers/management",
  BRANCHES: "/admin/organization/branches/all-branches/management",

  ADMIN: "/admin/administration/platform-administration/overview",
};

export default ROUTES;
