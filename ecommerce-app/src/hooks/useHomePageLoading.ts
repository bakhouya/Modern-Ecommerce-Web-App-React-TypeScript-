


import { usePublicSliders } from '../controllers/useSlider';
import { usePublicCategory } from '../controllers/useCategory';
import { usePublicOffers } from '../controllers/useOffer';
import { useHomePageProducts } from '../controllers/usePublicProducts';
import { usePublicServices } from '../controllers/useServices';

export const usePageLoading = () => {

    const { data: sliders, isLoading: slidersLoading, error: slidersError } = usePublicSliders();
    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = usePublicCategory();
    const { data: offers, isLoading: offersLoading, error: offersError } = usePublicOffers();
    const { data: homePageProducts, isLoading: homePageProductsLoading, error: homePageProductsError } = useHomePageProducts();
    const { data: homePageServices, isLoading: homePageServicesLoading, error: homePageServicesError } = usePublicServices();

    const isLoading = slidersLoading || categoriesLoading || offersLoading || homePageProductsLoading || homePageServicesLoading;
    const error     = slidersError || categoriesError || offersError || homePageProductsError || homePageServicesError;
    const isReady   = !isLoading && !error ;


  return {

      sliders: sliders || [],
      categories: categories || [], 
      offers: offers || [], 
      homePageProducts: homePageProducts || [], 
      homePageServices: homePageServices || [], 
      isLoading,  error, isReady

    };


};