


import type { TrackVisitorResponse } from '../../types/visitorsTypes';
import type { VisitorFilterTypes, VisitorsResponseTypes } from '../../types/visitorTypes';
import api from '../axiosInstance';
import { StoreApi } from '../storeApi';

const BASE_URL = '/panel/visitors/';  

export const VisitorService = {
    async getAll(params?: VisitorFilterTypes): Promise<VisitorsResponseTypes> {
        const response = await api.get<VisitorsResponseTypes>(BASE_URL, { params });
        return response.data ;
    },
};


export const TrackvisitorService = {


  validate: async (visitorId: string): Promise<boolean> => {
      const response = await StoreApi.post<{ exists: boolean }>("public/validate-visitor/", { visitor_id: visitorId });
      return response.data.exists;
  },



  track: async (visitorId?: string): Promise<TrackVisitorResponse> => {
    const response = await StoreApi.get<TrackVisitorResponse>("public/track/", {
        params: visitorId ? { visitor_id: visitorId } : {},
    });

    return response.data;
  },


};




