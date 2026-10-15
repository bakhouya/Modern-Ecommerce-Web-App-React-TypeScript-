

import type { 
    OrderInvoicesSettings, SettingsTypes, 
    SalesInvoiceSettings, SalesInvoiceSettingsUpdate,
    DeliveryInvoiceSettings, DeliveryInvoiceSettingsUpdate
} from '../../types/settingsTypes';
import api from '../axiosInstance';
import { StoreApi } from '../storeApi';




/*  ====================================================================================== */
// Platform Settings
/*  ====================================================================================== */
export const fetchPublicSettings = async (): Promise<SettingsTypes> => {
    const { data } = await StoreApi.get<SettingsTypes>('/public/settings/platform/');
    return data ;
};
export const UpdateSettingPlatform = async (data: FormData) => {
    return api.put('/panel/settings/platform/', data, {headers: {'Content-Type': 'multipart/form-data'}});
};
/*  ====================================================================================== */




/*  ====================================================================================== */
// Order Invoice Settings
/*  ====================================================================================== */
export const fetchOrderInvoiceSettings = async (): Promise<OrderInvoicesSettings> => {
    const { data } = await api.get<OrderInvoicesSettings>('/panel/settings/resu-commande/');
    return data ;
};
export const UpdateOrderInvoiceSettings = async (data: Partial<OrderInvoicesSettings>) => {
    const response = await api.put('/panel/settings/resu-commande/', data);
    return response.data ;
};
/*  ====================================================================================== */




/*  ====================================================================================== */
// Sales Invoice Settings
/*  ====================================================================================== */
export const fetchSalesInvoiceSettings = async (): Promise<SalesInvoiceSettings> => {
    const { data } = await api.get<SalesInvoiceSettings>('/panel/settings/sales-invoice/');
    return data ;
};
export const UpdateSalesInvoiceSettings = async (data: Partial<SalesInvoiceSettingsUpdate>) => {
    const response = await api.put('/panel/settings/sales-invoice/', data);
    return response.data ;
};
/*  ====================================================================================== */




/*  ====================================================================================== */
// Delivery Invoice Settings
/*  ====================================================================================== */
export const fetchDelivryInvoiceSettings = async (): Promise<DeliveryInvoiceSettings> => {
    const { data } = await api.get<DeliveryInvoiceSettings>('/panel/settings/delivery-invoice/');
    return data ;
};
export const UpdateDelivryInvoiceSettings = async (data: Partial<DeliveryInvoiceSettingsUpdate>) => {
    const response = await api.put('/panel/settings/delivery-invoice/', data);
    return response.data ;
};
/*  ====================================================================================== */
