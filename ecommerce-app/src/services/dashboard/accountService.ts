
// ===============================================================================
// ===============================================================================
import api from '../axiosInstance';
import type { 
  Profile, ResponseProfile, ChangePasswordType 
} from '../../types/dashboard/profile';
import type { CityType } from '../../types/dashboard/city';
// ===============================================================================


// ===============================================================================
// ===============================================================================
export const ActiveCitiesService = async (): Promise<CityType[]> => {
  const response = await api.get('/public/cities/active/');
  return response.data;
};



export const UpdateProfile = async (data: Partial<Profile>) => {
  const response = await api.put('/panel/profile/', data);
  return response.data ;
};
export const FetchProfile = async (): Promise<ResponseProfile> => {
  const { data } = await api.get<ResponseProfile>('/panel/profile/') ;
  return data ;
};
export const ChangePassword = async (data: Partial<ChangePasswordType>) => {
  const response = await api.put('/panel/change-password/', data);
  return response.data ;
};
// ===============================================================================
// 



