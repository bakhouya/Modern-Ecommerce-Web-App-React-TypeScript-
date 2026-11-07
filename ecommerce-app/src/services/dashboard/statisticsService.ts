


import api from "../axiosInstance";
import type { StoreStatisticsResponse, OrderStatisticsResponse, FinancialStatisticsResponse, CustomerVisitorStatisticsResponse, VisitorMapResponse,} from "../../types/statisticsTypes";

// ============================================================
// Endpoints
// ============================================================

export const STORE_STATISTICS_ENDPOINT = "panel/state/statistics/";
export const ORDER_STATISTICS_ENDPOINT = "panel/statistics/orders/";
export const FINANCIAL_STATISTICS_ENDPOINT = "panel/statistics/financial/";
export const CUSTOMER_VISITOR_STATISTICS_ENDPOINT = "panel/statistics/customers-visitors/";
export const VISITOR_MAP_ENDPOINT = "panel/locations/map/visitors/";

// ============================================================
// API calls
// ============================================================

export const getStoreStatistics = async (): Promise<StoreStatisticsResponse> => {
    const { data } = await api.get<StoreStatisticsResponse>(STORE_STATISTICS_ENDPOINT);
    return data;
};

export const getOrderStatistics = async (): Promise<OrderStatisticsResponse> => {
    const { data } = await api.get<OrderStatisticsResponse>(ORDER_STATISTICS_ENDPOINT);
    return data;
};

export const getFinancialStatistics = async (): Promise<FinancialStatisticsResponse> => {
    const { data } = await api.get<FinancialStatisticsResponse>(FINANCIAL_STATISTICS_ENDPOINT);
    return data;
};

export const getCustomerVisitorStatistics = async (): Promise<CustomerVisitorStatisticsResponse> => {
    const { data } = await api.get<CustomerVisitorStatisticsResponse>(CUSTOMER_VISITOR_STATISTICS_ENDPOINT);
    return data;
};


export const getVisitorMapLocations = async (): Promise<VisitorMapResponse> => {
  const { data } = await api.get<VisitorMapResponse>(VISITOR_MAP_ENDPOINT);
  return data;
};




