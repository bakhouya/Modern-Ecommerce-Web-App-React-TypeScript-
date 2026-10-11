

import { useEffect } from 'react';
import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import InputText from '../../../components/forms/InputText';
import { Checkbox } from '../../../components/forms/Checkbox';
import { FormModal } from '../../../components/ui/FormModal';
import type { PolicyTypes } from '../../../types/policyTypes';
import {PolicySchema, type PolicyFormType } from '../../../validations/policySchema';
import { Textarea } from '../../../components/forms/Textarea';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PolicyFormType, setErrors: (errors: Record<string, string>) => void) => void;
  initialData?: PolicyTypes | null ;
}

export const PolicyFormModal = ({ isOpen, onClose, onSave, initialData }: Props) => {
    const { t } = useTranslation();

    const form = useFieldText(PolicySchema, {title: '', description: '', });

    const statusField = useFieldCheckbox({
        schema: PolicySchema.shape.status,
        initialValue: true,
        fieldName: 'status',
    });

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

    const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!form.validate()) return;

            const data: PolicyFormType = {
                title: form.values.title,
                description: form.values.description,
                status: statusField.value,
            };

            onSave(data, (errors) => form.setErrors(errors));
            onClose();
    };

    const title = initialData ? t('modal.titleEdit', { entity: t('entities.policy') }) : t('modal.titleAdd', { entity: t('entities.policy') });

    if (!isOpen) return null;

    return (

        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={title}
            submitLabel={initialData ? t('common.update') : t('common.create')}
            isEdit={!!initialData}>

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
