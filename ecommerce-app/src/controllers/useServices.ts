



/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import type { ServiceApiPaginatedResponse, ServiceFormData, ServiceFilterTypes, ServiceTypes} from '../types/serviceTypes';
import { PublicServices, ServicesService } from '../services/settings/ServicesService';
import { useQuery } from '@tanstack/react-query';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createServicesHooks = (t: TFunction) => {
  return createCrudHooks<ServiceApiPaginatedResponse<ServiceTypes>, ServiceFormData, ServiceFilterTypes >({
    service: ServicesService,
    queryKey: 'services',
    t,
  });
};
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const usePublicServices = () => {
  return useQuery({
    queryKey: ['publicServices', 'list'],
    queryFn: PublicServices,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/
