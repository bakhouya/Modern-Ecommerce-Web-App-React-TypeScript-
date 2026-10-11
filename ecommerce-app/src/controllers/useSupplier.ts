


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import type { 
    SupplierApiPaginatedResponse, SupplierFilterTypes, SupplierFormData, SupplierTypes 
} from '../types/supplierTypes';
import { SupplierService } from '../services/locations/SupplierService';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createSupplierHooks = (t: TFunction) => {
    return createCrudHooks<SupplierApiPaginatedResponse<SupplierTypes>, SupplierFormData, SupplierFilterTypes >({
        service: SupplierService,
        queryKey: 'suppliers',
        t,
    });
};
/* ---------------------------------------------------------------------------------*/




