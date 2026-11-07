

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { OrderDetails, OrdersResponse, OrderStatus } from "../types/ordersTyes";
import { orderService } from "../services/orders/orderServices";


// ==================== QUERY KEYS ====================
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) =>
    [...orderKeys.lists(), params] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  statuses: () => [...orderKeys.all, "statuses"] as const,
};

// ==================== STATUSES HOOKS ====================
export const useStatuses = () => {
  return useQuery<OrderStatus[]>({
    queryKey: orderKeys.statuses(),
    queryFn: () => orderService.getStatuses(),
    staleTime: 1000 * 60 * 10, 
    gcTime: 1000 * 60 * 30,
  });
};

// ==================== ORDERS LIST HOOKS ====================
export const useOrders = (params?: Record<string, unknown>) => {
  return useQuery<OrdersResponse>({
    queryKey: orderKeys.list(params),
    queryFn: () => orderService.getOrders(params),
    staleTime: 1000 * 30, // 30s
    gcTime: 1000 * 60 * 5,
    placeholderData: (prev: OrdersResponse | undefined) => prev, 
  });
};

// ==================== ORDER DETAILS HOOKS ====================
export const useOrderDetails = (id: string | undefined) => {
  return useQuery<OrderDetails>({
    queryKey: orderKeys.detail(id!),
    queryFn: () => orderService.getOrderById(id!),
    enabled: !!id,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
  });
};

// ==================== MUTATIONS ====================

// Delete order product
export const useDeleteOrderProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => orderService.deleteOrderProduct(id),
    onSuccess: (_data) => {
      qc.invalidateQueries({ queryKey: orderKeys.lists() });
      qc.invalidateQueries({ queryKey: orderKeys.details() });
    },
  });
};

// Delete order variant
export const useDeleteOrderVariant = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => orderService.deleteOrderVariant(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: orderKeys.details() });
      qc.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
};

// Update variant quantity
export const useUpdateVariantQuantity = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      orderService.updateVariantQuantity(id, quantity),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: orderKeys.details() });
      qc.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
};

// Assign delivery
export const useAssignDelivery = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      deliveryId,
    }: {
      orderId: string;
      deliveryId: string;
    }) => orderService.assignDelivery(orderId, deliveryId),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: orderKeys.detail(vars.orderId) });
      qc.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
};

// Change order status
export const useChangeOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      statusId,
    }: {
      orderId: string;
      statusId: string;
    }) => orderService.changeOrderStatus(orderId, statusId),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: orderKeys.detail(vars.orderId) });
      qc.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
};

