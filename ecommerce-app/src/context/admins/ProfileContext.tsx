

import { createContext, useContext, type ReactNode } from 'react';
import { useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { FetchProfile } from '../../services/dashboard/accountService';
import type { ResponseProfile } from '../../types/dashboard/profile';
import { ErrorDisplay } from '../../components/ui/ErrorDisplay';
import { LoadingDisplay } from "../../components/ui/LoadingDisplay";

interface ProfileContextValue {
    profileQuery: UseQueryResult<ResponseProfile, Error>; 
    refetchProfile: () => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);


export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const profileQuery = useQuery<ResponseProfile, Error>({
        queryKey    : ['profile'],
        queryFn     : FetchProfile,
        staleTime   : 5 * 60 * 1000, 
        retry: 1,
  });

  const refetchProfile = () => {
    queryClient.invalidateQueries({ queryKey: ['profile'] });
  };


  
  if (profileQuery.isLoading) {
      return <LoadingDisplay/>;
  }
  if (profileQuery.error) {
      return (
          <ErrorDisplay error={profileQuery.error} refetch={refetchProfile}/>
      );
  }

  return (
    <ProfileContext.Provider value={{ profileQuery, refetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use profile
// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {throw new Error('useProfile must be used within a ProfileProvider');}
    return context;
};

