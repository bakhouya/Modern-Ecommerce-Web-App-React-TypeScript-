
/* -------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------- */
export type VisitorDeviceType = "mobile" | "desktop" | "tablet" | string;
export interface VisitorMapLocation {
  id: string;
  city: string | null;
  country: string | null;
  country_code: string | null;
  latitude: number;
  longitude: number;
  device_type: VisitorDeviceType;
  created_at: string;
}
export interface VisitorMapResponse {
  total_visitors: number;
  visitors_with_location: number;
  visitors_without_location: number;
  results: VisitorMapLocation[];
}
/* -------------------------------------------------------------------------------- */



// ============================================================
// Shared / Common types
// ============================================================

export type Trend = "up" | "down" | "stable" | "no_baseline";

export interface ComparisonBlock {
  current: number;
  previous: number;
  difference: number;
  change_percent: number | null;
  trend: Trend;
}

// ============================================================
// 1. Store Statistics  (/panel/state/statistics/)
// ============================================================

export interface StoreStatisticsDate {
  today: string;
  yesterday: string;
  timezone: string;
}

export interface StoreStatisticsOrders {
  pending_total: number;
  created: {
    today: number;
    yesterday: number;
    change_percent: number | null;
    trend: Trend;
  };
  pending_created: {
    today: number;
    yesterday: number;
    change_percent: number | null;
    trend: Trend;
  };
}

export interface StoreStatisticsVisits {
  today: number;
  yesterday: number;
  change_percent: number | null;
  trend: Trend;
}

export interface StoreStatisticsNewVisitors {
  today: number;
  yesterday: number;
  change_percent: number | null;
  trend: Trend;
}

export interface StoreStatisticsResponse {
  date: StoreStatisticsDate;
  orders: StoreStatisticsOrders;
  visits: StoreStatisticsVisits;
  new_visitors: StoreStatisticsNewVisitors;
}

// ============================================================
// 2. Order Statistics  (/panel/statistics/orders/)
// ============================================================

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "READY_TO_SHIP"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED"
  | "PAYMENT_PENDING"
  | "PAYMENT_FAILED";

export interface OrderStatusItem {
  count: number;
  percentage: number;
}

export interface OrderStatisticsPeriod {
  today: string;
  average_daily_orders_period: string;
}

export interface OrderStatisticsOrders {
  total: number;
  created_today: number;
  average_daily_last_30_days: number;
}

export interface OrderStatusDistribution {
  total_orders: number;
  statuses: Record<OrderStatus, OrderStatusItem>;
}

export interface OrderGroups {
  pending_confirmation: OrderStatusItem;
  confirmed_and_processing: OrderStatusItem;
  shipped_and_delivered: OrderStatusItem;
  cancelled: OrderStatusItem;
}

export interface OrderStatisticsResponse {
  period: OrderStatisticsPeriod;
  orders: OrderStatisticsOrders;
  status_distribution: OrderStatusDistribution;
  groups: OrderGroups;
  cancellation_rate: number;
}

// ============================================================
// 3. Financial Statistics  (/panel/statistics/financial/)
// ============================================================

export interface FinancialPeriod {
  today: string;
  month_start: string;
  previous_month_start: string;
  previous_month_end: string;
  last_30_days_start: string;
  last_30_days_end: string;
  branch_id: number | null;
}

export interface WalletMovement {
  total_credit: number;
  total_debit: number;
  net_movement: number;
  transactions_count: number;
}

export interface WalletMonthComparison {
  credit: ComparisonBlock;
  debit: ComparisonBlock;
  net_movement: ComparisonBlock;
}

export interface WalletStatistics {
  all_time: WalletMovement;
  today: WalletMovement;
  yesterday: WalletMovement;
  current_month: WalletMovement;
  last_30_days: WalletMovement;
  month_comparison: WalletMonthComparison;
}

export interface ExpenseBlock {
  total: number;
  count: number;
}

export interface ExpenseCategory {
  category_id: number;
  category_name: string;
  total: number;
  count: number;
}

export interface ExpenseBranch {
  branch_id: number;
  branch_name: string;
  total: number;
  count: number;
}

export interface ExpensesStatistics {
  today: ExpenseBlock;
  yesterday: ExpenseBlock;
  current_month: ExpenseBlock;
  last_30_days: ExpenseBlock;
  month_comparison: ComparisonBlock;
  by_category: ExpenseCategory[];
  by_branch: ExpenseBranch[];
}

export interface CombinedCurrentMonth {
  wallet_credit: number;
  wallet_debit: number;
  operating_expenses: number;
  recorded_outflows_plus_expenses: number;
  previous_month_outflows_plus_expenses: number;
  outflows_plus_expenses_comparison: ComparisonBlock;
}

export interface FinancialStatisticsResponse {
  period: FinancialPeriod;
  wallet: WalletStatistics;
  expenses: ExpensesStatistics;
  combined_current_month: CombinedCurrentMonth;
}

// ============================================================
// 4. Customer & Visitor Statistics  (/panel/statistics/customers-visitors/)
// ============================================================

export interface CustomerVisitorPeriod {
  start_date: string;
  end_date: string;
}

export interface CustomerVisitorVisitors {
  total: number;
  converted: number;
  conversion_rate_percent: number;
}

export interface CustomerVisitorCustomers {
  purchasing_customers: number;
  new_customers: number;
  returning_customers: number;
  repeat_buyers_in_period: number;
  average_orders_per_customer: number;
}

export interface CustomerVisitorOrders {
  total: number;
}

export interface CustomerVisitorRevenue {
  new_customers: string;
  returning_customers: string;
  currency: string;
}

export interface CustomerVisitorStatisticsResponse {
  period: CustomerVisitorPeriod;
  visitors: CustomerVisitorVisitors;
  customers: CustomerVisitorCustomers;
  orders: CustomerVisitorOrders;
  revenue: CustomerVisitorRevenue;
}

// ============================================================
// 5. Visitor Map  (/panel/locations/map/visitors/)
// ============================================================

export type DeviceType = "desktop" | "mobile" | "tablet";

export interface VisitorMapLocation {
  id: string;
  latitude: number;
  longitude: number;
  city: string | null;
  country: string | null;
  country_code: string | null;
  device_type: string;
  created_at: string;
}

export interface VisitorMapResponse {
  results: VisitorMapLocation[];
  total_visitors: number;
  visitors_with_location: number;
  visitors_without_location: number;
}



