

import {  useState } from 'react';
import { useFieldText } from '../../../hooks/useFieldText';
import InputText from '../../../components/forms/InputText';
import { FormModal } from '../../../components/ui/FormModal';
import { useTranslation } from 'react-i18next';
import type { PermissionGroupTypes, RoleTypes } from '../../../types/RolesTypes';
import { RoleSchema, type RoleFormType } from '../../../validations/roleSchema';
import { PermissionSelector } from '../../../components/forms/PermissionSelector';

interface Props {
  isOpen        : boolean;
  onClose       : () => void;
  onSave        : (data: RoleFormType, setErrors: (errors: Record<string, string>) => void) => void;
  initialData?  : RoleTypes | null ;
  permissions   : PermissionGroupTypes[];
}

export const RoleFormModal = ({ isOpen, onClose, onSave, initialData, permissions }: Props) => {
    const { t } = useTranslation();

    const fieldsForm = { name: initialData?.name || '' };  
    const form = useFieldText(RoleSchema.shape.name, fieldsForm);
    const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>(
        () => initialData?.permissions?.map(p => p.id) || []
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // if (!form.validate()) return;
        const data: RoleFormType = {
            name           : form.values.name,
            permissions_ids: selectedPermissionIds,
        };
        onSave(data, (errors) => form.setErrors(errors));
    };

    const title = initialData 
        ? t('modal.titleEdit', { entity: t('models.role.singular') }) 
        : t('modal.titleAdd', { entity: t('models.role.singular') });

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
                    value={form.values.name}
                    onChange={(e) => form.handleChange('name', e.target.value)}
                    error={form.errors.name}
                />
            </div>

            <div className="box_input" style={{ marginTop: '1rem' }}>
                <label className="text text_lg" style={{ marginBottom: '0.5rem', display: 'block' }}>
                    {t('fields.permissions')}
                </label>
                <PermissionSelector
                    groups={permissions}
                    selectedIds={selectedPermissionIds}
                    onChange={setSelectedPermissionIds}/>
            </div>



        </FormModal>

    );

};
