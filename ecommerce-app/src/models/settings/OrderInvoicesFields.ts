
// export const companyFields = [
//     {
//         key: 'show_logo',
//         label: 'Afficher le logo',
//         desc: 'Affiche le logo de votre entreprise en haut du document (si téléchargé)',
//     },
//     {
//         key: 'show_company_name',
//         label: 'Nom société',
//         desc: 'Affiche le nom légal de votre entreprise tel qu\'enregistré',
//     },
//     {
//         key: 'show_company_address',
//         label: 'Adresse société',
//         desc: 'Affiche l\'adresse complète (rue, code postal, ville)',
//     },
//     {
//         key: 'show_company_phone',
//         label: 'Téléphone société',
//         desc: 'Affiche le numéro de téléphone pour joindre votre service client',
//     },
//     {
//         key: 'show_company_email',
//         label: 'Email société',
//         desc: 'Affiche l\'adresse email professionnelle pour les contacts',
//     },
// ];

// export const customerFields = [
//     {
//         key: 'show_customer_name',
//         label: 'Nom client',
//         desc: 'Affiche le nom complet du client (particulier ou société)',
//     },
//     {
//         key: 'show_customer_phone',
//         label: 'Téléphone client',
//         desc: 'Affiche le numéro de téléphone du client pour le livrer ou le contacter',
//     },
//     {
//         key: 'show_shipping_address',
//         label: 'Adresse livraison',
//         desc: 'Affiche l\'adresse exacte de livraison (avec points de repère si nécessaire)',
//     },
//     {
//         key: 'show_customer_city',
//         label: 'Ville client',
//         desc: 'Affiche la ville du client pour faciliter l\'acheminement',
//     },
// ];

// export const orderFields = [
//     {
//         key: 'show_order_number',
//         label: 'Numéro commande',
//         desc: 'Affiche le numéro unique de commande (référence de suivi)',
//     },
//     {
//         key: 'show_order_date',
//         label: 'Date commande',
//         desc: 'Affiche la date de création de la commande (jour/mois/année)',
//     },
//     {
//         key: 'show_payment_method',
//         label: 'Mode paiement',
//         desc: 'Affiche le moyen de paiement choisi par le client (carte, virement, etc.)',
//     },
//     {
//         key: 'show_status',
//         label: 'Statut',
//         desc: 'Affiche l\'état actuel de la commande (en cours, expédiée, livrée)',
//     },
// ];

// export const totalFields = [
//     {
//         key: 'show_subtotal',
//         label: 'Sous-total',
//         desc: 'Affiche le montant hors frais de livraison et remises',
//     },
//     {
//         key: 'show_shipping_cost',
//         label: 'Frais livraison',
//         desc: 'Affiche le coût de livraison (forfait ou selon poids/distance)',
//     },
//     {
//         key: 'show_discount',
//         label: 'Remise',
//         desc: 'Affiche la réduction accordée (pourcentage ou montant fixe)',
//     },
//     {
//         key: 'show_total',
//         label: 'Total',
//         desc: 'Affiche le montant final à payer (sous-total + livraison - remise)',
//     },
//     {
//         key: 'show_footer',
//         label: 'Pied de page',
//         desc: 'Affiche un message personnalisé en bas du document (ex: "Merci de votre confiance")',
//     },
// ];


import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const useOrderCompanyFields = () => {
  const { t } = useTranslation();
  const keys = ['show_logo', 'show_company_name', 'show_company_address', 'show_company_phone', 'show_company_email'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`orderSettings.companyFields.${key}.label`),
    desc: t(`orderSettings.companyFields.${key}.desc`),
  })), [t]);
};

export const useOrderCustomerFields = () => {
  const { t } = useTranslation();
  const keys = ['show_customer_name', 'show_customer_phone', 'show_shipping_address', 'show_customer_city'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`orderSettings.customerFields.${key}.label`),
    desc: t(`orderSettings.customerFields.${key}.desc`),
  })), [t]);
};

export const useOrderOrderFields = () => {
  const { t } = useTranslation();
  const keys = ['show_order_number', 'show_order_date', 'show_payment_method', 'show_status'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`orderSettings.orderFields.${key}.label`),
    desc: t(`orderSettings.orderFields.${key}.desc`),
  })), [t]);
};

export const useOrderTotalFields = () => {
  const { t } = useTranslation();
  const keys = ['show_subtotal', 'show_shipping_cost', 'show_discount', 'show_total', 'show_footer'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`orderSettings.totalFields.${key}.label`),
    desc: t(`orderSettings.totalFields.${key}.desc`),
  })), [t]);
};










