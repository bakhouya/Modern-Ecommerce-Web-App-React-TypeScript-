



/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { BrandForCreate, BrandService, PublicBrands } from '../services/catalogs/BrandService';
import type { BrandApiPaginatedResponse, BrandFilterTypes, BrandFormData, BrandTypes } from '../types/brandTypes';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createBrandsHooks = (t: TFunction) => {
    return createCrudHooks<BrandApiPaginatedResponse<BrandTypes>, BrandFormData, BrandFilterTypes >({
        service: BrandService,
        queryKey: 'brands',
        t,
    });
};
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const useBrandForCreate = () => {
  return useQuery({
      queryKey: ['brandsCreate', 'list'],
      queryFn: BrandForCreate,
      staleTime: 5 * 60 * 1000,
      placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/



/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const usePublicBrand = () => {
  return useQuery({
      queryKey: ['brandsCreate', 'list'],
      queryFn: PublicBrands,
      staleTime: 5 * 60 * 1000,
      placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/
