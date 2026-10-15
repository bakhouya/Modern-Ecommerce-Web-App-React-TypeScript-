



import type { PaginationTypes } from "./basicTypes";


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface SupplierFilterTypes {
    page            : number;
    title?          : string;
    address?        : string;
    status?         : boolean | null | string ;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface SupplierTypes {
    id          : string;
    created_at  : string;
    updated_at  : string;
    title       : string;
    address     : string,
    phone       : string,
    web         : string,
    whatsapp    : string ,
    telegram    : string ,
    status      : boolean;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface SupplierFormData {
    title       : string;
    address     : string,
    phone       : string,
    web         : string,
    whatsapp    : string ,
    telegram    : string ,
    status      : boolean;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface SupplierApiPaginatedResponse<T> {
    pagination  : PaginationTypes ;
    results     : T[];
}
/* ---------------------------------------------------------------------------------*/










