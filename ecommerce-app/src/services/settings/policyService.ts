

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import api from '../axiosInstance';
import type { PoliciesResponse, PolicyApiPaginatedResponse, PolicyFormData, PolicyParamsFilterTypes, PolicyTypes} from '../../types/policyTypes';
import { StoreApi } from '../storeApi';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
const BASE_URL = '/panel/policies/';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const policyService = {
    /* -----------------------------------------------------------------------------*/
    /* -----------------------------------------------------------------------------*/
    async getAll(params?: PolicyParamsFilterTypes): Promise<PolicyApiPaginatedResponse<PolicyTypes>> {
      const response = await api.get<PolicyApiPaginatedResponse<PolicyTypes>>(BASE_URL, { params });
      return response.data; 
    },
    /* -----------------------------------------------------------------------------*/
    
    /* -----------------------------------------------------------------------------*/
    /* -----------------------------------------------------------------------------*/
    async create(data: PolicyFormData): Promise<PolicyTypes> {
      const response = await api.post<PolicyTypes>(BASE_URL, data);
      return response.data;
    },
    /* -----------------------------------------------------------------------------*/

    /* -----------------------------------------------------------------------------*/
    /* -----------------------------------------------------------------------------*/
    async update(id: string | number, data: PolicyFormData): Promise<PolicyTypes> {
      const response = await api.put<PolicyTypes>(`${BASE_URL}${id}/`, data);
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

export const getPublicPolicies = async (): Promise<PolicyTypes[]> => {
  const response = await StoreApi.get<PoliciesResponse>("/public/policies/");
  const data = response.data as | PolicyTypes[] | { results: PolicyTypes[] };
  const policies = Array.isArray(data) ? data : data.results;
  return policies.filter((policy) => policy.status);
};

