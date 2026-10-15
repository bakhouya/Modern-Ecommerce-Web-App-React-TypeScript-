

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
// import { useQuery } from '@tanstack/react-query';
import { GetPoductsOffer, OfferService, PublicOffers } from '../services/marketings/offerServices';
import type { OfferFilterTypes, OfferFormData, OfferPaginatedResponse, OfferWithPrudctsTypes } from '../types/offersTypes';
import { useQuery } from '@tanstack/react-query';
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createOffersHooks = (t: TFunction) => {
    return createCrudHooks<OfferPaginatedResponse, OfferFormData, OfferFilterTypes >({
        service: OfferService,
        queryKey: 'offers',
        t,
    });
};
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const useOffer = (id: string) => {
  return useQuery({
    queryKey: ['offer', id],
    queryFn: () => OfferService.edit(id),
    enabled: !!id,
  });
};
/* ---------------------------------------------------------------------------------*/






/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const usePublicOffers = () => {
  return useQuery({
      queryKey: ['publicOffers', 'list'],
      queryFn: PublicOffers,
      placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/

/* ----------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------*/
export const useProductsOffer = (id?: string) => {
  return useQuery<OfferWithPrudctsTypes>({
    queryKey: ["products-Offer", id],
    queryFn: () => GetPoductsOffer(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: (prev) => prev,
  });
};
/* ----------------------------------------------------------------------------------*/

