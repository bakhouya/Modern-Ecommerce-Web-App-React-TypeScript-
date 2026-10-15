



import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';

import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import InputText from '../../../components/forms/InputText';
import {DeliveryInvoiceSettingCheckboxSchema, DeliveryInvoiceSettingTextSchema} from '../../../validations/settingsSchema';
import { UpdateDelivryInvoiceSettings } from '../../../services/settings/settingsService';
import { handleBackendErrors } from '../../../helpers/handleValidationErrors';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { useDelevryInvoiceSettings } from '../../../context/settings/DeliveryInvoiceSettingsContext';
import {
  useDeliveryCompanyFields,
  useDeliveryCustomerFields,
  useDeliveryDocumentFields,
  useDeliveryProductFields,
  useDeliveryTotalsFields,
  useDeliverySignatureFields,
  useDeliveryFooterField
} from '../../../models/settings/DeliveryInvoicesFields';
import { CheckboxGroup } from '../../../components/forms/CheckboxGroup';
import type { DeliveryInvoiceSettings } from '../../../types/settingsTypes';
import { SubmitButton } from '../../../components/ui/SubmitButton';

interface PropsTypes {pageTitle: string;}

export default function UpdateSettingsDeliveryInvoices({ pageTitle }: PropsTypes) {
    const { t } = useTranslation();

    const companyFields = useDeliveryCompanyFields();
    const customerFields = useDeliveryCustomerFields();
    const documentFields = useDeliveryDocumentFields();
    const productFields = useDeliveryProductFields();
    const totalsFields = useDeliveryTotalsFields();
    const signatureFields = useDeliverySignatureFields();
    const footerField = useDeliveryFooterField();

    const queryClient = useQueryClient();
    const { settingsQuery } = useDelevryInvoiceSettings();
    const { data } = settingsQuery;

    const form = useFieldText(DeliveryInvoiceSettingTextSchema, {
      title: '',
      footer_message: '',
    });
    const checkboxes = useDeliveryInvoiceCheckboxes(data);

    useEffect(() => {
      if (!data) return;
      form.setValues({
        title: data.title || '',
        footer_message: data.footer_message || '',
      });
    }, [data]);

    const mutation = useMutation({
        mutationFn: UpdateDelivryInvoiceSettings,
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['deliveryinvoicesetting'] });
          toast.success(t('messages.update.success'));
          form.setErrors({});
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(error.response?.data?.message || t('messages.update.error'));
            handleBackendErrors(error, form.setErrors);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.validate()) return;

      const putData = {
        ...form.values,
        ...Object.fromEntries(
          Object.entries(checkboxes).map(([key, field]) => [key, field.value])
        ),
      };
      mutation.mutate(putData);
    };

    return (
        <form className="py_end_5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SectionHeader title={pageTitle} description={t('deliverySettings.pageDescription')}/>

              {/* Titre principal */}
              <div>
                <InputText
                  type="text"
                  label={t('deliverySettings.labels.documentTitle')}
                  value={form.values.title}
                  onChange={(e) => form.handleChange('title', e.target.value)}
                  error={form.errors.title}
                />
              </div>

              {/* Section Entreprise */}
              <CheckboxGroup
                title={t('deliverySettings.sectionTitles.company')}
                fields={companyFields}
                checkboxes={checkboxes}
              />

              {/* Section Client */}
              <CheckboxGroup
                title={t('deliverySettings.sectionTitles.customer')}
                fields={customerFields}
                checkboxes={checkboxes}
              />

              {/* Section Document */}
              <CheckboxGroup
                title={t('deliverySettings.sectionTitles.document')}
                fields={documentFields}
                checkboxes={checkboxes}
              />

              {/* Section Produits */}
              <CheckboxGroup
                title={t('deliverySettings.sectionTitles.products')}
                fields={productFields}
                checkboxes={checkboxes}
              />

              {/* Section Totaux */}
              <CheckboxGroup
                title={t('deliverySettings.sectionTitles.totals')}
                fields={totalsFields}
                checkboxes={checkboxes}
              />

              {/* Section Signatures */}
              <CheckboxGroup
                title={t('deliverySettings.sectionTitles.signatures')}
                fields={signatureFields}
                checkboxes={checkboxes}
              />

              {/* Pied de page (booléen + message) */}
              <CheckboxGroup
                title={t('deliverySettings.sectionTitles.footer')}
                fields={footerField}
                checkboxes={checkboxes}
              />

              <div>
                <InputText
                  type="text"
                  label={t('deliverySettings.labels.footerMessage')}
                  value={form.values.footer_message}
                  onChange={(e) => form.handleChange('footer_message', e.target.value)}
                  error={form.errors.footer_message}
                />
              </div>
            </div>
          </div>

          <div className="divider my_12"></div>

          <div className="flex_end_center my_start_12">
             <SubmitButton isPending={mutation.isPending} type="update" />
          </div>

        </form>
    );
}

