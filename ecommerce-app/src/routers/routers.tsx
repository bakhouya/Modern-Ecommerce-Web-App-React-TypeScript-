
import { createBrowserRouter, Navigate} from 'react-router-dom';
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
import { CitiesPage } from '../views/dashboard/pages/settings/CitiesPage';
import { PolicysPage } from '../views/dashboard/pages/settings/PolicyPage';
import { ServicePage } from '../views/dashboard/pages/settings/ServicesPgae';
import { SuppliersPage } from '../views/dashboard/pages/locations/SupplierPage';
import { ShippingPage } from '../views/dashboard/pages/locations/shippingPage';
import { BranchPage } from '../views/dashboard/pages/locations/BranchPage';
import { CategoryPage } from '../views/dashboard/pages/catalogs/CategoryPage';
import { BrandPage } from '../views/dashboard/pages/catalogs/BrandPage';
import { SliderPage } from '../views/dashboard/pages/marketings/SliderPage';
import { CouponPage } from '../views/dashboard/pages/marketings/CouponPage';
import { RolesPage } from '../views/dashboard/pages/settings/RolesPage';
import { UsersPage } from '../views/dashboard/pages/settings/UsersPage';
import { VisitorsPage } from '../views/dashboard/pages/visitors/VisitorPage';
import { OfferPage } from '../views/dashboard/pages/marketings/OfferPage';
import { OfferFormPage } from '../views/dashboard/pages/offers/OfferFormPage';

import WEBROUTES from './web/path';
import StoreHome from '../views/web/Home';
import WebRootLayout from './web/AppRouter';
import WebLayout from '../layouts/web/Layout';
import ProductPage from '../views/web/ProductPage';
import { DataProvider } from '../context/web/DataContext';
import Checkout from '../views/web/Checkout';
import { ProductsCategory } from '../views/web/ProductsWithCategory';
import TrackOrder from '../views/web/TrackOrder';
import SearchPage from '../views/web/SearchPage';
import Policies from '../views/web/Policies';
import ProductsOffer from '../views/web/ProductsOffer';
// ====================================================================

 

// ====================================================================
// ====================================================================
const RouterUrl = createBrowserRouter([
    
    {
        element: <RootLayout />, 
        children: [
            {path: ROUTES.LOGIN,  element: (<Login/>)},
            {
                element: (<ProtectedRoute><Layout /></ProtectedRoute>),
                children: [
                    { path: ROUTES.HOME, element: <DashboardHome /> },
                    { path: ROUTES.PRODUCTS, element: <Products /> },
                    { path: ROUTES.ORDERS, element: <Orders /> },

                    { path: ROUTES.PROFILE, element: <AdminProfile /> },
                    { path: ROUTES.SETTINGS, element: <SettingsPlatform /> },
                    { path: ROUTES.SETTING_INVOICES, element: <SettingsInvoices /> },
                    { path: ROUTES.CITIES, element: <CitiesPage /> }, 
                    { path: ROUTES.POLICY, element: <PolicysPage /> }, 
                    { path: ROUTES.SERVICE, element: <ServicePage /> },  
                    { path: ROUTES.ROLES, element: <RolesPage /> },  
                    { path: ROUTES.USERS, element: <UsersPage /> },  

                    { path: ROUTES.SUPPLIER, element: <SuppliersPage /> }, 
                    { path: ROUTES.SHIPPING, element: <ShippingPage /> }, 
                    { path: ROUTES.BRANCHES, element: <BranchPage /> }, 

                    { path: ROUTES.CATEGORIES, element: <CategoryPage /> }, 
                    { path: ROUTES.BRANDS, element: <BrandPage /> }, 

                    { path: ROUTES.SLIDERS, element: <SliderPage /> }, 
                    { path: ROUTES.COUPONS, element: <CouponPage /> }, 
                    { path: ROUTES.OFFERS, element: <OfferPage /> }, 
                    { path: ROUTES.CREATE, element: <OfferFormPage />  },
                    { path: "/admin/marketing/offers/:id/edit", element: <OfferFormPage /> },


                    { path: ROUTES.VISITORS, element: <VisitorsPage /> }, 


                ]
            },  
        ],
    },
    {
       element: <WebRootLayout />, 
       children: [
        {
            element: (<WebLayout />),
            children: [
                { path: WEBROUTES.HOME, element: <DataProvider> <StoreHome /> </DataProvider> },
                { path: WEBROUTES.PRODUCT(":id"), element: <ProductPage />},
                { path: WEBROUTES.CATEGORY(":catID"), element: <ProductsCategory />},
                { path: WEBROUTES.TRACKORDER, element: <TrackOrder />},
                { path: WEBROUTES.POLICY, element: <Policies />},
                { path: WEBROUTES.PRODUCTSOFFER(":id"), element: <ProductsOffer />},
                

            ]
        }
       ]
    },
    { path: WEBROUTES.SEARCHING, element: <SearchPage />},
    {path: WEBROUTES.CHECKOUT, element: <Checkout/>},
    {path: "*", element: <Navigate to={WEBROUTES.HOME} replace />} 

]);
// ====================================================================
// Exports the file routers 
// ====================================================================
export default RouterUrl 
