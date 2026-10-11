





import { createContext, useContext, type ReactNode } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchDelivryInvoiceSettings} from '../../services/settings/settingsService';
import type { OrderInvoicesSettings} from '../../types/settingsTypes';

import { LoadingDisplay } from '../../components/ui/LoadingDisplay';
import { ErrorDisplay } from '../../components/ui/ErrorDisplay';

interface SettingsContextValue {
    settingsQuery: UseQueryResult<DeliveryInvoiceSettings, Error>;
    refetchSettings: () => void;
}

const DeliveryInvoiceSettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const DeliveryInvoiceSettingsProvider = ({ children }: { children: ReactNode }) => {

    const settingsQuery = useQuery<DeliveryInvoiceSettings, Error>({
        queryKey: ['deliveryinvoicesetting'],
        queryFn: fetchDelivryInvoiceSettings,
        staleTime: 10 * 60 * 1000, 
        retry: 1,
    });

    const refetchSettings = () => { settingsQuery.refetch();};

    if (settingsQuery.isLoading) { return <LoadingDisplay />;}

    if (settingsQuery.error) {
        return (<ErrorDisplay error={settingsQuery.error}  refetch={refetchSettings}/>);
    }

    return (
        <DeliveryInvoiceSettingsContext.Provider value={{ settingsQuery, refetchSettings }}>
            {children}
        </DeliveryInvoiceSettingsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDelevryInvoiceSettings = () => {
    const context = useContext(DeliveryInvoiceSettingsContext);
    if (!context) {throw new Error('useSettings must be used within a SettingsProvider');}
    return context;
};







