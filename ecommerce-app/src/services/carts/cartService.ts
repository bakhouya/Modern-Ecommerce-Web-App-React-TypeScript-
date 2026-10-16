
import type { AddToCartPayload, Cart, CartResponse, CartSummary, CheckoutResponse, OrderTrackingResponse, OrderTrackStatus, UpdateCartItemPayload} from "../../types/cartTypes";
import type { CheckoutFormType } from "../../validations/checkoutSchema";
import { initCsrf, StoreApi } from "../storeApi";



export const cartService = {

    getCart: async (): Promise<Cart> => {
        const response = await StoreApi.get<Cart>("public/cart/me/", {withCredentials: true});
        return response.data ;
    },

    getSummary: async (): Promise<CartSummary> => {
        // await initCsrf();
        const response = await StoreApi.get<CartSummary>("public/cart/summary/");
        return response.data;
    },

    addItem: async (payload: AddToCartPayload): Promise<CartResponse> => {
        await initCsrf();
        const response = await StoreApi.post<CartResponse>("public/cart/add/", payload, { withCredentials: true });
        return response.data;
    },

    updateItem: async (itemId: string, payload: UpdateCartItemPayload): Promise<Cart> => {
        await initCsrf();
        const response = await StoreApi.patch<Cart>(`public/cart/${itemId}/update/`, payload, {
            withCredentials: true,
        });
        return response.data;
    },

    removeItem: async (itemId: string): Promise<Cart> => {
        await initCsrf();
        const response = await StoreApi.delete<Cart>(`public/cart/${itemId}/remove/`, {withCredentials: true});
        return response.data;
    },

    clear: async (): Promise<CartResponse> => {
        await initCsrf();
        const response = await StoreApi.delete<CartResponse>("/cart/clear/", {withCredentials: true});
        return response.data;
    },

    checkout: async (data: CheckoutFormType): Promise<CheckoutResponse> => {
        await initCsrf();
        const response = await StoreApi.post<CheckoutResponse>("public/orders/checkout/", data, {
            withCredentials: true,
        });
        return response.data;
    },
    
};


export const trackOrder = async (orderCode: string): Promise<OrderTrackingResponse> => {
    await initCsrf();
    const response = await StoreApi.get<OrderTrackingResponse>("public/order/track/", {params: {track: orderCode}});
    return response.data;
};
export const getOrderTrackStatuses = async (): Promise<OrderTrackStatus[]> => {
    await initCsrf();
    const response = await StoreApi.get<OrderTrackStatus[]>("public/statuses/for-track/");
    return response.data;
};


