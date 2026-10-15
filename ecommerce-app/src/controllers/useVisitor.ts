

import { useQuery } from '@tanstack/react-query';
import { VisitorService } from '../services/visitors/VisitorService';
import type { VisitorFilterTypes, VisitorsResponseTypes } from '../types/visitorTypes';

export const createVisitorHooks = () => {
    const queryKey = 'visitors';
    const useAll = (params?: VisitorFilterTypes) => {
        return useQuery<VisitorsResponseTypes>({
            queryKey: [queryKey, params],
            queryFn: () => VisitorService.getAll(params),
            // keepPreviousData: true ,
        });
    };



    return {useAll};
};