

export interface ApiErrorWriteTypes {
    errors?: Record<string, string[]>;  
    message?: string;
}

export interface PaginationTypes {
    count       : number ;
    total_pages : number ;
    current_page: number ;
    page_size   : number ;
    next        : string ;
    previous    : string ;

}

export interface CategorySimpleTypes {
    id?     : string;
    title?  : string;
    image   : string,
}
