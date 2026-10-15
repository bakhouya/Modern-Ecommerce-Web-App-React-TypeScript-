

// ==================== LIVRAISON (DeliveryInvoiceSettings) ====================

// export const deliveryCompanyFields = [
//   {
//     key: 'show_logo',
//     label: 'Afficher le logo',
//     desc: 'Affiche le logo de votre entreprise sur le bon de livraison',
//   },
//   {
//     key: 'show_company_name',
//     label: 'Nom société',
//     desc: 'Affiche le nom de votre entreprise',
//   },
//   {
//     key: 'show_company_address',
//     label: 'Adresse société',
//     desc: 'Affiche l’adresse complète de l’entreprise',
//   },
//   {
//     key: 'show_company_phone',
//     label: 'Téléphone société',
//     desc: 'Affiche le numéro de téléphone de l’entreprise',
//   },
//   {
//     key: 'show_company_email',
//     label: 'Email société',
//     desc: 'Affiche l’email de contact',
//   },
// ];

// export const deliveryCustomerFields = [
//   {
//     key: 'show_customer_name',
//     label: 'Nom client',
//     desc: 'Affiche le nom du client destinataire',
//   },
//   {
//     key: 'show_customer_phone',
//     label: 'Téléphone client',
//     desc: 'Affiche le téléphone du client (utile pour le livreur)',
//   },
//   {
//     key: 'show_shipping_address',
//     label: 'Adresse de livraison',
//     desc: 'Affiche l’adresse exacte de livraison (avec points de repère)',
//   },
//   {
//     key: 'show_customer_city',
//     label: 'Ville client',
//     desc: 'Affiche la ville de livraison',
//   },
// ];

// export const deliveryDocumentFields = [
//   {
//     key: 'show_delivery_note_number',
//     label: 'Numéro de bon de livraison',
//     desc: 'Affiche le numéro unique du bon de livraison',
//   },
//   {
//     key: 'show_order_reference',
//     label: 'Référence commande',
//     desc: 'Affiche la référence de la commande d’origine',
//   },
//   {
//     key: 'show_delivery_date',
//     label: 'Date de livraison',
//     desc: 'Affiche la date d’émission ou de livraison prévue',
//   },
//   {
//     key: 'show_payment_method',
//     label: 'Mode de paiement',
//     desc: 'Affiche le mode de paiement choisi',
//   },
//   {
//     key: 'show_status',
//     label: 'Statut',
//     desc: 'Affiche l’état du bon (en préparation, livré, etc.)',
//   },
// ];

// export const deliveryProductFields = [
//   {
//     key: 'show_product_image',
//     label: 'Image produit',
//     desc: 'Affiche une vignette du produit',
//   },
//   {
//     key: 'show_product_sku',
//     label: 'SKU produit',
//     desc: 'Affiche la référence interne du produit',
//   },
//   {
//     key: 'show_quantity',
//     label: 'Quantité',
//     desc: 'Affiche la quantité commandée/livrée',
//   },
//   {
//     key: 'show_unit_price',
//     label: 'Prix unitaire',
//     desc: 'Affiche le prix unitaire hors taxes',
//   },
//   {
//     key: 'show_line_total',
//     label: 'Total ligne',
//     desc: 'Affiche le total par ligne (quantité × prix unitaire)',
//   },
// ];

// export const deliveryTotalsFields = [
//   {
//     key: 'show_subtotal',
//     label: 'Sous-total',
//     desc: 'Affiche le montant hors frais et remises',
//   },
//   {
//     key: 'show_shipping_cost',
//     label: 'Frais de livraison',
//     desc: 'Affiche le coût de transport',
//   },
//   {
//     key: 'show_discount',
//     label: 'Remise',
//     desc: 'Affiche la réduction accordée',
//   },
//   {
//     key: 'show_total',
//     label: 'Total',
//     desc: 'Affiche le montant final à payer',
//   },
//   {
//     key: 'show_offer',
//     label: 'Offre spéciale',
//     desc: 'Affiche une offre promotionnelle si applicable',
//   },
// ];

// export const deliverySignatureFields = [
//   {
//     key: 'show_customer_signature',
//     label: 'Signature client',
//     desc: 'Affiche l’emplacement pour la signature du client à la réception',
//   },
//   {
//     key: 'show_delivery_agent_signature',
//     label: 'Signature livreur',
//     desc: 'Affiche l’emplacement pour la signature de l’agent de livraison',
//   },
//   {
//     key: 'show_stamp_area',
//     label: 'Emplacement tampon',
//     desc: 'Affiche une zone pour le tampon officiel de l’entreprise',
//   },
// ];

// export const deliveryFooterField = [
//   {
//     key: 'show_footer',
//     label: 'Pied de page',
//     desc: 'Affiche un message personnalisé (ex: "Bon de livraison à conserver")',
//   },
// ];



import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const useDeliveryCompanyFields = () => {
  const { t } = useTranslation();
  const keys = ['show_logo', 'show_company_name', 'show_company_address', 'show_company_phone', 'show_company_email'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`deliverySettings.companyFields.${key}.label`),
    desc: t(`deliverySettings.companyFields.${key}.desc`),
  })), [t]);
};

export const useDeliveryCustomerFields = () => {
  const { t } = useTranslation();
  const keys = ['show_customer_name', 'show_customer_phone', 'show_shipping_address', 'show_customer_city'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`deliverySettings.customerFields.${key}.label`),
    desc: t(`deliverySettings.customerFields.${key}.desc`),
  })), [t]);
};

export const useDeliveryDocumentFields = () => {
  const { t } = useTranslation();
  const keys = ['show_delivery_note_number', 'show_order_reference', 'show_delivery_date', 'show_payment_method', 'show_status'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`deliverySettings.documentFields.${key}.label`),
    desc: t(`deliverySettings.documentFields.${key}.desc`),
  })), [t]);
};

export const useDeliveryProductFields = () => {
  const { t } = useTranslation();
  const keys = ['show_product_image', 'show_product_sku', 'show_quantity', 'show_unit_price', 'show_line_total'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`deliverySettings.productFields.${key}.label`),
    desc: t(`deliverySettings.productFields.${key}.desc`),
  })), [t]);
};

export const useDeliveryTotalsFields = () => {
  const { t } = useTranslation();
  const keys = ['show_subtotal', 'show_shipping_cost', 'show_discount', 'show_total', 'show_offer'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`deliverySettings.totalsFields.${key}.label`),
    desc: t(`deliverySettings.totalsFields.${key}.desc`),
  })), [t]);
};

export const useDeliverySignatureFields = () => {
  const { t } = useTranslation();
  const keys = ['show_customer_signature', 'show_delivery_agent_signature', 'show_stamp_area'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`deliverySettings.signatureFields.${key}.label`),
    desc: t(`deliverySettings.signatureFields.${key}.desc`),
  })), [t]);
};

export const useDeliveryFooterField = () => {
  const { t } = useTranslation();
  const keys = ['show_footer'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`deliverySettings.footerField.${key}.label`),
    desc: t(`deliverySettings.footerField.${key}.desc`),
  })), [t]);
};


