



export interface IProductFilters {
    status?: boolean;
    has_variant?: boolean;
    created_at?: string;
    created_after?: string;
    created_before?: string;

    brand?: string;
    brand__in?: string;

    main_category?: string;
    main_category__in?: string;

    categories?: string;
    category?: string;
    attribute_values?: string;
    attribute?: string;

    min_price?: number;
    max_price?: number;
    price_range?: string;

    in_stock?: boolean;
    has_offer?: boolean;
}



export interface IProduct {
    id: number;
    title: string;
    price: number;
    oldPrice?: number; 
    image: string;     
    rating: number;    
    isNew?: boolean;   
}
export interface IProductImage {
    id: string;
    image: string;
}
export interface IApiProduct {
    id: string;
    title: string;
    slug: string;
    price_sale: string | null;   
    price_regular: string | null;
    has_offer: boolean;
    main_category: string;
    brand: string;
    image: IProductImage[];      
    stock: number;
    rating: number;              
    has_variant: boolean;
    status: boolean;
}
export interface ProductForCreate {
  id: string;
  title: string;
  price_sale: string;
  image: IProductImage[];
  stock: number;
}




export interface ValueDetail {
    id: string;
    value: string;
    type: string;
    attribute_title: string;
}
export interface VariantDetail {
    id: string;
    sku: string;
    price: string;
    stock: number;
    total_stock: number;
    values_details: ValueDetail[];
    image: string | null;
    track_branches: boolean;
    is_default: boolean;
}
export interface CategoryDetail { id: string; title: string }
export interface BrandDetail { id: string; title: string }
export interface Product {
    id: string;
    variants_details: VariantDetail[];
    images_details: IProductImage[]; 
    main_category_details: CategoryDetail;
    categories_details: CategoryDetail[] ;
    brand_details: BrandDetail ;
    has_offer: boolean ;
    views: number ;
    comments: number ;
    rating: number;
    live_views: number;
    created_at: string;
    updated_at: string;
    title: string;
    slug: string;
    description: string;
    details: string;
    tags: string;
    status: boolean;
    has_variant: boolean;
    price_cost: string;
    price_regular: string;
    price_sale: string;
    stock: number;
}
