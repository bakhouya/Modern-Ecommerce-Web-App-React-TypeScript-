



import type { PaginationTypes } from "./basicTypes";
import type { CityTypeRelations } from "./cityTypes";


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface BranchFilterTypes {
    page            : number;
    title?          : string;
    address?        : string;
    phone?          : string;
    city?           : boolean | null | string ;
    status?         : boolean | null | string ;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface BranchTypes{
    id          : string;
    title       : string;
    address     : string,
    phone       : string,
    status      : boolean;
    created_at  : string;
    updated_at  : string;
    branch_cities: CityTypeRelations[] ;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface BranchFormData {
    title       : string;
    address     : string,
    phone       : string,
    status      : boolean;
    cities      : string[] ;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface BranchApiPaginatedResponse<T> {
    pagination  : PaginationTypes ;
    results     : T[];
}
/* ---------------------------------------------------------------------------------*/



export interface BranchRolationsTypes{
    id          : string;
    title       : string;
}















