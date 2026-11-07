


import type { OrderDetails, OrdersResponse, OrderStatus } from "../../types/ordersTyes";
import api from "../axiosInstance";


export const orderService = {
  getStatuses: async (): Promise<OrderStatus[]> => {
    const response = await api.get<OrderStatus[]>("panel/statuses/");
    return response.data;
  },


  getOrders: async (params?: Record<string, unknown>): Promise<OrdersResponse> => {
    const response = await api.get<OrdersResponse>("panel/orders/", { params });
    return response.data;
  },

  getOrderById: async (id: string): Promise<OrderDetails> => {
    const response = await api.get<OrderDetails>(`panel/orders/${id}/`);
    return response.data;
  },

  deleteOrderProduct: async (id: string) => {
    const response = await api.delete(`panel/order/products/${id}/delete/`);
    return response.data;
  },

  deleteOrderVariant: async (id: string) => {
    const response = await api.delete(`panel/order/variants/${id}/delete/`);
    return response.data;
  },

  updateVariantQuantity: async (id: string, quantity: number) => {
    const response = await api.patch(`panel/order/variants/${id}/quantity/`, {quantity});
    return response.data;
  },

  assignDelivery: async (orderId: string, deliveryId: string) => {
    const response = await api.post(`panel/per/orders/${orderId}/assign-delivery/`, { delivery_id: deliveryId });
    return response.data;
  },

  changeOrderStatus: async (orderId: string, statusId: string) => {
    const response = await api.post(`panel/per/orders/${orderId}/change-status/`, { status_id: statusId });
    return response.data;
  },

  getInvoicePdf: async (invoiceId: string) => {
    const response = await api.get(`panel/order-invoices/${invoiceId}/pdf/`, {responseType: "blob"});
    return response.data;
  },
};




