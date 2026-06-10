



// context/SettingsContext.tsx
import { createContext, useContext, type ReactNode } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchPublicSettings } from '../../services/settings/settingsService';
// import { LoadingDisplay } from '../../components/ui/LoadingDisplay';
import { ErrorDisplay } from '../../components/ui/ErrorDisplay';
import type { SettingsTypes } from '../../types/settingsTypes';


interface SettingsContextValue {
    settingsQuery: UseQueryResult<SettingsTypes, Error>;
    refetchSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const settingsQuery = useQuery<SettingsTypes, Error>({
        queryKey: ['publicSettings'],
        queryFn: fetchPublicSettings,
        staleTime: 10 * 60 * 1000, 
        retry: 1,
    });

    const refetchSettings = () => { settingsQuery.refetch();};

    // if (settingsQuery.isLoading) { return <LoadingDisplay />;}

    if (settingsQuery.error) {
        return (
            <ErrorDisplay 
                error={settingsQuery.error} 
                refetch={refetchSettings}
            />
        );
    }

    return (
        <SettingsContext.Provider value={{ settingsQuery, refetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};




