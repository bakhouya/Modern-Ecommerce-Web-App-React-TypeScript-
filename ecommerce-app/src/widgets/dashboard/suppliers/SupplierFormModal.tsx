

import { useEffect } from 'react';
import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import InputText from '../../../components/forms/InputText';
import { Checkbox } from '../../../components/forms/Checkbox';
import { FormModal } from '../../../components/ui/FormModal';
import { useTranslation } from 'react-i18next';
import type { SupplierTypes } from '../../../types/supplierTypes';
import { SupplierSchema, type SupplierFormType } from '../../../validations/supplierSchema';

interface Props {
    isOpen: boolean;
    isPending: boolean ;
    onClose: () => void ;
    onSave: (data: SupplierFormType, setErrors: (errors: Record<string, string>) => void) => void;
    initialData?: SupplierTypes | null ;
}

export const SupplierFormModal = ({ isOpen, isPending, onClose, onSave, initialData }: Props) => {
    const { t } = useTranslation();

    const fields = { title : '' , address: '',  phone: '',  web: '',  whatsapp: '', telegram: '',}
    const form = useFieldText(SupplierSchema, fields);
    const statusField = useFieldCheckbox({schema: SupplierSchema.shape.status, initialValue: true, fieldName: 'status'});

    useEffect(() => {
        if (initialData) {
            form.setValues({ 
                title : initialData?.title || '' ,
                address: initialData?.address || '',
                phone: initialData?.phone || '',
                web: initialData?.web || '',
                whatsapp: initialData?.whatsapp || '',
                telegram: initialData?.telegram || '',
            })
            statusField.setValue(initialData?.status || false);                       
        } else {
            form.setValues(fields)
            statusField.setValue(false);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.validate()) return ;
        const data: SupplierFormType = {
            title       : form.values.title,
            address     : form.values.address,
            phone       : form.values.phone,
            web         : form.values.web,
            whatsapp    : form.values.whatsapp,
            telegram    : form.values.telegram,
            status      : statusField.value
        };
        onSave(data, (errors) => {
            form.setErrors(errors)
        });
        
    };

    const title = initialData ? t('modal.titleEdit', { entity: t('entities.supplier') }) : t('modal.titleAdd', { entity: t('entities.supplier') });

    if (!isOpen) return null ;

    return (

        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={title}
            submitLabel={initialData ? t('common.update') : t('common.create')}
            isEdit={!!initialData} 
            isPending={isPending}>
            

            <div className="my_end_15">
                <InputText
                    type="text"
                    label={t('fields.title')}
                    value={form.values.title}
                    onChange={(e) => form.handleChange('title', e.target.value)}
                    error={form.errors.title}
                />
            </div>
            <div className="my_end_15">
                <InputText
                    type="text"
                    label={t('fields.address')}
                    value={form.values.address}
                    onChange={(e) => form.handleChange('address', e.target.value)}
                    error={form.errors.address}
                />
            </div>
            <div className="my_end_15">
                <InputText
                    type="text"
                    label={t('fields.phone')}
                    value={form.values.phone}
                    onChange={(e) => form.handleChange('phone', e.target.value)}
                    error={form.errors.phone}
                />
            </div>
            <div className="my_end_15">
                <InputText
                    type="text"
                    label={t('fields.web')}
                    value={form.values.web}
                    onChange={(e) => form.handleChange('web', e.target.value)}
                    error={form.errors.web}
                />
            </div>
            <div className="my_end_15">
                <InputText
                    type="text"
                    label={t('fields.whatsapp')}
                    value={form.values.whatsapp}
                    onChange={(e) => form.handleChange('whatsapp', e.target.value)}
                    error={form.errors.whatsapp}
                />
            </div>
            <div className="my_end_15">
                <InputText
                    type="text"
                    label={t('fields.telegram')}
                    value={form.values.telegram}
                    onChange={(e) => form.handleChange('telegram', e.target.value)}
                    error={form.errors.telegram}
                />
            </div>

            <div className="my_start_15">
                <Checkbox
                    label={t('policy.form.status')}
                    desc={t('policy.form.statusDesc')}
                    checked={statusField.value}
                    onChange={statusField.onChange}
                    error={statusField.error}
                />
            </div>

        </FormModal>

    );

};
