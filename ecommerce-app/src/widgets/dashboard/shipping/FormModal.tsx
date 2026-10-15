

import { useEffect } from 'react';
import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import InputText from '../../../components/forms/InputText';
import { Checkbox } from '../../../components/forms/Checkbox';
import { FormModal } from '../../../components/ui/FormModal';
import { Textarea } from '../../../components/forms/Textarea';
import { useTranslation } from 'react-i18next';
import { useFieldFile } from '../../../hooks/useFieldFile';
import { FileUploader } from '../../../components/forms/FileUploader';
import type { ShippingTypes } from '../../../types/shippingsTypes';
import { ShippingSchema } from '../../../validations/shippingSchema';

interface Props {
    isOpen          : boolean;
    isPending       : boolean ;
    onClose         : () => void ;
    onSave          : (data: FormData, setErrors: (errors: Record<string, string>) => void) => void;
    initialData?    : ShippingTypes | null ;
}

export const ShippingFormModal = ({ isOpen, isPending, onClose, onSave, initialData }: Props) => {
    const { t } = useTranslation();

    const fieldsForm = {title: '', address: '',  phone: '',  url: ''}
    const form = useFieldText(ShippingSchema, fieldsForm);

    const statusField = useFieldCheckbox({schema: ShippingSchema.shape.status, initialValue: true, fieldName: 'status'});
    const logo = useFieldFile({multiple: false, required: false, maxSize: 2});

    useEffect(() => {
        if (initialData) {
            form.setValues({ 
                title   : initialData?.title || '' ,
                address : initialData?.address || '',
                phone   : initialData?.phone || '',
                url     : initialData?.url || '',
            })
            statusField.setValue(initialData?.status || false);                       
        } else {
            form.setValues(fieldsForm)
            statusField.setValue(false);
        }
    }, [initialData, isOpen]);


    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        if (!form.validate() || !logo.validate()) {return;}

        const formData = new FormData();

        Object.entries(form.values).forEach(([key, value]) => {formData.append(key, String(value ?? ''));});

        formData.append('status', String(statusField.value));

        if (logo.files[0]) {formData.append('logo', logo.files[0]);}

        console.log(formData)
        onSave(formData, (errors) => form.setErrors(errors));

    };

    const title = initialData ? t('modal.titleEdit', { entity: t('entities.shipping') }) : t('modal.titleAdd', { entity: t('entities.shipping') });

    if (!isOpen) return null;

    return (

        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={title}
            submitLabel={initialData ? t('common.update') : t('common.create')}
            isEdit={!!initialData} isPending={isPending} >
            
            <div className="my_end_12">
                <FileUploader
                    label={t('fields.logo')}
                    previews={logo.previews}
                    initialPreviews={initialData?.logo ? [initialData.logo] : []}
                    error={logo.error}
                    onAddFiles={logo.addFiles}
                    onRemoveFile={logo.removeFile}
                />
            </div>

            <div className="my_end_12">
                <InputText
                    type="text"
                    label={t('fields.title')}
                    value={form.values.title}
                    onChange={(e) => form.handleChange('title', e.target.value)}
                    error={form.errors.title}
                />
            </div>

            <div className="my_end_12">
                <Textarea
                    label={t('fields.address')}
                    value={form.values.address}
                    onChange={(e) => form.handleChange('address', e.target.value)}
                    error={form.errors.address}
                    rows={4} 
                />
            </div>

            <div className="my_end_12">
                <InputText
                    type="text"
                    label={t('fields.phone')}
                    value={form.values.phone}
                    onChange={(e) => form.handleChange('phone', e.target.value)}
                    error={form.errors.phone}
                />
            </div>

            <div>
                <InputText
                    type="text"
                    label={t('fields.web')}
                    value={form.values.url}
                    onChange={(e) => form.handleChange('url', e.target.value)}
                    error={form.errors.url}
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
