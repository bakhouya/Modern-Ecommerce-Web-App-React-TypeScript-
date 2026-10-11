

import type { ProductOffer } from '../../types/offersTypes';
import type { IApiProduct, IProductFilters, Product, ProductForCreate } from '../../types/productTypes';
import api from '../axiosInstance'; 
import { StoreApi } from '../storeApi';

const BASE_URL = '/panel/eligible-products/' ;

/* ----------------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------------*/
export const PublicProductService = {

    /* -----------------------------------------------------------------------------*/
    /* -----------------------------------------------------------------------------*/
    async getAll(): Promise<ProductForCreate[]> {
        const response = await api.get(BASE_URL);
        //   const response = await api.get('/public/cities/active/');
        return response.data ; 
    },
    /* -----------------------------------------------------------------------------*/

};
/* ----------------------------------------------------------------------------------*/







/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const PublicHomePageProductService = async (params?: IProductFilters): Promise<IApiProduct[]> => {
    const response = await StoreApi.get('/public/products/', { params });
    return response.data ;
};
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const PublicProductByIdService = async (id: string): Promise<Product> => {
  const response = await StoreApi.get(`/public/products/${id}/`);
  return response.data ;
};
/* ---------------------------------------------------------------------------------*/

export const PublicProductOffersService = async (productId: string): Promise<ProductOffer> => {
  const response = await StoreApi.get(`/public/offers/product/${productId}/`);
  return response.data;
};




