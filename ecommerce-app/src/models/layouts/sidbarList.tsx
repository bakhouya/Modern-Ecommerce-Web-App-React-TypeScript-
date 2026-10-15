


import {
      HomeIcon, PackageIcon, ShoppingCartIcon, SettingsIcon,
      LayoutGridIcon, TagsIcon, FileTextIcon, ShieldCheckIcon,
      BoxesIcon, UsersIcon,
      BarChart3Icon, EyeIcon, DollarSignIcon, TrendingDownIcon,
      ListChecksIcon, TruckIcon, WarehouseIcon, CreditCardIcon,
      GlobeIcon, FileCodeIcon, MapPinIcon, ReceiptIcon,
      Store,
      GroupIcon, 
} from "lucide-react";
import type { TFunction } from 'i18next';
import ROUTES from "../../routers/dashboard/path";

export interface NavItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    url?: string;
    items?: NavItem[];
    badge?: boolean;
}

export const getMenuItems = (t: TFunction, size: number): NavItem[] =>  [
    { id: "accueil", title: t('navigation.accueil'), icon: <HomeIcon size={size} />, url: ROUTES.HOME },
    { id: "clients", title: t('navigation.clients'), icon: <UsersIcon size={size} />, url: "/admin/clients" },
    {
      id: "catalogue",
      title: t('navigation.catalogue'),
      icon: <PackageIcon size={size} />,
      items: [
        { id: "articles", title: t('navigation.articles'), icon: <PackageIcon size={size} />, url: ROUTES.PRODUCTS },
        { id: "categories", title: t('navigation.categories'), icon: <LayoutGridIcon size={size} />, url: ROUTES.CATEGORIES },
        { id: "marques", title: t('navigation.marques'), icon: <TagsIcon size={size} />, url: ROUTES.BRANDS },
        { id: "attributs", title: t('navigation.attributs'), icon: <BoxesIcon size={size} />, url: ROUTES.ATTRIBUTES },
        { id: "valeurs-attributs", title: t('navigation.valeurs_attributs'), icon: <ListChecksIcon size={size} />, url: "/admin/attribute-values" },
      ],
    },
    {
      id: "ventes",
      title: t('navigation.ventes'),
      icon: <ShoppingCartIcon size={size} />,
      items: [
        { id: "commandes", title: t('navigation.commandes'), icon: <ShoppingCartIcon size={size} />, url: ROUTES.ORDERS, badge: true },
        { id: "factures", title: t('navigation.factures'), icon: <FileTextIcon size={size} />, url: ROUTES.INVOICES },
      ],
    },
    { id: "fournisseurs", title: t('navigation.fournisseurs'), icon: <WarehouseIcon size={size} />, url: ROUTES.SUPPLIER },
    { id: "transporteurs", title: t('navigation.transporteurs'), icon: <TruckIcon size={size} />, url: ROUTES.SHIPPING },
    {
      id: "rapports",
      title: t('navigation.rapports'), 
      icon: <BarChart3Icon size={size} />,
      items: [
        { id: "ventes-rapport", title: t('navigation.ventes_rapport'), icon: <BarChart3Icon size={size} />, url: "/admin/reports/sales" },
        { id: "visites", title: t('navigation.visites'), icon: <EyeIcon size={size} />, url: ROUTES.VISITORS },
      ],
    },
    { id: "branches", title: t('navigation.branches'), icon: <TruckIcon size={size} />, url: ROUTES.BRANCHES },
    {
        id: "transactions",
        title: t('navigation.transactions'),
        icon: <CreditCardIcon size={size} />,
        items: [
          { id: "revenus", title: t('navigation.revenus'), icon: <DollarSignIcon size={size} />, url: "/admin/finance/revenues" },
          { id: "depenses", title: t('navigation.depenses'), icon: <TrendingDownIcon size={size} />, url: "/admin/finance/expenses" },
          { id: "types-depenses", title: t('navigation.types_depenses'), icon: <ListChecksIcon size={size} />, url: "/admin/finance/expense-types" },
        ],
    },
    {
        id: "marketings",
        title: t('navigation.marketings'),
        icon: <Store size={size} />,
        items: [
          { id: "sliders", title: t('navigation.sliders'), icon: <ShoppingCartIcon size={size} />, url: ROUTES.SLIDERS },
          { id: "factures", title: t('navigation.coupons'), icon: <FileTextIcon size={size} />, url: ROUTES.COUPONS },
          { id: "factures", title: t('navigation.offers'), icon: <FileTextIcon size={size} />, url: ROUTES.OFFERS },
        ],
    },
    {
      id: "parametres",
      title: t('navigation.parametres'),
      icon: <SettingsIcon size={size} />,
      items: [
        { id: "param-generaux", title: t('navigation.param_generaux'), icon: <SettingsIcon size={size} />, url: ROUTES.SETTINGS },
        { id: "expedition", title: t('navigation.expedition'), icon: <MapPinIcon size={size} />, url: ROUTES.CITIES },
        { id: "facturation", title: t('navigation.facturation'), icon: <ReceiptIcon size={size} />, url: ROUTES.SETTING_INVOICES },
        { id: "politiques", title: t('navigation.politiques'), icon: <FileCodeIcon size={size} />, url: ROUTES.POLICY },
        { id: "services", title: t('navigation.services'), icon: <GlobeIcon size={size} />, url:  ROUTES.SERVICE},
        { id: "administration", title: t('navigation.administration'), icon: <GroupIcon size={size} />, url: ROUTES.USERS },
        { id: "roles", title: t('navigation.roles'), icon: <ShieldCheckIcon size={size} />, url: ROUTES.ROLES },
      ],
    },
  ];






