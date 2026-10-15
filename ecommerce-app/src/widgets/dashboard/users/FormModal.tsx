

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
import type { UserTypes } from '../../../types/userTypes';
import { UserSchema } from '../../../validations/userSchema';
import { useActiveCities } from '../../../controllers/useCities';
import { useActiveBranches } from '../../../controllers/useBranch';
import { useGroups } from '../../../controllers/useRoles';
import { AccordionSelect } from '../../../components/forms/AccordionSelect';

interface Props {
    isOpen      : boolean;
    isPending   : boolean;
    onClose     : () => void ;
    onSave      : (data: FormData, setErrors: (errors: Record<string, string>) => void) => void;
    initialData?: UserTypes | null ;

    selectedCityIds: string[];
    selectedBranchIds: string[];
    selectedGroupIds: number[];
    onSelectedCityChange: (ids: string[]) => void;
    onSelectedBranchChange: (ids: string[]) => void;
    onSelectedGroupChange: (ids: number[]) => void;
}

export const UserFormModal = ({ isOpen, isPending, onClose, onSave, initialData, selectedCityIds, selectedBranchIds, selectedGroupIds, onSelectedCityChange, onSelectedBranchChange, onSelectedGroupChange }: Props) => {
    const { t } = useTranslation();

    const { data: citiesData, isLoading: citiesLoading } = useActiveCities();
    const { data: branchesData, isLoading: branchesLoading } = useActiveBranches();
    const { data: groupsData, isLoading: groupsLoading } = useGroups();

    const fields = {username: '', email: '', full_name: '', phone: '', address: '', password: ""}
    const form = useFieldText(UserSchema, fields);
    const is_active = useFieldCheckbox({schema: UserSchema.shape.is_active, initialValue: false, fieldName: 'is_active'});
    const is_superuser = useFieldCheckbox({schema: UserSchema.shape.is_superuser, initialValue: false, fieldName: 'is_superuser'});
    const is_staff = useFieldCheckbox({schema: UserSchema.shape.is_staff, initialValue: false, fieldName: 'is_staff'});
    const can_view_all_branches = useFieldCheckbox({schema: UserSchema.shape.can_view_all_branches, initialValue: false, fieldName: 'can_view_all_branches'});

    const avatar = useFieldFile({multiple: false, required: false, maxSize: 2});

    useEffect(() => {
        if (initialData) {
            form.setValues({ 
                username    : initialData?.username || '' ,
                email       : initialData?.email || '',
                full_name   : initialData?.full_name || '',
                phone       : initialData?.phone || '',
                address     : initialData?.address || '',
                password    : initialData?.password || '',
            })
            is_active.setValue(initialData?.is_active || false);                       
            is_superuser.setValue(initialData?.is_superuser || false);                       
            is_staff.setValue(initialData?.is_staff || false);                       
            can_view_all_branches.setValue(initialData?.can_view_all_branches || false); 
        } else {
            form.setValues(fields)
        }
    }, [initialData, isOpen]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.validate()) {return;}

        const formData = new FormData() ;

        Object.entries(form.values).forEach(([key, value]) => {formData.append(key, String(value ?? ''));});

        formData.append('is_active', String(is_active.value));
        formData.append('is_superuser', String(is_superuser.value));
        formData.append('is_staff', String(is_staff.value));
        formData.append('can_view_all_branches', String(can_view_all_branches.value));

        if (selectedCityIds.length > 0) {formData.append('city', selectedCityIds[0]);}
        selectedBranchIds.forEach((branchId) => {formData.append('branches', branchId);});
        selectedGroupIds.forEach((groupId) => {formData.append('groups', String(groupId));});

        if (avatar.files[0]) {formData.append('avatar', avatar.files[0]);}
        
        onSave(formData, (errors) => form.setErrors(errors));
    };

    const title = initialData 
        ? t('modal.titleEdit', { entity: t('models.user.singular') }) 
        : t('modal.titleAdd', { entity: t('models.user.singular') });

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
            
            <div className="box_input">
                <FileUploader
                    label={t('fields.avatar')}
                    previews={avatar.previews}
                    initialPreviews={initialData?.avatar ? [initialData.avatar] : []}
                    error={avatar.error}
                    onAddFiles={avatar.addFiles}
                    onRemoveFile={avatar.removeFile}
                />
            </div>

            <div className="box_input">
                <InputText
                    type="text"
                    label={t('fields.username')}
                    value={form.values.username}
                    onChange={(e) => form.handleChange('username', e.target.value)}
                    error={form.errors.username}
                />
            </div>

            <div className="box_input">
                <InputText
                    type="text"
                    label={t('fields.full_name')}
                    value={form.values.full_name}
                    onChange={(e) => form.handleChange('full_name', e.target.value)}
                    error={form.errors.full_name}
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
                <Textarea
                    label={t('fields.address')}
                    value={form.values.address}
                    onChange={(e) => form.handleChange('address', e.target.value)}
                    error={form.errors.address}
                    rows={4} 
                />
            </div>
            

            <div className="box_input">
                <AccordionSelect<string>
                    title={t('models.branch.plural')}
                    items={branchesData?.map(branch => ({ id: branch.id, label: branch.title })) || []}
                    selectedIds={selectedBranchIds}
                    onChange={onSelectedBranchChange}
                    multi={true}
                    isLoading={branchesLoading}
                    showCount={true}
                    />
            </div>

            <div className="box_input">
                <AccordionSelect<string>
                    title={t('models.city.singular')}
                    items={citiesData?.map(city => ({ id: city.id, label: city.title })) || []}
                    selectedIds={selectedCityIds}
                    onChange={onSelectedCityChange}
                    multi={false}
                    isLoading={citiesLoading}
                    showCount={true}
                    />
            </div>

            <div className="box_input">
                <AccordionSelect<number>
                    title={t('models.group.plural')}
                    items={groupsData?.map(group => ({ id: group.id, label: group.name })) || []}
                    selectedIds={selectedGroupIds}
                    onChange={onSelectedGroupChange}
                    multi={true}
                    isLoading={groupsLoading}
                    showCount={true}
                    />
            </div>

            <div className="box_input">
                <InputText
                    type="text"
                    label={t('fields.email')}
                    value={form.values.email}
                    onChange={(e) => form.handleChange('email', e.target.value)}
                    error={form.errors.email}
                />
            </div>

            {!initialData && (
                <div className="box_input">
                    <InputText
                        type="text"
                        label={t('fields.password')}
                        value={form.values.password}
                        onChange={(e) => form.handleChange('password', e.target.value)}
                        error={form.errors.password}
                    />
                </div>
            )}
           
            <div className="my_start_15">
                <Checkbox
                    label={t('fields.can_view_all_branches')}
                    desc={t('policy.form.statusDesc')}
                    checked={can_view_all_branches.value}
                    onChange={can_view_all_branches.onChange}
                    error={can_view_all_branches.error}
                />
            </div>
            <div className="my_start_15">
                <Checkbox
                    label={t('fields.staff')}
                    desc={t('policy.form.statusDesc')}
                    checked={is_staff.value}
                    onChange={is_staff.onChange}
                    error={is_staff.error}
                />
            </div>
            <div className="my_start_15">
                <Checkbox
                    label={t('fields.superuser')}
                    desc={t('policy.form.statusDesc')}
                    checked={is_superuser.value}
                    onChange={is_superuser.onChange}
                    error={is_superuser.error}
                />
            </div>
            <div className="my_start_15">
                <Checkbox
                    label={t('policy.form.status')}
                    desc={t('policy.form.statusDesc')}
                    checked={is_active.value}
                    onChange={is_active.onChange}
                    error={is_active.error}
                />
            </div>

            

        </FormModal>

    );

};
