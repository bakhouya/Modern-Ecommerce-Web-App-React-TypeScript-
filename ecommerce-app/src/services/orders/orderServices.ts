
import type {CheckoutResponse} from "../../types/cartTypes";
import type { CheckoutFormType } from "../../validations/checkoutSchema";
import api from "../axiosInstance";

export const orderService = {

    checkout: async (data: CheckoutFormType): Promise<CheckoutResponse> => {
        const response = await api.post<CheckoutResponse>("public/orders/checkout/", data);
        return response.data;
    },

    getInvoicePdf: async (invoiceId: string) => {
        const response = await api.get(`panel/order-invoices/${invoiceId}/pdf/`, {responseType: "blob"});
        return response.data;
    }

};




