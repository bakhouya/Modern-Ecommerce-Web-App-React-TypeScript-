




/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import api from '../axiosInstance';
import type { 
    CategoryApiPaginatedResponse, CategoryFilterTypes, CategoryFormData, 
    CategoryPrentForCreateTypes, CategoryTypes, 
    CategoryTypesParents
} from '../../types/categoryTypes';
import { StoreApi } from '../storeApi';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
const BASE_URL = '/panel/categories/' ;
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const CategoryService = {
    /* -----------------------------------------------------------------------------*/
    /* -----------------------------------------------------------------------------*/
    async getAll(params?: CategoryFilterTypes): Promise<CategoryApiPaginatedResponse<CategoryTypes>> {
      const response = await api.get<CategoryApiPaginatedResponse<CategoryTypes>>(BASE_URL, { params });
      return response.data; 
    },
    /* -----------------------------------------------------------------------------*/
    
    /* -----------------------------------------------------------------------------*/
    /* -----------------------------------------------------------------------------*/
    async create(data: CategoryFormData): Promise<CategoryTypes> {
        const response = await api.post<CategoryTypes>(BASE_URL, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    /* -----------------------------------------------------------------------------*/

    /* -----------------------------------------------------------------------------*/
    /* -----------------------------------------------------------------------------*/
    async update(id: string | number, data: CategoryFormData): Promise<CategoryTypes> {
        const response = await api.put<CategoryTypes>(`${BASE_URL}${id}/`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    /* -----------------------------------------------------------------------------*/

    /* -----------------------------------------------------------------------------*/
    /* -----------------------------------------------------------------------------*/
    async delete(id: string | number): Promise<void> {
      await api.delete(`${BASE_URL}${id}/`);
    },
    /* -----------------------------------------------------------------------------*/

    /* -----------------------------------------------------------------------------*/
    /* -----------------------------------------------------------------------------*/
    async bulkDelete(ids: (string | number)[]): Promise<void> {
      await api.delete(`${BASE_URL}bulk-delete/`, { data: { ids } });
    },
    /* -----------------------------------------------------------------------------*/


};
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const CategoryParentForCreate = async (): Promise<CategoryPrentForCreateTypes[]> => {
    const response = await api.get('/panel/categories/list/for-create/');
    return response.data ;
};
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const PublicCategory = async (): Promise<CategoryTypes[]> => {
    const response = await StoreApi.get('/public/categories/', {params: {has_parent: true}});
    return response.data ;
};
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const PublicCategoryParents = async (): Promise<CategoryTypesParents[]> => {
    const response = await StoreApi.get('/public/categories/parent/');
    return response.data ;
};
/* ---------------------------------------------------------------------------------*/

