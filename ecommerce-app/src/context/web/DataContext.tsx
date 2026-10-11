


import { createContext, useContext, type ReactNode } from 'react';
import { usePageLoading } from '../../hooks/useHomePageLoading';
import { LoadingDisplay } from '../../components/ui/LoadingDisplay';
import type { SliderTypes } from '../../types/sliderTypes';
import type { OfferTypes } from '../../types/offersTypes';
import type { CategoryTypes } from '../../types/categoryTypes';
import type { ServiceTypes } from '../../types/serviceTypes';


interface DataContextType {
  sliders: SliderTypes[]; 
  categories: CategoryTypes[];
  offers: OfferTypes[];
  homePageServices: ServiceTypes[];
  isReady: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {

    const { sliders, categories, offers, homePageServices, isLoading, error, isReady } = usePageLoading();

    if (isLoading) {return <div className="flex_center_center vh_100"> <LoadingDisplay /> </div> ;}

    if (error) {
      return (
        <div className="flex_center_center" style={{ minHeight: '100vh' }}>
          <div className="text text_lg weight_600" style={{ color: '#ff552e' }}>
            ⚠️ حدث خطأ أثناء تحميل البيانات. يرجى المحاولة لاحقاً.
          </div>
        </div>
      );
    }

    return (
      <DataContext.Provider value={{ sliders, categories, offers,  homePageServices, isReady }}>
          {children}  
      </DataContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {throw new Error('useData must be used within a DataProvider');}
  return context;
};