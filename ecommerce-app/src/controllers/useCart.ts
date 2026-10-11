import {useMutation, useQuery, useQueryClient,} from "@tanstack/react-query";
import { cartService, getOrderTrackStatuses, trackOrder } from "../services/carts/cartService";
import type { AddToCartPayload, UpdateCartItemPayload} from "../types/cartTypes";
import type { CheckoutFormType } from "../validations/checkoutSchema";
import { orderService } from "../services/orders/orderServices";

export const CART_QUERY_KEYS = {
  all: ["cart"] as const,
  me: () => [...CART_QUERY_KEYS.all, "me"] as const,
  summary: () => [...CART_QUERY_KEYS.all, "summary"] as const,
};
export const useCart = () => {
  return useQuery({
    queryKey: CART_QUERY_KEYS.me(),
    queryFn: cartService.getCart,
    staleTime: 1000 * 60 * 10, 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
export const useCartSummary = () => {
  return useQuery({
    queryKey: CART_QUERY_KEYS.summary(),
    queryFn: cartService.getSummary,
  });
};
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddToCartPayload) => cartService.addItem(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEYS.me(), data);
      queryClient.invalidateQueries({queryKey: CART_QUERY_KEYS.summary()});
    },
  });
};
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: string;
      payload: UpdateCartItemPayload;
    }) => cartService.updateItem(itemId, payload),

    onSuccess: (data) => {
      queryClient.setQueryData(
        CART_QUERY_KEYS.me(),
        data
      );

      queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEYS.summary(),
      });
    },
  });
};
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => cartService.removeItem(itemId),
    onSuccess: (data) => {
      queryClient.setQueryData(CART_QUERY_KEYS.me(), data);
      queryClient.invalidateQueries({queryKey: CART_QUERY_KEYS.summary()});
    },
  });
};
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartService.clear,

    onSuccess: (data) => {
      queryClient.setQueryData(
        CART_QUERY_KEYS.me(),
        data
      );

      queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEYS.summary(),
      });
    },
  });
};


export const useCheckout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CheckoutFormType) => orderService.checkout(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: CART_QUERY_KEYS.me(),
            });
            queryClient.invalidateQueries({
                queryKey: CART_QUERY_KEYS.summary(),
            });
        },
    });
};
export const useInvoicePdf = (invoiceId: string) => {
    return useQuery({
        queryKey: ["invoice-pdf", invoiceId],
        queryFn: () => orderService.getInvoicePdf(invoiceId),
        enabled: !!invoiceId,
    });
};
export const useTrackOrder = (orderCode: string) => {
    return useQuery({
        queryKey: ["track-order", orderCode],
        queryFn: () => trackOrder(orderCode),
        enabled: Boolean(orderCode),
        retry: false,
    });
};
export const useOrderTrackStatuses = () => {
    return useQuery({
        queryKey: ["order-track-statuses"],
        queryFn: getOrderTrackStatuses,
        staleTime: 1000 * 60 * 30,
    });
};