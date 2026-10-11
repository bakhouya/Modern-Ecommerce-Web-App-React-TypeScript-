


// ==================== VENTES (SalesInvoiceSettings) ====================

// export const salesCompanyFields = [
//   {
//     key: 'show_logo',
//     label: 'Afficher le logo',
//     desc: 'Affiche le logo de votre entreprise en haut de la facture de vente',
//   },
//   {
//     key: 'show_company_name',
//     label: 'Nom société',
//     desc: 'Affiche le nom légal de votre entreprise sur la facture',
//   },
//   {
//     key: 'show_company_address',
//     label: 'Adresse société',
//     desc: 'Affiche l’adresse complète (rue, code postal, ville)',
//   },
//   {
//     key: 'show_company_phone',
//     label: 'Téléphone société',
//     desc: 'Affiche le numéro de téléphone du service commercial',
//   },
//   {
//     key: 'show_company_email',
//     label: 'Email société',
//     desc: 'Affiche l’email professionnel pour le suivi des factures',
//   },
// ];

// export const salesCustomerFields = [
//   {
//     key: 'show_customer_name',
//     label: 'Nom client',
//     desc: 'Affiche le nom complet du client (particulier ou entreprise)',
//   },
//   {
//     key: 'show_customer_address',
//     label: 'Adresse client',
//     desc: 'Affiche l’adresse de facturation du client',
//   },
//   {
//     key: 'show_customer_phone',
//     label: 'Téléphone client',
//     desc: 'Affiche le numéro de téléphone du client',
//   },
//   {
//     key: 'show_customer_city',
//     label: 'Ville client',
//     desc: 'Affiche la ville du client',
//   },
// ];

// export const salesInvoiceFields = [
//   {
//     key: 'show_invoice_number',
//     label: 'Numéro de facture',
//     desc: 'Affiche le numéro unique de la facture',
//   },
//   {
//     key: 'show_issue_date',
//     label: 'Date d’émission',
//     desc: 'Affiche la date d’émission de la facture',
//   },
//   {
//     key: 'show_order_reference',
//     label: 'Référence commande',
//     desc: 'Affiche la référence de la commande associée',
//   },
//   {
//     key: 'show_payment_method',
//     label: 'Mode de paiement',
//     desc: 'Affiche le moyen de paiement (carte, virement, etc.)',
//   },
//   {
//     key: 'show_payment_status',
//     label: 'Statut de paiement',
//     desc: 'Affiche si la facture est payée, en attente ou impayée',
//   },
// ];

// export const salesFooterField = [
//   {
//     key: 'show_footer',
//     label: 'Pied de page',
//     desc: 'Affiche un message personnalisé en bas de la facture (ex: "Merci de votre confiance")',
//   },
// ];


import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export const useSalesCompanyFields = () => {
  const { t } = useTranslation();
  const keys = ['show_logo', 'show_company_name', 'show_company_address', 'show_company_phone', 'show_company_email'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`salesSettings.companyFields.${key}.label`),
    desc: t(`salesSettings.companyFields.${key}.desc`),
  })), [keys, t]);
};

export const useSalesCustomerFields = () => {
  const { t } = useTranslation();
  const keys = ['show_customer_name', 'show_customer_address', 'show_customer_phone', 'show_customer_city'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`salesSettings.customerFields.${key}.label`),
    desc: t(`salesSettings.customerFields.${key}.desc`),
  })), [t]);
};

export const useSalesInvoiceFields = () => {
  const { t } = useTranslation();
  const keys = ['show_invoice_number', 'show_issue_date', 'show_order_reference', 'show_payment_method', 'show_payment_status'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`salesSettings.invoiceFields.${key}.label`),
    desc: t(`salesSettings.invoiceFields.${key}.desc`),
  })), [t]);
};

export const useSalesFooterField = () => {
  const { t } = useTranslation();
  const keys = ['show_footer'];
  return useMemo(() => keys.map(key => ({
    key,
    label: t(`salesSettings.footerField.${key}.label`),
    desc: t(`salesSettings.footerField.${key}.desc`),
  })), [t]);
};

