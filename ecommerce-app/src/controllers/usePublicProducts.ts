

import { useQuery } from '@tanstack/react-query';
import { PublicHomePageProductService, PublicProductByIdService, PublicProductOffersService, PublicProductService} from '../services/products/productServices';
import type { IApiProduct, IProductFilters, Product, ProductForCreate } from '../types/productTypes';
import type { ProductOffer } from '../types/offersTypes';


/* ----------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------*/
export const usePublicProducts = () => {
  return useQuery<ProductForCreate[]>({
    queryKey: ['public-products'],
    queryFn: () => PublicProductService.getAll(),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};
/* ----------------------------------------------------------------------------------*/


/* ----------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------*/
export const useHomePageProducts = (params?: IProductFilters) => {
  return useQuery<IApiProduct[]>({
    queryKey: ['homePageProducts', params],
    queryFn: () => PublicHomePageProductService(params),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: (previousData) => previousData,
  });
};
/* ----------------------------------------------------------------------------------*/

/* ----------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------*/
export const useProduct = (id?: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => PublicProductByIdService(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: (prev) => prev,
  });
};
/* ----------------------------------------------------------------------------------*/

/* ----------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------*/
export const useProductOffers = (productId?: string) => {
  return useQuery<ProductOffer>({
      queryKey: ["product-offers", productId],
      queryFn: () => PublicProductOffersService(productId!),
      enabled: !!productId,
      staleTime: 5 * 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
  });
};
/* ----------------------------------------------------------------------------------*/
