
import { createBrowserRouter} from 'react-router-dom';
import ROUTES from "./dashboard/path"

import RootLayout from "./dashboard/AppRouter"
import Layout from "../layouts/dashboard/Layout";

// ====================================================================
// imports pages for routers
// ====================================================================
import DashboardHome from "../views/dashboard/pages/Home";
import Products from "../views/dashboard/pages/Products";
import Orders from "../views/dashboard/pages/Orders";
import Login from "../views/dashboard/auth/Login"

import ProtectedRoute from "./dashboard/ProtectedRoute"
import AdminProfile from '../views/dashboard/pages/Profile';
import SettingsPlatform from '../views/dashboard/pages/settings/SettingsPlatform';
import SettingsInvoices from '../views/dashboard/pages/settings/SettingsInvoices';
// ====================================================================

 

// ====================================================================
// ====================================================================
const RouterUrl = createBrowserRouter([
    
    {
        element: <RootLayout />, 
        children: [
            {path: ROUTES.LOGIN,  element: (<Login/>)},
            {
                element: (
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                ),
                children: [
                    { path: ROUTES.HOME, element: <DashboardHome /> },
                    { path: ROUTES.PRODUCTS, element: <Products /> },
                    { path: ROUTES.ORDERS, element: <Orders /> },

                    { path: ROUTES.PROFILE, element: <AdminProfile /> },
                    { path: ROUTES.SETTINGS, element: <SettingsPlatform /> },
                    { path: ROUTES.SETTING_INVOICES, element: <SettingsInvoices /> },
                ]
            },  
        ],
    },

]);
// ====================================================================
// Exports the file routers
// ====================================================================
export default RouterUrl 
