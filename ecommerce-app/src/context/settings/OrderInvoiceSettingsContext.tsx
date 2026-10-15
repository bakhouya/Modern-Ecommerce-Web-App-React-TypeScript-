


import { createContext, useContext, type ReactNode } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchOrderInvoiceSettings} from '../../services/settings/settingsService';
import { ErrorDisplay } from '../../components/ui/ErrorDisplay';
import type { OrderInvoicesSettings} from '../../types/settingsTypes';
import { LoadingDisplay } from '../../components/ui/LoadingDisplay';


interface SettingsContextValue {
    settingsQuery: UseQueryResult<OrderInvoicesSettings, Error>;
    refetchSettings: () => void;
}

const OrderInvoiceSettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const OrderInvoiceSettingsProvider = ({ children }: { children: ReactNode }) => {

    const settingsQuery = useQuery<OrderInvoicesSettings, Error>({
        queryKey: ['OrderInvoiceSettings'],
        queryFn: fetchOrderInvoiceSettings,
        staleTime: 10 * 60 * 1000, 
        retry: 1,
    });

    const refetchSettings = () => { settingsQuery.refetch();};

    if (settingsQuery.isLoading) { return <LoadingDisplay />;}

    if (settingsQuery.error) {
        return (<ErrorDisplay error={settingsQuery.error}  refetch={refetchSettings}/>);
    }

    return (
        <OrderInvoiceSettingsContext.Provider value={{ settingsQuery, refetchSettings }}>
            {children}
        </OrderInvoiceSettingsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrderInvoiceSettings = () => {
    const context = useContext(OrderInvoiceSettingsContext);
    if (!context) {throw new Error('useSettings must be used within a SettingsProvider');}
    return context;
};






