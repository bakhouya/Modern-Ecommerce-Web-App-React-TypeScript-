



/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { createCrudHooks } from './CrudController';
import type { TFunction } from 'i18next';
import { useQuery } from '@tanstack/react-query';

import { PublicSliderService, SliderService } from '../services/marketings/SliderServices';
import type { SliderApiPaginatedResponse, SliderFilterTypes, SliderFormData, SliderTypes } from '../types/sliderTypes';
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const createSliderssHooks = (t: TFunction) => {
    return createCrudHooks<SliderApiPaginatedResponse<SliderTypes>, SliderFormData, SliderFilterTypes >({
        service: SliderService,
        queryKey: 'sliders',
        t,
    });
};
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const usePublicSliders = () => {
  return useQuery({
      queryKey: ['publicSliders', 'list'],
      queryFn: PublicSliderService,
      placeholderData: (previousData) => previousData,
  });
};
/* ---------------------------------------------------------------------------------*/