// ==================== Hook des checkboxes pour DeliveryInvoiceSettings ====================
function useDeliveryInvoiceCheckboxes(data?: Partial<DeliveryInvoiceSettings>) {
    return {
        // Entreprise
        show_logo: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_logo,
        initialValue: data?.show_logo || false,
        fieldName: 'show_logo',
        }),
        show_company_name: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_company_name,
        initialValue: data?.show_company_name || false,
        fieldName: 'show_company_name',
        }),
        show_company_address: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_company_address,
        initialValue: data?.show_company_address || false,
        fieldName: 'show_company_address',
        }),
        show_company_phone: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_company_phone,
        initialValue: data?.show_company_phone || false,
        fieldName: 'show_company_phone',
        }),
        show_company_email: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_company_email,
        initialValue: data?.show_company_email || false,
        fieldName: 'show_company_email',
        }),

        // Client
        show_customer_name: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_customer_name,
        initialValue: data?.show_customer_name || false,
        fieldName: 'show_customer_name',
        }),
        show_customer_phone: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_customer_phone,
        initialValue: data?.show_customer_phone || false,
        fieldName: 'show_customer_phone',
        }),
        show_shipping_address: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_shipping_address,
        initialValue: data?.show_shipping_address || false,
        fieldName: 'show_shipping_address',
        }),
        show_customer_city: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_customer_city,
        initialValue: data?.show_customer_city || false,
        fieldName: 'show_customer_city',
        }),

        // Document
        show_delivery_note_number: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_delivery_note_number,
        initialValue: data?.show_delivery_note_number || false,
        fieldName: 'show_delivery_note_number',
        }),
        show_order_reference: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_order_reference,
        initialValue: data?.show_order_reference || false,
        fieldName: 'show_order_reference',
        }),
        show_delivery_date: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_delivery_date,
        initialValue: data?.show_delivery_date || false,
        fieldName: 'show_delivery_date',
        }),
        show_payment_method: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_payment_method,
        initialValue: data?.show_payment_method || false,
        fieldName: 'show_payment_method',
        }),
        show_status: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_status,
        initialValue: data?.show_status || false,
        fieldName: 'show_status',
        }),

        // Produits
        show_product_image: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_product_image,
        initialValue: data?.show_product_image || false,
        fieldName: 'show_product_image',
        }),
        show_product_sku: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_product_sku,
        initialValue: data?.show_product_sku || false,
        fieldName: 'show_product_sku',
        }),
        show_quantity: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_quantity,
        initialValue: data?.show_quantity || false,
        fieldName: 'show_quantity',
        }),
        show_unit_price: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_unit_price,
        initialValue: data?.show_unit_price || false,
        fieldName: 'show_unit_price',
        }),
        show_line_total: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_line_total,
        initialValue: data?.show_line_total || false,
        fieldName: 'show_line_total',
        }),

        // Totaux
        show_subtotal: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_subtotal,
        initialValue: data?.show_subtotal || false,
        fieldName: 'show_subtotal',
        }),
        show_shipping_cost: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_shipping_cost,
        initialValue: data?.show_shipping_cost || false,
        fieldName: 'show_shipping_cost',
        }),
        show_discount: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_discount,
        initialValue: data?.show_discount || false,
        fieldName: 'show_discount',
        }),
        show_total: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_total,
        initialValue: data?.show_total || false,
        fieldName: 'show_total',
        }),
        show_offer: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_offer,
        initialValue: data?.show_offer || false,
        fieldName: 'show_offer',
        }),

        // Signatures
        show_customer_signature: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_customer_signature,
        initialValue: data?.show_customer_signature || false,
        fieldName: 'show_customer_signature',
        }),
        show_delivery_agent_signature: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_delivery_agent_signature,
        initialValue: data?.show_delivery_agent_signature || false,
        fieldName: 'show_delivery_agent_signature',
        }),
        show_stamp_area: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_stamp_area,
        initialValue: data?.show_stamp_area || false,
        fieldName: 'show_stamp_area',
        }),

        // Footer booléen
        show_footer: useFieldCheckbox({
        schema: DeliveryInvoiceSettingCheckboxSchema.shape.show_footer,
        initialValue: data?.show_footer || false,
        fieldName: 'show_footer',
        }),
    };
}

