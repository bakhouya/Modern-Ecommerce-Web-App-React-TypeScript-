export type ConditionType = 'PRICE' | 'QUANTITY';
export type DiscountType = 'FIXED' | 'PERCENTAGE';

export interface Variant {
    min_order_pieces: number;
    discount_fixed_amount: string;
    discount_percentage: string;
}

export interface OfferFormValues {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    min_order_price: string;
    discount_fixed_amount: string;
    discount_percentage: string;
    condition_type: ConditionType;
    discount_type: DiscountType;
    variants: string; 
    products: string; 
}