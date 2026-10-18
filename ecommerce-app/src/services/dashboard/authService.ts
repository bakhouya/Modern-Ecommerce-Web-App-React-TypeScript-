

// ===============================================================================
// ===============================================================================
import api, { initCsrf } from '../axiosInstance';
import type {LoginCredentials, AuthResponse} from '../../types/dashboard/auth';
// ===============================================================================


// ===============================================================================
// ===============================================================================
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await initCsrf();
    const { data } = await api.post<AuthResponse>('/auth/login/', credentials);
    return data;
};
// ===============================================================================
// 
// 
// ===============================================================================
// ===============================================================================
export const logout = (): void => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');
};
// ===============================================================================
