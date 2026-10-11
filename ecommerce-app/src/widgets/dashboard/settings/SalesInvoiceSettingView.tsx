

import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';

import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import InputText from '../../../components/forms/InputText';
import { CheckboxGroup } from '../../../components/forms/CheckboxGroup';
import { SectionHeader } from '../../../components/ui/SectionHeader';

import { SalesInvoiceSettingCheckboxSchema, SalesInvoiceSettingTextSchema} from '../../../validations/settingsSchema';
import { UpdateSalesInvoiceSettings } from '../../../services/settings/settingsService';
import { handleBackendErrors } from '../../../helpers/handleValidationErrors';
import { useSalesInvoiceSettings } from '../../../context/settings/SalesInvoiceSettingsContext';
import { 
  useSalesCompanyFields, useSalesCustomerFields, useSalesInvoiceFields, useSalesFooterField
} from '../../../models/settings/SalesInvoicesFields';

import type { SalesInvoiceSettings } from '../../../types/settingsTypes';
import { SubmitButton } from '../../../components/ui/SubmitButton';

interface PropsTypes {pageTitle: string;}

export default function UpdateSettingsSalesInvoices({ pageTitle }: PropsTypes) {
    const { t } = useTranslation();
    const salesCompanyFields = useSalesCompanyFields();
    const salesCustomerFields = useSalesCustomerFields();
    const salesInvoiceFields = useSalesInvoiceFields();
    const salesFooterField = useSalesFooterField();

    const queryClient = useQueryClient();
    const { settingsQuery } = useSalesInvoiceSettings();
    const { data } = settingsQuery;

    const form = useFieldText(SalesInvoiceSettingTextSchema, { title: '', footer_message: ''});
    const checkboxes = useSalesInvoiceCheckboxes(data);

    useEffect(() => {
        if (!data) return;
        form.setValues({
          title: data.title || '',
          footer_message: data.footer_message || '',
        });
    }, [data]);

    const mutation = useMutation({
        mutationFn: UpdateSalesInvoiceSettings,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['SalesInvoiceSettings'] });
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
        <form className=" py_end_5" onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <SectionHeader title={pageTitle} description={t('salesSettings.pageDescription')}/>

              {/* Titre principal */}
              <div className="box_input">
                <InputText
                    type="text"
                    label={t('salesSettings.labels.invoiceTitle')}
                    value={form.values.title}
                    onChange={(e) => form.handleChange('title', e.target.value)}
                    error={form.errors.title}
                />
              </div>


              {/* Section Entreprise */}
              <CheckboxGroup title={t('salesSettings.sectionTitles.company')} fields={salesCompanyFields} checkboxes={checkboxes}/>

              {/* Section Client */}
              <CheckboxGroup title={t('salesSettings.sectionTitles.customer')} fields={salesCustomerFields} checkboxes={checkboxes}/>

              {/* Section Facture */}
              <CheckboxGroup title={t('salesSettings.sectionTitles.invoice')} fields={salesInvoiceFields} checkboxes={checkboxes}/>

              {/* Pied de page (booléen + message) */}
              <CheckboxGroup title={t('salesSettings.sectionTitles.footer')} fields={salesFooterField} checkboxes={checkboxes}/>

              <div>
                <InputText
                  type="text"
                  label={t('salesSettings.labels.footerMessage')}
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

// ==================== Hook des checkboxes pour SalesInvoiceSettings ====================
function useSalesInvoiceCheckboxes(data?: Partial<SalesInvoiceSettings>) {
    return {
      // Entreprise
      show_logo: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_logo,
        initialValue: data?.show_logo || false,
        fieldName: 'show_logo',
      }),
      show_company_name: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_company_name,
        initialValue: data?.show_company_name || false,
        fieldName: 'show_company_name',
      }),
      show_company_address: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_company_address,
        initialValue: data?.show_company_address || false,
        fieldName: 'show_company_address',
      }),
      show_company_phone: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_company_phone,
        initialValue: data?.show_company_phone || false,
        fieldName: 'show_company_phone',
      }),
      show_company_email: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_company_email,
        initialValue: data?.show_company_email || false,
        fieldName: 'show_company_email',
      }),

      // Client
      show_customer_name: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_customer_name,
        initialValue: data?.show_customer_name || false,
        fieldName: 'show_customer_name',
      }),
      show_customer_address: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_customer_address,
        initialValue: data?.show_customer_address || false,
        fieldName: 'show_customer_address',
      }),
      show_customer_phone: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_customer_phone,
        initialValue: data?.show_customer_phone || false,
        fieldName: 'show_customer_phone',
      }),
      show_customer_city: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_customer_city,
        initialValue: data?.show_customer_city || false,
        fieldName: 'show_customer_city',
      }),

      // Facture
      show_invoice_number: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_invoice_number,
        initialValue: data?.show_invoice_number || false,
        fieldName: 'show_invoice_number',
      }),
      show_issue_date: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_issue_date,
        initialValue: data?.show_issue_date || false,
        fieldName: 'show_issue_date',
      }),
      show_order_reference: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_order_reference,
        initialValue: data?.show_order_reference || false,
        fieldName: 'show_order_reference',
      }),
      show_payment_method: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_payment_method,
        initialValue: data?.show_payment_method || false,
        fieldName: 'show_payment_method',
      }),
      show_payment_status: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_payment_status,
        initialValue: data?.show_payment_status || false,
        fieldName: 'show_payment_status',
      }),
      // Footer booléen
      show_footer: useFieldCheckbox({
        schema: SalesInvoiceSettingCheckboxSchema.shape.show_footer,
        initialValue: data?.show_footer || false,
        fieldName: 'show_footer',
      }),
    };
}
