
import { z } from "zod";

// -------------------------------------------------------------------------------------------------------

const urlSchema = z.string().url("URL invalide").optional();
const phoneSchema = z.string().regex(/^(\+212|0)[6-7][0-9]{8}$/, "Numéro de téléphone marocain invalide").optional();
const emailSchema = z.string().email("Adresse email invalide").optional();

const textSchema = z.string().min(2, "Minimum 2 caractères").optional();

// -------------------------------------------------------------------------------------------------------


export const UpdateSettingsTextSchema = z.object({
    title: textSchema,
    description: textSchema,

    email: emailSchema,
    phone: phoneSchema,
    website: urlSchema,

    address: z.string().min(5, "Adresse invalide").optional(),
    currency_code: z.string().length(3, "Code devise invalide").optional(),
    currency_symbol: z.string().min(1).max(5).optional(),

    facebook_url: urlSchema,
    x_url: urlSchema,
    instagram_url: urlSchema,
    whatsapp_url: urlSchema,
    tiktok_url: urlSchema,
    telegram_url: urlSchema,

    meta_title: z.string().min(5).max(70).optional(),
    meta_description: z.string().min(10).max(160).optional(),
    meta_keywords: z.string().optional(),

    google_analytics: z.string().startsWith("G-").optional(),
    facebook_pixel: z.string().regex(/^\d+$/).optional(),
    tiktok_pixel: z.string().optional(),

    company_legal_status: z.string().min(3).optional(),
    ice_number: z.string().regex(/^\d{15}$/).optional(),
    if_number: z.string().regex(/^\d{9}$/).optional(),
    rc_number: z.string().regex(/^\d+$/).optional(),
    patente: z.string().regex(/^\d{10,15}$/).optional(),
});
export type UpdateSettingsTextType = z.infer<typeof UpdateSettingsTextSchema>;

// -------------------------------------------------------------------------------------------------------

export const UpdateSettingsCheckboxSchema = z.object({maintenance: z.boolean(),});
export type UpdateSettingsCheckboxType = z.infer<typeof UpdateSettingsCheckboxSchema>;

// -------------------------------------------------------------------------------------------------------

export const UpdateSettingsFileSchema = z.object({
    logo: z.instanceof(File).optional(),
    icon: z.instanceof(File).optional(),
});
export type UpdateSettingsFileType = z.infer<typeof UpdateSettingsFileSchema>;





export const OrderInvoicesSettingTextSchema = z.object({
    title: textSchema,
    footer_message: textSchema,
});
export type OrderInvoicesSettingTextType = z.infer<typeof OrderInvoicesSettingTextSchema>;

export const OrderInvoicesSettingCheckboxSchema = z.object(
    {
        show_logo: z.boolean(),
        show_company_name: z.boolean(),
        show_company_address: z.boolean(),
        show_company_phone: z.boolean(),
        show_company_email: z.boolean(),
        show_order_number: z.boolean(),
        show_order_date: z.boolean(),
        show_customer_name: z.boolean(),
        show_customer_phone: z.boolean(),
        show_shipping_address: z.boolean(),
        show_customer_city: z.boolean(),
        show_payment_method: z.boolean(),
        show_status: z.boolean(),
        show_subtotal: z.boolean(),
        show_shipping_cost: z.boolean(),
        show_discount: z.boolean(),
        show_total: z.boolean(),
        show_footer: z.boolean(),
    }
);
export type OrderInvoicesSettingsCheckboxType = z.infer<typeof OrderInvoicesSettingCheckboxSchema>;







    