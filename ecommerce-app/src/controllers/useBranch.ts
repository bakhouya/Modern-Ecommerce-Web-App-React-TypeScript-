

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import type { BranchApiPaginatedResponse, BranchFilterTypes, BranchFormData, BranchTypes } from '../types/branchTypes';
import { ActiveBranchesService, BranchService } from '../services/locations/BranchService';
import { useQuery } from '@tanstack/react-query';
/* ---------------------------------------------------------------------------------*/

// 
/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createBranchsHooks = (t: TFunction) => {
    return createCrudHooks<BranchApiPaginatedResponse<BranchTypes>, BranchFormData, BranchFilterTypes >({
        service: BranchService,
        queryKey: 'branches',
        t,
    });
};
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const useActiveBranches = () => {
  return useQuery({
      queryKey: ['activeBranches', 'list'],
      queryFn: ActiveBranchesService,
      placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/


