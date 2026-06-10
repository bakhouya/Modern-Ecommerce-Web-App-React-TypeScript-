

export interface SettingsTypes {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    logo: string;        
    icon: string;         
    email: string;
    phone: string;
    website: string;
    address: string;
    currency_code: string;
    currency_symbol: string;
    facebook_url: string;
    x_url: string;
    instagram_url: string;
    whatsapp_url: string;
    tiktok_url: string;
    telegram_url: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;   
    google_analytics: string;
    facebook_pixel: string;
    tiktok_pixel: string;
    company_legal_status: string;
    ice_number: string;
    if_number: string;
    rc_number: string;
    patente: string;
    maintenance: boolean;
}

export interface UpdateSettings {
    title?: string;
    description?: string;
    logo?: string;
    icon?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
    currency_code?: string;
    currency_symbol?: string;
    facebook_url?: string;
    x_url?: string;
    instagram_url?: string;
    whatsapp_url?: string;
    tiktok_url?: string;
    telegram_url?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    google_analytics?: string;
    facebook_pixel?: string;
    tiktok_pixel?: string;
    company_legal_status?: string;
    ice_number?: string;
    if_number?: string;
    rc_number?: string;
    patente?: string;
    maintenance?: boolean;
}

export interface OrderInvoicesSettings {
    title?: string;

    show_logo?: boolean;
    show_company_name?: boolean;
    show_company_address?: boolean;
    show_company_phone?: boolean;
    show_company_email?: boolean;

    show_order_number?: boolean;
    show_order_date?: boolean;
    show_payment_method?: boolean;
    show_status?: boolean;

    show_customer_name?: boolean;
    show_customer_phone?: boolean;
    show_shipping_address?: boolean;
    show_customer_city?: boolean;
    
    
    show_subtotal?: boolean;
    show_shipping_cost?: boolean;
    show_discount?: boolean;
    show_total?: boolean;

    show_footer?: boolean;
    footer_message?: string;
}


