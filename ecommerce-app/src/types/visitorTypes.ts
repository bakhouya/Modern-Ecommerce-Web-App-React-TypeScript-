
import type { PaginationTypes } from "./basicTypes";

export interface VisitTypes {
    id: string;
    created_at: string;       
    updated_at: string;
    page_url: string;          
    referrer: string;          
    date: string;              
    visitor: string;           
}

export interface VisitorTypes {
    id: string;
    visits: VisitTypes[];      
    visits_count: number;         
    session_key: string;       
    ip_address: string;           
    user_agent: string;      
    device_type: 'desktop' | 'mobile' | 'tablet' | string; 
    city: string;                
    country: string;            
    country_code: string;         
    latitude: number;         
    longitude: number;             
    created_at: string;            
}

export interface VisitorsResponseTypes {
        pagination  : PaginationTypes;
        results     : VisitorTypes[];
}

export interface VisitorFilterTypes {
    page?: number;
    device_type?: 'desktop' | 'mobile' | 'tablet' | string;
    city?: string;
    country?: string;
    ip_address?: string;
    date_from?: string;   
    date_to?: string;
    search?: string;      
}