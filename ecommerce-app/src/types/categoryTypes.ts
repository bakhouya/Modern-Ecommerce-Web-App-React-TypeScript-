



import type { CategorySimpleTypes, PaginationTypes } from "./basicTypes";



/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface CategoryFilterTypes {
    page        : number;
    title?      : string;
    description?: string;
    type?       : string;
    status?         : boolean | null | string ;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface CategoryTypes {
    id            : string;
    title         : string;
    slug          : string;
    description   : string,
    image         : string,
    status        : boolean;
    parent_details: CategorySimpleTypes ;

    created_at    : string;
    updated_at    : string;
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export type CategoryFormData = FormData;
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface CategoryApiPaginatedResponse<T> {
  pagination: PaginationTypes;
  results: T[];
}
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface CategoryPrentForCreateTypes {
    id      : string;
    title   : string;
    image   : string | null;
    children: CategorySimpleTypes[];
}
/* ---------------------------------------------------------------------------------*/




/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export interface ChildrenCategoriesTypes {
    id            : string;
    title         : string;
    slug          : string;
    description   : string,
    image         : string,
    status        : boolean;
    created_at    : string;
    updated_at    : string;
}
export interface CategoryTypesParents {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    status: boolean;
    created_at?: string;
    updated_at?: string;
    children: ChildrenCategoriesTypes[];
}
/* ---------------------------------------------------------------------------------*/




