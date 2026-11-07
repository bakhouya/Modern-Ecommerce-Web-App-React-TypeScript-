import type { PaginationTypes } from "./basicTypes";


export interface OrderStatus {
  id: string;
  title: string;
}

export interface OrderStatusInfo {
  title: string;
  color: string;
}
export interface Order {
  id: string;
  status: OrderStatusInfo;
  order_code: string;
  order_type: string;
  payment_status: string;
  shipping_type: string;
  city: string;
  branch: string;
  client_phone: string;
  client_name: string;
  created_at: string;
  total_price: number;
  products_count: number;
  variants_count: number;
}

export interface OrdersResponse {
  pagination: PaginationTypes;
  results: Order[];
}







export interface OrderImage {
  id: string;
  image: string;
}
export interface OrderProductInfo {
  id: string;
  title: string;
  image: OrderImage[];
}
export interface VariantAttribute {
  attribute__title: string;
  value: string;
}
export interface VariantSnapshot {
  sku: string;
  title: string;
  attributes: VariantAttribute[];
}
export interface OrderVariant {
  id: string;
  quantity: number;
  price: string;
  total_price: string;
  variant_snapshot: VariantSnapshot;
}
export interface OfferSnapshot {
  has_offer: boolean;
  offer_id: string | null;
  offer_title: string | null;
  discount: number;
  final_price: number;
  total_quantity: number;
  total_price: number;
  discount_type: string;
  condition_type: string;
  tiers: unknown[];
  applied_at: string;
}
export interface AppliedOfferRule {
  min_order_price: number;
}
export interface OrderProduct {
  id: string;
  has_offer: boolean;
  price: string;
  offer_snapshot: OfferSnapshot;
  applied_offer_rule: AppliedOfferRule;
  original_price: string;
  product: OrderProductInfo;
  variants: OrderVariant[];
}
export interface OrderStatusDetails {
  id: string;
  title: string;
  color: string;
}
export interface OrderCityDetails {
  id: string;
  title: string;
}
export interface OrderBranchDetails {
  id: string;
  title: string;
}
export interface OrderDeliveryDetails {
  id: string;
  [key: string]: unknown;
}
export interface OrderAgentDetails {
  id: string;
  [key: string]: unknown;
}
export interface OrderDetails {
  id: string;
  products: OrderProduct[];
  status_details: OrderStatusDetails;
  city_details: OrderCityDetails;
  branch_details: OrderBranchDetails;
  delevery_details: OrderDeliveryDetails | null;
  agent_details: OrderAgentDetails | null;
  total: number;
  created_at: string;
  updated_at: string;
  order_code: string;
  order_type: string;
  payment_status: string;
  shipping_type: string;
  shipping_cost: string;
  client_name: string;
  client_phone: string;
  client_address: string;
  client_note: string;
  deleted: boolean;
}
