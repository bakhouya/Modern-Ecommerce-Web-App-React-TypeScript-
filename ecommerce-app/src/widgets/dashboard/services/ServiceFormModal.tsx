

import { useEffect } from 'react';
import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import InputText from '../../../components/forms/InputText';
import { Checkbox } from '../../../components/forms/Checkbox';
import { FormModal } from '../../../components/ui/FormModal';
import type { ServiceTypes } from '../../../types/serviceTypes';
import {ServiceSchema} from '../../../validations/ServiceSchema';
import { Textarea } from '../../../components/forms/Textarea';
import { useTranslation } from 'react-i18next';
import { useFieldFile } from '../../../hooks/useFieldFile';
import { FileUploader } from '../../../components/forms/FileUploader';

interface Props {
    isOpen: boolean;
    onClose: () => void ;
    onSave: (data: FormData, setErrors: (errors: Record<string, string>) => void) => void;
    initialData?: ServiceTypes | null ;
}

export const ServiceFormModal = ({ isOpen, onClose, onSave, initialData }: Props) => {
    const { t } = useTranslation();

    const form = useFieldText(ServiceSchema, {title: '', description: '', });

    const statusField = useFieldCheckbox({schema: ServiceSchema.shape.status, initialValue: true, fieldName: 'status'});
    const image = useFieldFile({multiple: false, required: false, maxSize: 2});

    useEffect(() => {
        if (initialData) {
            form.setValues({ 
                title : initialData?.title || '' ,
                description: initialData?.description || '',
            })
            statusField.setValue(initialData?.status || false);                       
        } else {
            form.setValues({ 
                title : '' ,
                description: '' ,
            })
            statusField.setValue(false);
        }
    }, [initialData, isOpen]);

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!form.validate()) return;

    //     const data: ServiceFormType = {
    //         title: form.values.title,
    //         description: form.values.description,
    //         status: statusField.value,
    //         image : image.files[0],
    //     };

    //     onSave(data, (errors) => form.setErrors(errors));
    //     onClose();
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.validate() || !image.validate()) {return;}

        const formData = new FormData();

        Object.entries(form.values).forEach(([key, value]) => {formData.append(key, String(value ?? ''));});
        formData.append('status', String(statusField.value));
        if (image.files[0]) {formData.append('image', image.files[0]);}

        onSave(formData, (errors) => form.setErrors(errors));
        onClose();

    };

    const title = initialData ? t('modal.titleEdit', { entity: t('entities.service') }) : t('modal.titleAdd', { entity: t('entities.service') });

    if (!isOpen) return null;

    return (

        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={title}
            submitLabel={initialData ? t('common.update') : t('common.create')}
            isEdit={!!initialData}>
            
            <div className="">
                <FileUploader
                    label={t('fields.image')}
                    previews={image.previews}
                    initialPreviews={initialData?.image ? [initialData.image] : []}
                    error={image.error}
                    onAddFiles={image.addFiles}
                    onRemoveFile={image.removeFile}
                />
            </div>

            <div>
                <InputText
                    type="text"
                    label={t('policy.form.title')}
                    value={form.values.title}
                    onChange={(e) => form.handleChange('title', e.target.value)}
                    error={form.errors.title}
                />
            </div>
            <div>
                <Textarea
                    label={t('policy.form.description')}
                    value={form.values.description}
                    onChange={(e) => form.handleChange('description', e.target.value)}
                    error={form.errors.description}
                    rows={4} 
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
