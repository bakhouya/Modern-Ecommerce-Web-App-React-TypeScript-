



/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import type { CategoryApiPaginatedResponse, CategoryFilterTypes, CategoryFormData, CategoryTypes } from '../types/categoryTypes';
import { CategoryParentForCreate, CategoryService, PublicCategory, PublicCategoryParents } from '../services/catalogs/CategoryService';
import { useQuery } from '@tanstack/react-query';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createCategorysHooks = (t: TFunction) => {
    return createCrudHooks<CategoryApiPaginatedResponse<CategoryTypes>, CategoryFormData, CategoryFilterTypes >({
        service: CategoryService,
        queryKey: 'categories',
        t,
    });
};
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const useCategoryParent = () => {
  return useQuery({
      queryKey: ['categoryParent', 'list'],
      queryFn: CategoryParentForCreate,
      placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const usePublicCategory = () => {
  return useQuery({
    queryKey: ['publiccategory', 'list'],
    queryFn: PublicCategory,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const usePublicCategoryParents = () => {
  return useQuery({
    queryKey: ['publiccategoryParents', 'list'],
    queryFn: PublicCategoryParents,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/

