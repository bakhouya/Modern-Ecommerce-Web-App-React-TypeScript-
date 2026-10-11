



import type { CategorySimpleTypes, PaginationTypes } from "./basicTypes";



/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface AttrValuesFilterTypes {
    page        : number;
    title?      : string;
    description?: string;
    type?       : string;
    categories? : string[];
    status?     : boolean | null | string ;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface AttrValuesTypes {
    id            : string;
    title         : string;
    slug          : string;
    description   : string,
    image         : string,
    status        : boolean;
    category_details : CategorySimpleTypes[] ;

    created_at    : string;
    updated_at    : string;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface AttrValuesFormData {
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
export interface AttrValuesApiPaginatedResponse<T> {
  pagination: PaginationTypes;
  results: T[];
}
/* ---------------------------------------------------------------------------------*/









