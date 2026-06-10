


import {
      HomeIcon, PackageIcon, ShoppingCartIcon, SettingsIcon,
      LayoutGridIcon, TagsIcon, FileTextIcon, ShieldCheckIcon,
      BoxesIcon, UsersIcon,
      BarChart3Icon, EyeIcon, DollarSignIcon, TrendingDownIcon,
      ListChecksIcon, TruckIcon, WarehouseIcon, CreditCardIcon,
      GlobeIcon, FileCodeIcon, MapPinIcon, ReceiptIcon,
} from "lucide-react";
import ROUTES from "../routers/dashboard/path";

export interface NavItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    url?: string;
    items?: NavItem[];
    badge?: boolean;
}

const size = 17;

export const menuItems: NavItem[] = [
        { id: "accueil", title: "Accueil", icon: <HomeIcon size={size} />, url: ROUTES.HOME },
        { id: "clients", title: "Clients", icon: <UsersIcon size={size} />, url: "/admin/clients" },
        {
            id: "catalogue",
            title: "Catalogue",
            icon: <PackageIcon size={size} />,
            items: [
                { id: "articles", title: "Articles", icon: <PackageIcon size={size} />, url: ROUTES.PRODUCTS },
                { id: "categories", title: "Catégories", icon: <LayoutGridIcon size={size} />, url: ROUTES.CATEGORIES },
                { id: "marques", title: "Marques", icon: <TagsIcon size={size} />, url: ROUTES.BRANDS },
                { id: "attributs", title: "Attributs", icon: <BoxesIcon size={size} />, url: ROUTES.ATTRIBUTES },
                { id: "valeurs-attributs", title: "Valeurs d'attributs", icon: <ListChecksIcon size={size} />, url: "/admin/attribute-values" },
            ],
        },
        // Ventes (groupe)
        {
            id: "ventes",
            title: "Ventes",
            icon: <ShoppingCartIcon size={size} />,
            items: [
                { id: "commandes", title: "Commandes", icon: <ShoppingCartIcon size={size} />, url: ROUTES.ORDERS, badge: true },
                { id: "factures", title: "Factures", icon: <FileTextIcon size={size} />, url: ROUTES.INVOICES },
            ],
        },
        // Fournisseurs
        { id: "fournisseurs", title: "Fournisseurs", icon: <WarehouseIcon size={size} />, url: "/admin/suppliers" },
        // Transporteurs
        { id: "transporteurs", title: "Transporteurs", icon: <TruckIcon size={size} />, url: "/admin/shipping/companies" },
        // Rapports (groupe)
        {
            id: "rapports",
            title: "Rapports",
            icon: <BarChart3Icon size={size} />,
            items: [
                { id: "ventes-rapport", title: "Ventes", icon: <BarChart3Icon size={size} />, url: "/admin/reports/sales" },
                { id: "visites", title: "Visites", icon: <EyeIcon size={size} />, url: "/admin/reports/visits" },
            ],
        },
        // Transactions financières (groupe)
        {
            id: "transactions",
            title: "Transactions financières",
            icon: <CreditCardIcon size={size} />,
            items: [
                { id: "revenus", title: "Revenus", icon: <DollarSignIcon size={size} />, url: "/admin/finance/revenues" },
                { id: "depenses", title: "Dépenses", icon: <TrendingDownIcon size={size} />, url: "/admin/finance/expenses" },
                { id: "types-depenses", title: "Types de dépenses", icon: <ListChecksIcon size={size} />, url: "/admin/finance/expense-types" },
            ],
        },
        // Paramètres (groupe)
        {
            id: "parametres",
            title: "Paramètres",
            icon: <SettingsIcon size={size} />,
            items: [
                { id: "param-generaux", title: "Paramètres généraux", icon: <SettingsIcon size={size} />, url: ROUTES.SETTINGS },
                { id: "expedition", title: "Expédition", icon: <MapPinIcon size={size} />, url: "/admin/settings/shipping" },
                { id: "facturation", title: "Facturation", icon: <ReceiptIcon size={size} />, url: ROUTES.SETTING_INVOICES },
                { id: "politiques", title: "Politiques de la plateforme", icon: <FileCodeIcon size={size} />, url: "/admin/settings/policies" },
                { id: "services", title: "Services", icon: <GlobeIcon size={size} />, url: "/admin/settings/services" },
                { id: "administration", title: "Administration", icon: <ShieldCheckIcon size={size} />, url: ROUTES.ADMIN },
            ],
        },
    ];

