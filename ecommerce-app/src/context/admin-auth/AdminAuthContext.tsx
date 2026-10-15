


// ===============================================================================
// ===============================================================================
import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';
import type {User, AuthResponse} from '../../types/dashboard/auth';
import {logout as apiLogout} from '../../services/dashboard/authService';
// ===============================================================================
// 
// 
// ===============================================================================
// ===============================================================================
interface AdminAuthContextType { 
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: AuthResponse) => void;
    logout: () => void;
    hasPermission: (permission: string) => boolean;
    hasGroup: (group: string) => boolean;
}
// ===============================================================================
// 
// 
// ===============================================================================
// ===============================================================================
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);
export const AdminAuthProvider = ({children}: {children: ReactNode;}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('admin_user');
        if (storedUser) {setUser(JSON.parse(storedUser));}
        setIsLoading(false);
    }, []);

    const login = (data: AuthResponse) => {
        localStorage.setItem('admin_access_token', data.access);
        localStorage.setItem('admin_refresh_token', data.refresh);
        localStorage.setItem('admin_user', JSON.stringify(data.user));

        setUser(data.user);
    };

    const logout = () => {
        apiLogout();
        setUser(null);
    };

    const hasPermission = (permission: string) => user?.permissions.includes(permission) || false;
    const hasGroup = (group: string) => user?.groups.includes(group) || false;

    return (
        <AdminAuthContext.Provider
        value={{user, isAuthenticated: !!user, isLoading, login, logout, hasPermission, hasGroup}}>
        {children}
        </AdminAuthContext.Provider>
    );
};
// ===============================================================================
// 
// 
// ===============================================================================
// ===============================================================================
export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {throw new Error('useAdminAuth must be used within AdminAuthProvider');}
    return context;
};
// ===============================================================================
