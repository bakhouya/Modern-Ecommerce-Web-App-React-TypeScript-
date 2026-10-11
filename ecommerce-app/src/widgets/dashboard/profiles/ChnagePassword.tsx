
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from 'react-i18next';

import PasswordField from "../../../components/forms/PasswordField";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import AttentionInput from "../../../components/ui/AttentionInput";
import { SubmitButton } from "../../../components/ui/SubmitButton";

import { useFieldText } from "../../../hooks/useFieldText";
import { ChangePasswordSchema } from "../../../validations/profileSchema";
import { ChangePassword as ChangePasswordService } from '../../../services/dashboard/accountService';
import { handleBackendErrors } from "../../../helpers/handleValidationErrors";




export default function ChangePassword() {
    const { t } = useTranslation();
    const form = useFieldText(ChangePasswordSchema, {old_password: "", new_password: "", confirm_password: ""});

    const mutation = useMutation({
        mutationFn: ChangePasswordService,
        onSuccess: (res: unknown) => {

            const message = typeof res === 'object' && res !== null && 'message' in res && typeof res.message === 'string'
                ? res.message
                : t('profile.messages.passwordChangeSuccess');
            
            toast.success(message);
            form.setValues({old_password: "", new_password: "", confirm_password: ""});
            form.setErrors({}); 
            
        },
        onError: (error: unknown) => {
            handleBackendErrors(error, form.setErrors);
        },
    });

    const update = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = form.validate();
        if (!isValid) return;
        mutation.mutate(form.values);
    };

    return (

        <form className=" py_end_5" onSubmit={update}>

            <SectionHeader title={t('profile.sections.password.title')} description={t('profile.sections.password.description')}/>

            <div className="box_input">
                <PasswordField
                    label={t('profile.fields.oldPassword')}
                    value={form.values.old_password}
                    onChange={(e) => form.handleChange("old_password", e.target.value)}
                    error={form.errors.old_password}
                />
            </div>

            <div className="box_input">
                <PasswordField
                    label={t('profile.fields.newPassword')}
                    value={form.values.new_password}
                    onChange={(e) => form.handleChange("new_password", e.target.value)}
                    error={form.errors.new_password}
                />
            </div>

            <div className="box_input">
                <PasswordField
                    label={t('profile.fields.confirmPassword')}
                    value={form.values.confirm_password}
                    onChange={(e) => form.handleChange("confirm_password", e.target.value)}
                    error={form.errors.confirm_password}
                />
                <AttentionInput title={t('profile.attention.confirmPassword')} />
            </div>

            <div className="divider"></div>

            <div className="flex_end_center my_start_12">
                <SubmitButton isPending={mutation.isPending} type="update" />
            </div>

        </form>

    );
}