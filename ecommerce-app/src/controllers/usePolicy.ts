
/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import { useQuery } from "@tanstack/react-query";
import type { PolicyApiPaginatedResponse, PolicyFormData, PolicyParamsFilterTypes, PolicyTypes } from '../types/policyTypes';
import { getPublicPolicies, policyService } from '../services/settings/policyService';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createPolicyHooks = (t: TFunction) => {
  return createCrudHooks<PolicyApiPaginatedResponse<PolicyTypes>, PolicyFormData, PolicyParamsFilterTypes >({
    service: policyService,
    queryKey: 'policies',
    t,
  });
};
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const usePoliciesPublic = () => {
  return useQuery({
    queryKey: ["public", "policies"],
    queryFn: getPublicPolicies,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
/* ---------------------------------------------------------------------------------*/

