

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
import type { SliderTypes } from '../../../types/sliderTypes';
import { SliderSchema } from '../../../validations/sliderSchema';

interface Props {
    isOpen      : boolean;
    isPending   : boolean;
    onClose     : () => void ;
    onSave      : (data: FormData, setErrors: (errors: Record<string, string>) => void) => void;
    initialData?: SliderTypes | null ;
}

export const SliderFormModal = ({ isOpen, isPending, onClose, onSave, initialData }: Props) => {
    const { t } = useTranslation();

    const fields = {title: '', description: '',  position: 0, url: ''}
    const form = useFieldText(SliderSchema, fields);
    const statusField = useFieldCheckbox({schema: SliderSchema.shape.status, initialValue: true, fieldName: 'status'});
    const image = useFieldFile({multiple: false, required: false, maxSize: 2});

    

    useEffect(() => {
        if (initialData) {
            form.setValues({ 
                title       : initialData?.title || '' ,
                description : initialData?.description || '',
                position    : initialData?.position || '',
                url         : initialData?.url || '',
            })
            statusField.setValue(initialData?.status || false);                       
        } else {
            form.setValues(fields)
            statusField.setValue(false);
        }
    }, [initialData, isOpen]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.validate() || !image.validate()) {return;}

        const formData = new FormData();

        Object.entries(form.values).forEach(([key, value]) => {formData.append(key, String(value ?? ''));});

        formData.append('status', String(statusField.value));

        if (image.files[0]) {formData.append('image', image.files[0]);}

        onSave(formData, (errors) => form.setErrors(errors));

    };

    const title = initialData 
        ? t('modal.titleEdit', { entity: t('models.slider.singular') }) 
        : t('modal.titleAdd', { entity: t('models.slider.singular') });

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
                    label={t('fields.title')}
                    value={form.values.title}
                    onChange={(e) => form.handleChange('title', e.target.value)}
                    error={form.errors.title}
                />
            </div>

            <div>
                <Textarea
                    label={t('fields.description')}
                    value={form.values.description}
                    onChange={(e) => form.handleChange('description', e.target.value)}
                    error={form.errors.description}
                    rows={4} 
                />
            </div>

            <div className='my_start_12'>
                <InputText
                    type="number"
                    label={t('fields.position')}
                    value={form.values.position}
                    onChange={(e) => form.handleChange('position', e.target.value)}
                    error={form.errors.position}
                />
            </div>

            <div className='my_start_12'>
                <InputText
                    type="url"
                    label={t('fields.url')}
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
