

import { Outlet } from "react-router-dom";
import {AdminAuthProvider} from '../../context/admin-auth/AdminAuthContext';

export default function RootLayout() {
    return (
        <AdminAuthProvider> 
            <Outlet /> 
        </AdminAuthProvider>    
    );
}

