

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
import { useFieldSelect } from '../../../hooks/useFieldSelect';
import type { BrandTypes } from '../../../types/brandTypes';
import { BrandSchema } from '../../../validations/brandSchema';
import CtaegoryParentSelect from '../categories/CategoryParent';

interface Props {
    isOpen      : boolean;
    isPending   : boolean;
    onClose     : () => void ;
    onSave      : (data: FormData, setErrors: (errors: Record<string, string>) => void) => void;
    initialData?: BrandTypes | null ;
}

export const BrandFormModal = ({ isOpen, isPending, onClose, onSave, initialData }: Props) => {
    const { t } = useTranslation();

    const fields = {title: '', description: '', slug: ''}
    const form = useFieldText(BrandSchema, fields);
    const statusField = useFieldCheckbox({schema: BrandSchema.shape.status, initialValue: true, fieldName: 'status'});
    const image = useFieldFile({multiple: false, required: false, maxSize: 2});
    const Categories = useFieldSelect<string[]>({
        initialValue: initialData?.category_details?.map((cat) => cat.id).filter((id): id is string => id !== undefined) || []
    });


    useEffect(() => {
        if (initialData) {
            form.setValues({ 
                title       : initialData?.title || '' ,
                description : initialData?.description || '',
                slug        : initialData?.slug || '',
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

        if (Categories.value && Array.isArray(Categories.value) && Categories.value.length > 0) {
            Categories.value.forEach((categoryId) => {formData.append('categories', categoryId);});
        }

        if (image.files[0]) {formData.append('image', image.files[0]);}

        onSave(formData, (errors) => (form.setErrors(errors)));
        

    };

    const title = initialData 
        ? t('modal.titleEdit', { entity: t('models.brand.singular') }) 
        : t('modal.titleAdd', { entity: t('models.brand.singular') });

    if (!isOpen) return null;

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
                    key={initialData?.id || 'new'}
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

            <div className="box_input">
                <div className="text text_lg my_end_6"> {t('models.category.singular')} </div>
                <CtaegoryParentSelect
                    value={Categories.value}
                    onChange={(val) => {
                        if (Array.isArray(val)) {
                            Categories.handleChange(val);
                        } else if (val) {
                            Categories.handleChange([val]);
                        } else {
                            Categories.handleChange([]);
                        }
                    }}
                    error={Categories.error}
                    multi={true}
                    required={false}
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
