

import { useEffect } from 'react';
import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import InputText from '../../../components/forms/InputText';
import { Checkbox } from '../../../components/forms/Checkbox';
import { FormModal } from '../../../components/ui/FormModal';
import { Textarea } from '../../../components/forms/Textarea';
import { useTranslation } from 'react-i18next';
import { BranchSchema, type BranchFormType } from '../../../validations/branchSchema';
import { useFieldSelect } from '../../../hooks/useFieldSelect';
import type { BranchTypes } from '../../../types/branchTypes';
import Cities from '../profiles/Cities';

interface Props {
  isOpen        : boolean;
  onClose       : () => void;
  onSave        : (data: BranchFormType, setErrors: (errors: Record<string, string>) => void) => void;
  initialData?  : BranchTypes | null ;
}

export const BranchFormModal = ({ isOpen, onClose, onSave, initialData }: Props) => {
    const { t } = useTranslation();

    const fieldsForm = {title: '', address: '', phone: '' }  
    const form = useFieldText(BranchSchema, fieldsForm);

    const statusField = useFieldCheckbox({
        schema: BranchSchema.shape.status,
        initialValue: true,
        fieldName: 'status',
    });
    const cities = useFieldSelect<string[]>({ initialValue: initialData?.branch_cities?.map((city) => city.id) || []});

    useEffect(() => {
        if (initialData) {
            form.setValues({ 
                title   : initialData?.title || '' ,
                address : initialData?.address || '',
                phone   : initialData?.phone || '',
            })
            statusField.setValue(initialData?.status || false);            
        } else {
            form.setValues(fieldsForm)
            statusField.setValue(false);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.validate()) return;

        const data: BranchFormType = {
            title   : form.values.title,
            address : form.values.address,
            phone   : form.values.phone,
            cities  : cities.value ?? [],
            status: statusField.value,
        };

        onSave(data, (errors) => form.setErrors(errors));
    };

    const title = initialData ? t('modal.titleEdit', { entity: t('entities.branch') }) : t('modal.titleAdd', { entity: t('entities.branch') });

    if (!isOpen) {
        return null 
        form.setErrors({})
    };

    return (

        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={title}
            submitLabel={initialData ? t('common.update') : t('common.create')}
            isEdit={!!initialData}>

            <div className="box_input">
                <InputText
                    type="text"
                    label={t('fields.title')}
                    value={form.values.title}
                    onChange={(e) => form.handleChange('title', e.target.value)}
                    error={form.errors.title}
                />
            </div>

            <div className="box_input">
                <Textarea
                    label={t('fields.address')}
                    value={form.values.address}
                    onChange={(e) => form.handleChange('address', e.target.value)}
                    error={form.errors.address}
                    rows={4} 
                />
            </div>

            <div className="box_input">
                <InputText
                    type="text"
                    label={t('fields.phone')}
                    value={form.values.phone}
                    onChange={(e) => form.handleChange('phone', e.target.value)}
                    error={form.errors.phone}
                />
            </div>
            
            <div className="box_input">
                <Cities
                    value={cities.value}
                    onChange={cities.handleChange}
                    error={cities.error}
                    multi={true}
                    required={false}
                />
            </div>

            <div className="my_start_15">
                <Checkbox
                    label={t('fields.status')}
                    desc={t('policy.form.statusDesc')}
                    checked={statusField.value}
                    onChange={statusField.onChange}
                    error={statusField.error}
                />
            </div>

        </FormModal>

    );

};
