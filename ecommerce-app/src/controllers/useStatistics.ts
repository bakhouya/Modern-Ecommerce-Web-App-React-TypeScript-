

// import { useQuery } from "@tanstack/react-query";
// import { getVisitorMapLocations } from "../services/dashboard/statisticsService";

// export const visitorMapQueryKey = ["visitor-map", "locations"] as const;

// export const useVisitorMapQuery = () => {
//     return useQuery({
//         queryKey: visitorMapQueryKey,
//         queryFn: getVisitorMapLocations,
//         staleTime: 5 * 60 * 1000,
//         gcTime: 30 * 60 * 1000,
//         refetchOnWindowFocus: false,
//     });
// };

import { useQuery } from "@tanstack/react-query";

import { getStoreStatistics, getOrderStatistics, getFinancialStatistics, getCustomerVisitorStatistics, getVisitorMapLocations} from "../services/dashboard/statisticsService";



export const storeStatisticsQueryKey = ["statistics", "store"] as const;
export const orderStatisticsQueryKey = ["statistics", "orders"] as const;
export const financialStatisticsQueryKey = ["statistics", "financial"] as const;
export const customerVisitorStatisticsQueryKey = ["statistics", "customers-visitors"] as const;
export const visitorMapQueryKey = ["visitor-map", "locations"] as const;


const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnWindowFocus: false,
} as const;


export const useStoreStatisticsQuery = () => {
  return useQuery({
    queryKey: storeStatisticsQueryKey,
    queryFn: getStoreStatistics,
    ...defaultQueryOptions,
  });
};
export const useOrderStatisticsQuery = () => {
  return useQuery({
    queryKey: orderStatisticsQueryKey,
    queryFn: getOrderStatistics,
    ...defaultQueryOptions,
  });
};
export const useFinancialStatisticsQuery = () => {
  return useQuery({
    queryKey: financialStatisticsQueryKey,
    queryFn: getFinancialStatistics,
    ...defaultQueryOptions,
  });
};
export const useCustomerVisitorStatisticsQuery = () => {
  return useQuery({
    queryKey: customerVisitorStatisticsQueryKey,
    queryFn: getCustomerVisitorStatistics,
    ...defaultQueryOptions,
  });
};
export const useVisitorMapQuery = () => {
  return useQuery({
    queryKey: visitorMapQueryKey,
    queryFn: getVisitorMapLocations,
    ...defaultQueryOptions,
  });
};

