

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
// import { useQuery } from '@tanstack/react-query';
import { OfferService, PublicOffers } from '../services/marketings/offerServices';
import type { OfferFilterTypes, OfferFormData, OfferPaginatedResponse } from '../types/offersTypes';
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


