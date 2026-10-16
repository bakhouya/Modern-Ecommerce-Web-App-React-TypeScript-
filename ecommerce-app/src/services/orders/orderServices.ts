

import api from "../axiosInstance";

export const orderService = {

    getInvoicePdf: async (invoiceId: string) => {
        const response = await api.get(`panel/order-invoices/${invoiceId}/pdf/`, {responseType: "blob"});
        return response.data;
    }

};




