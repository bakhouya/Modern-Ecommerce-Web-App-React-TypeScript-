


import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import InputText from '../../../components/forms/InputText';
import { OrderInvoicesSettingCheckboxSchema, OrderInvoicesSettingTextSchema,  } from '../../../validations/settingsSchema';
import { UpdateOrderInvoiceSettings } from '../../../services/settings/settingsService';
import { handleBackendErrors } from '../../../helpers/handleValidationErrors';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { useOrderInvoiceSettings } from '../../../context/settings/OrderInvoiceSettingsContext';
import { companyFields, customerFields, orderFields, totalFields } from '../../../models/settings/OrderInvoicesFields';
import { CheckboxGroup } from '../../../components/forms/CheckboxGroup';
import type { OrderInvoicesSettings } from '../../../types/settingsTypes';



interface PropsTypes {pageTitle: string;}

export default function UpdateSettingsOrderInvoices({pageTitle}: PropsTypes) {

    const queryClient = useQueryClient() ;
    const { settingsQuery } = useOrderInvoiceSettings() ;
    const { data } = settingsQuery ;

    const form = useFieldText(OrderInvoicesSettingTextSchema, {title: '', footer_message: ''});     
    const checkboxes = useInvoiceCheckboxes(data);



    useEffect(() => {

        if (!data) return;
        
        form.setValues({
            title: data.title || '',
            footer_message: data.footer_message || '',
        });

    }, [data]);



    const mutation = useMutation({
        mutationFn: UpdateOrderInvoiceSettings,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['orderinvoicesetting']});
            toast.success('Paramètres mis à jour');
            form.setErrors({});
        },
        onError: (error: unknown) => {
            handleBackendErrors(error, form.setErrors);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.validate()) return;

        const putData = {
            ...form.values,
            ...Object.fromEntries(Object.entries(checkboxes).map(([key, field]) => [key, field.value])),
        };

        mutation.mutate(putData);
    };

    
    return (
        <form className="py_start_15 py_end_5" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-2 gap-4">

                {/* ========== 1. Informations générales ========== */}
                <div className="">
                    <SectionHeader title={pageTitle} description="Titre, description et identité visuelle du site."/>

                    <div className="">
                        <InputText
                            type="text"
                            label="Nom de factoration"
                            value={form.values.title}
                            onChange={(e) => form.handleChange("title", e.target.value)}
                            error={form.errors.title}
                        />
                    </div>

                    <div className="">

                        <CheckboxGroup
                            title="Info Company"
                            fields={companyFields}
                            checkboxes={checkboxes}
                        />

                    </div>

                    <div className="">
                       
                        <CheckboxGroup
                            title="Information de client"
                            fields={customerFields}
                            checkboxes={checkboxes}
                        />
                    </div>

                    <div className="">
                      
                        <CheckboxGroup
                            title="Information de Commande"
                            fields={orderFields}
                            checkboxes={checkboxes}
                        />
                    </div>

                    <div className="">
                     
                        <CheckboxGroup
                            title="Information de Total facturation"
                            fields={totalFields}
                            checkboxes={checkboxes}
                        />
                    </div>

                    <div className="">
                        <InputText
                            type="text"
                            label="Message de pied de page"
                            value={form.values.footer_message}
                            onChange={(e) => form.handleChange("footer_message", e.target.value)}
                            error={form.errors.footer_message}
                        />
                    </div>

                </div>


            </div>






            <div className="divider my_12"></div>   

            <div className="flex_end_center my_start_12">
                <button type="submit" className="btn primary lg" disabled={mutation.isPending}>
                    {mutation.isPending 
                        ? <span className="btn_loader"></span> 
                        : <span className="text text_md"> Modéfier </span> 
                    }
                </button>
            </div>

        </form>
    );

}

function useInvoiceCheckboxes(data?: Partial<OrderInvoicesSettings>) {

    return {

        show_logo : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_logo,
            initialValue: data?.show_logo || false,
            fieldName: 'show_logo',
        }),
        show_company_name : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_company_name,
            initialValue: data?.show_company_name || false,
            fieldName: 'show_company_name',
        }),
        show_company_address : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_company_address,
            initialValue: data?.show_company_address || false,
            fieldName: 'show_company_address',
        }),
        show_company_phone : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_company_phone,
            initialValue: data?.show_company_phone || false,
            fieldName: 'show_company_phone',
        }),
        show_company_email : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_company_email,
            initialValue: data?.show_company_email || false,
            fieldName: 'show_company_email',
        }),
        show_order_number : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_order_number,
            initialValue: data?.show_order_number || false,
            fieldName: 'show_order_number',
        }),
        show_order_date : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_order_date,
            initialValue: data?.show_order_date || false,
            fieldName: 'show_order_date',
        }),
        show_customer_name : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_customer_name,
            initialValue: data?.show_customer_name || false,
            fieldName: 'show_customer_name',
        }),
        show_customer_phone : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_customer_phone,
            initialValue: data?.show_customer_phone || false,
            fieldName: 'show_customer_phone',
        }),
        show_shipping_address : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_shipping_address,
            initialValue: data?.show_shipping_address || false,
            fieldName: 'show_shipping_address',
        }),
        show_customer_city : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_customer_city,
            initialValue: data?.show_customer_city || false,
            fieldName: 'show_customer_city',
        }),
        show_payment_method : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_payment_method,
            initialValue: data?.show_payment_method || false,
            fieldName: 'show_payment_method',
        }),
        show_status : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_status,
            initialValue: data?.show_status || false,
            fieldName: 'show_status',
        }),
        show_subtotal : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_subtotal,
            initialValue: data?.show_subtotal || false,
            fieldName: 'show_subtotal',
        }),
        show_shipping_cost : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_shipping_cost,
            initialValue: data?.show_shipping_cost || false,
            fieldName: 'show_shipping_cost',
        }),
        show_discount : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_discount,
            initialValue: data?.show_discount || false,
            fieldName: 'show_discount',
        }),
        show_total : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_total,
            initialValue: data?.show_total || false,
            fieldName: 'show_total',
        }),
        show_footer : useFieldCheckbox({
            schema: OrderInvoicesSettingCheckboxSchema.shape.show_footer,
            initialValue: data?.show_footer || false,
            fieldName: 'show_footer',
        })

    };
    
}





