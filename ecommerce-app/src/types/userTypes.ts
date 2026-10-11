import type { PaginationTypes } from "./basicTypes";
import type { BranchRolationsTypes } from "./branchTypes";
import type { CityTypeRelations } from "./cityTypes";
import type { GroupTypes } from "./RolesTypes";




export interface UserTypes {
    id              : string;
    username        : string;
    email           : string;
    password        : string;
    full_name       : string;
    phone           : string;
    date_joined     : string;        
    last_login      : string | null ;
    is_superuser    : boolean;
    is_staff        : boolean;
    is_active       : boolean;
    is_on_duty      : boolean;
    is_busy         : boolean;
    address         : string;
    avatar          : string | null;
    can_view_all_branches: boolean;
    user_groups     : GroupTypes[];   
    user_branches   : BranchRolationsTypes[]; 
    user_city       : CityTypeRelations | null; 
}

export interface UsersResponseTypes<T> {
    pagination    : PaginationTypes;
    results       : T[];
}

export type UserFormData = FormData;  

export interface UserFilterTypes {
    page?       : number;
    full_name?  : string;                  
    email?      : string;                  
    phone?      : string;                  
    address?    : string;                  
    is_active?  : string | boolean | null;  
    is_staff?   :  string | boolean | null;  
    is_superuser?:  string | boolean | null;  
    can_view_all_branches?: string | boolean | null;  
    is_on_duty?: string | boolean | null;  
    is_busy?: string | boolean | null;  
    
    city_id?    : string | null ;
    branch_id?  : string | null;
    group_id?   : number | null ;
}

