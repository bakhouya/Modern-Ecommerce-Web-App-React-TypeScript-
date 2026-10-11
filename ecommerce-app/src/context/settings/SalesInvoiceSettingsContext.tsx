


import { createContext, useContext, type ReactNode } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchSalesInvoiceSettings} from '../../services/settings/settingsService';
import type { SalesInvoiceSettings} from '../../types/settingsTypes';

import { LoadingDisplay } from '../../components/ui/LoadingDisplay';
import { ErrorDisplay } from '../../components/ui/ErrorDisplay';

interface SettingsContextValue {
    settingsQuery: UseQueryResult<SalesInvoiceSettings, Error>;
    refetchSettings: () => void;
}

const SalesInvoiceSettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SalesInvoiceSettingsProvider = ({ children }: { children: ReactNode }) => {

    const settingsQuery = useQuery<SalesInvoiceSettings, Error>({
        queryKey: ['SalesInvoiceSettings'],
        queryFn: fetchSalesInvoiceSettings,
        staleTime: 10 * 60 * 1000, 
        retry: 1,
    });

    const refetchSettings = () => { settingsQuery.refetch();};

    if (settingsQuery.isLoading) { return <LoadingDisplay />;}

    if (settingsQuery.error) {
        return (<ErrorDisplay error={settingsQuery.error}  refetch={refetchSettings}/>);
    }

    return (
        <SalesInvoiceSettingsContext.Provider value={{ settingsQuery, refetchSettings }}>
            {children}
        </SalesInvoiceSettingsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSalesInvoiceSettings = () => {
    const context = useContext(SalesInvoiceSettingsContext);
    if (!context) {throw new Error('useSettings must be used within a SettingsProvider');}
    return context;
};






