



import type { PaginationTypes } from "./basicTypes";


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface CouponFilterTypes {
    page            : number;
    code?           : string;
    address?        : string;
    status?         : boolean | null | string ;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface CouponTypes {
    id                  : string ;
    code                : string ;
    discount_percentage : string ;
    max_uses            : number ;
    used_count          : number ;
    minimum_cart_total  : string ;
    start_date          : string ;
    end_date            : string ;
    status              : boolean;

    created_at          : string;
    updated_at          : string;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface CouponFormData {
    code                : string ;
    discount_percentage : string ;
    max_uses            : number ;
    // used_count          : number ;
    minimum_cart_total  : string ;
    start_date          : string ;
    end_date            : string;
    status              : boolean;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface CouponApiPaginatedResponse<T> {
    pagination  : PaginationTypes ;
    results     : T[];
}
/* ---------------------------------------------------------------------------------*/










