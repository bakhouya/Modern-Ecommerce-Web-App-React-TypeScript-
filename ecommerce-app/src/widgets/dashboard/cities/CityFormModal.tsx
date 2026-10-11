

import { useEffect } from 'react';
import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import { citySchema, type CityFormType } from '../../../validations/citySchema';
import type { CityTypes } from '../../../types/cityTypes';
import InputText from '../../../components/forms/InputText';
import { Checkbox } from '../../../components/forms/Checkbox';
import { FormModal } from '../../../components/ui/FormModal';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CityFormType, setErrors: (errors: Record<string, string>) => void) => void;
  initialData?: CityTypes | null;
}

export const CityFormModal = ({ isOpen, onClose, onSave, initialData }: Props) => {
    const { t } = useTranslation();
    const titleField = useFieldText(citySchema.pick({ title: true }), { title: '' });
    const statusField = useFieldCheckbox({
        schema: citySchema.shape.status,
        initialValue: true,
        fieldName: 'status',
    });
    const { setValues: setTitleValues } = titleField;
    const { setValue: setStatusValue } = statusField;

    useEffect(() => {
        if (initialData) {
            setTitleValues({ title: initialData.title });
            setStatusValue(initialData.status);
        } else {
            setTitleValues({ title: '' });
            setStatusValue(true);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!titleField.validate()) return;

            const data: CityFormType = {
                title: titleField.values.title,
                status: statusField.value,
            };

            onSave(data, (errors) => titleField.setErrors(errors));
            onClose();
    };

    const title = initialData ? t('modal.titleEdit', { entity: t('entities.city') }) : t('modal.titleAdd', { entity: t('entities.city') });

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
                    label={t('city.form.title')}
                    value={titleField.values.title}
                    onChange={(e) => titleField.handleChange('title', e.target.value)}
                    error={titleField.errors.title}
                />
            </div>

            <div className="my_start_15">
                <Checkbox
                    label={t('city.form.status')}
                    desc={t('city.form.statusDesc')}
                    checked={statusField.value}
                    onChange={statusField.onChange}
                    error={statusField.error}
                />
            </div>

        </FormModal>

    );

};