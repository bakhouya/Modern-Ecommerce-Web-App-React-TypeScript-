import type { Product } from "./productTypes";

export interface AddToCartPayload {
  variant: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number | null;
}

export interface CartItemVariant {
  id: string;
  sku: string;
  price: string;
  stock: number;
  values_details: {
    id: string;
    value: string;
    type: string;
    attribute_title: string;
  }[];
  image: string | null;
  track_branches: boolean;
  is_default: boolean;
}

export interface CartItem {
  id: string;
  quantity: number;
  variant: CartItemVariant;
  product: Product;
  total: number | string;
}

export interface CartResponse {
  id: string;
  item_count: number;
  original_total: number | string;
  discounted_total: number | string;
  savings: number | string;
  items: CartItem[];
}

export interface CartSummary {
  cart_id: string;
  total_items: number;
  total_price: number | string;
  has_items: boolean;
}



export interface CartValue {
  id: string;
  type: string;
  value: string;
}
export interface CartVariant {
  id: string;
  qty: number;
  price: string;
  total: string;
  values: CartValue[];
}
export interface CartProduct {
  id: string;
  name: string;
  image: string;
  disc: string | null;
  has_offer: boolean;
  price: string;
  total: string;
  variants: CartVariant[];
}
export interface Cart {
  id: string;
  items: number;
  total: string;
  discount: string;
  save: string;
  products: CartProduct[];
}


export interface CheckoutResponse {
    id: string;
    order_code: string;
    created_at: string;
    status: string;
    total_price: string;
    invoice?: string ;
}



export interface OrderTrackingResponse {
    order_code: string;
    status: string;
    id: string;
    status_color: string;
    message: string;
}

export interface OrderTrackStatus {
    id: string;
    title: string;
}
