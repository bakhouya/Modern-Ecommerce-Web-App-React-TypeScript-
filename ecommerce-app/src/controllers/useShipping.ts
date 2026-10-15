

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import type { ShippingApiPaginatedResponse, ShippingFilterTypes, ShippingFormData, ShippingTypes } from '../types/shippingsTypes';
import { ShippingService } from '../services/locations/ShippingService';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createShippingsHooks = (t: TFunction) => {
    return createCrudHooks<ShippingApiPaginatedResponse<ShippingTypes>, ShippingFormData, ShippingFilterTypes >({
        service: ShippingService,
        queryKey: 'shippings',
        t,
    });
};
/* ---------------------------------------------------------------------------------*/



