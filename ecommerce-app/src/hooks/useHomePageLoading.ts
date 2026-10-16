


import { usePublicSliders } from '../controllers/useSlider';
import { usePublicOffers } from '../controllers/useOffer';
import { useHomePageProducts } from '../controllers/usePublicProducts';
import { usePublicServices } from '../controllers/useServices';

export const usePageLoading = () => {

    const { data: sliders, isLoading: slidersLoading, error: slidersError } = usePublicSliders();
    const { data: offers, isLoading: offersLoading, error: offersError } = usePublicOffers();
    const { data: homePageProducts, isLoading: homePageProductsLoading, error: homePageProductsError } = useHomePageProducts();
    const { data: homePageServices, isLoading: homePageServicesLoading, error: homePageServicesError } = usePublicServices();

    const isLoading = slidersLoading || offersLoading || homePageProductsLoading || homePageServicesLoading;
    const error     = slidersError || offersError || homePageProductsError || homePageServicesError;
    const isReady   = !isLoading && !error ;


  return {

      sliders: sliders || [],
      offers: offers || [], 
      homePageProducts: homePageProducts || [], 
      homePageServices: homePageServices || [], 
      isLoading,  error, isReady

    };


};