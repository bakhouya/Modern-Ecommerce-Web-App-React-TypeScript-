
// ===============================================================================
// ===============================================================================
import { useAdminAuth } from '../../context/admin-auth/AdminAuthContext';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import ROUTES from "./path"
import { LoadingDisplay } from '../../components/ui/LoadingDisplay';
// ===============================================================================





// ===============================================================================
// ===============================================================================
export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated, isLoading } = useAdminAuth();
    if (isLoading) return (<LoadingDisplay />);
    return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
};
// ===============================================================================



