// ===============================================================================================
// search.types.ts
// Types for the search API response: GET /api/public/search/?q=<text>
// ===============================================================================================

// -----------------------------------------------------------------------------------------------
// PRODUCT (search result)
// - id is a UUID string (not a number)
// - prices are returned as strings by DRF DecimalField (e.g. "499.00"), and can be null
// - image is a full URL of the first product image, or null if the product has no image
// - brand / category are plain titles (strings), or null if missing
// -----------------------------------------------------------------------------------------------
export interface SearchProduct {
  id: string;
  title: string;
  description: string;
  price_regular: string | null;
  price_sale: string | null;
  stock: number | null;
  brand: string | null;
  category: string | null;
  image: string | null;
}

// -----------------------------------------------------------------------------------------------
// BRAND (search result)
// image is a full URL, or null if the brand has no image
// -----------------------------------------------------------------------------------------------
export interface SearchBrand {
  id: string;
  title: string;
  image: string | null;
}

// -----------------------------------------------------------------------------------------------
// CATEGORY (search result)
// image is a full URL, or null if the category has no image
// -----------------------------------------------------------------------------------------------
export interface SearchCategory {
  id: string;
  title: string;
  image: string | null;
}

// -----------------------------------------------------------------------------------------------
// FULL API RESPONSE
// -----------------------------------------------------------------------------------------------
export interface SearchResponse {
  query: string;
  products: SearchProduct[];
  brands: SearchBrand[];
  categories: SearchCategory[];
}