import type { PaginationTypes } from "./basicTypes";

/* ---------------------------------------------------------------------------------*/
/*  Product Detail (from products_detials) 
/* ---------------------------------------------------------------------------------*/
export interface ProductDetailTypes {id: string; title: string;}
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/*  Offer Variant
/* A variant applies when a certain quantity threshold is met.
/* ---------------------------------------------------------------------------------*/
export interface OfferVariantTypes {
    min_order_pieces: number ;             // threshold quantity
    discount_fixed_amount: string |  null; // e.g. "50.00"
    discount_percentage: string | null ;   // e.g. 12               
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* The discount_type and condition_type are string literals.
/* We also include fixed/percents in the root, but note that for QUANTITY offers,
/* the root fields are null and the actual discounts live in variants.
/* ---------------------------------------------------------------------------------*/
type DiscountType = 'PERCENTAGE' | 'FIXED';
type ConditionType = 'PRICE' | 'QUANTITY';
/* ---------------------------------------------------------------------------------*/
export interface OfferTypes {
  id: string;
  title: string;
  description: string;
  slug: string;
  discount_type: DiscountType;
  condition_type: ConditionType;
  min_order_price: string | null;        
  discount_fixed_amount: string | null;  
  discount_percentage: number | null;    
  start_date: string;                 
  end_date: string;
  status: boolean;                       
  image: string | null;
  created_at: string;
  updated_at: string;
  // Relationships
  variants: OfferVariantTypes[];              
  products_detials: ProductDetailTypes[];     
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export type OfferFormData = FormData ;
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* Full API Response 
/* ---------------------------------------------------------------------------------*/
export interface OfferPaginatedResponse {
    pagination: PaginationTypes;
    results: OfferTypes[];
}
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface OfferFilterTypes {
    page        : number;
    title?      : string;
    description?: string;
    type?       : string;
    categories? : string[];
    status?     : boolean | null | string ;
}
/* ---------------------------------------------------------------------------------*/



export interface ProductOffer {
    id: string;
    title: string;
    description: string;
    image: string | null;
    start_date: string;
    end_date: string;
    slug: string;
    discount_type: string;
    condition_type: string;
    min_order_price: number | null;
    discount_fixed_amount: number | null;
    discount_percentage: number | null;
    variants: OfferVariantTypes[];
}
