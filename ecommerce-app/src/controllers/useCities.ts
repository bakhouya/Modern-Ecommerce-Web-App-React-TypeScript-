


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { useQuery } from '@tanstack/react-query';
import { ActiveCitiesService, cityService } from '../services/settings/cityService';
import type { CityFormData, CityParamsFilterTypes, ApiPaginatedResponse, CityTypes } from '../types/cityTypes';
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createCityHooks = (t: TFunction) => {
  return createCrudHooks<ApiPaginatedResponse<CityTypes>, CityFormData, CityParamsFilterTypes >({
    service: cityService,
    queryKey: 'cities',
    t,
  });
};
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const useActiveCities = () => {
  return useQuery({
      queryKey: ['activeCities', 'list'],
      queryFn: ActiveCitiesService,
      placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/
