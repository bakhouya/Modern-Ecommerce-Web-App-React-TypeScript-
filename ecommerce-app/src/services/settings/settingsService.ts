
import type { OrderInvoicesSettings, SettingsTypes } from '../../types/settingsTypes';
import api from '../axiosInstance';



export const fetchPublicSettings = async (): Promise<SettingsTypes> => {
    const { data } = await api.get<SettingsTypes>('/public/settings/platform/');
    return data ;
};
export const UpdateSettingPlatform = async (data: FormData) => {
    return api.put('/panel/settings/platform/', data, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
};




export const fetchOrderInvoiceSettings = async (): Promise<OrderInvoicesSettings> => {
    const { data } = await api.get<OrderInvoicesSettings>('/panel/settings/resu-commande/');
    return data ;
};
export const UpdateOrderInvoiceSettings = async (data: Partial<OrderInvoicesSettings>) => {
    const response = await api.put('/panel/settings/resu-commande/', data);
    return response.data ;
};



