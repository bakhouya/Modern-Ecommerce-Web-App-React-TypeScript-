

import PasswordField from "../../../components/forms/PasswordField";
import { SectionHeader } from "../../../components/ui/SectionHeader";
import { useFieldText } from "../../../hooks/useFieldText";
import { ChangePasswordSchema } from "../../../validations/profileSchema";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ChangePassword as ChangePasswordService } from '../../../services/dashboard/accountService';
import { handleBackendErrors } from "../../../helpers/handleValidationErrors";
import AttentionInput from "../../../components/ui/AttentionInput";



export default function ChangePassword() {
    const form = useFieldText(ChangePasswordSchema, {old_password: "", new_password: "", confirm_password: ""});

    const mutation = useMutation({
        mutationFn: ChangePasswordService,
        onSuccess: (res: unknown) => {

            const message = typeof res === 'object' && res !== null && 'message' in res && typeof res.message === 'string'
                ? res.message
                : "Mot de passe changé avec succès";
            
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
        <>

            <form className="py_start_15 py_end_5" onSubmit={update}>

                <SectionHeader title="Changer le mot de passe"
                    description="Pour des raisons de sécurité, veuillez renseigner votre ancien mot de passe, 
                                puis saisir deux fois votre nouveau mot de passe."/>

                <div className="box_input">
                    <PasswordField
                        label="Ancien mot de passe"
                        value={form.values.old_password}
                        onChange={(e) => form.handleChange("old_password", e.target.value)}
                        error={form.errors.old_password}
                    />
                </div>

                <div className="box_input">
                    <PasswordField
                        label="Nouveau mot de passe"
                        value={form.values.new_password}
                        onChange={(e) => form.handleChange("new_password", e.target.value)}
                        error={form.errors.new_password}
                    />
                </div>

                <div className="box_input">
                    <PasswordField
                        label="Confirmer le mot de passe"
                        value={form.values.confirm_password}
                        onChange={(e) => form.handleChange("confirm_password", e.target.value)}
                        error={form.errors.confirm_password}
                    />
                    <AttentionInput 
                        title="Pour des raisons de sécurité, veuillez saisir à nouveau votre nouveau mot de passe. Il doit correspondre exactement au champ « Nouveau mot de passe »." 
                    />
                </div>
            </form>

            <div className="divider"></div>

            <div className="flex_end_center my_start_12">
                <button
                    className="btn primary lg w_max"
                    type="button"
                    onClick={update}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending
                        ? <span className="btn_loader"></span>
                        : <div className="text text_md">Modifier</div>}
                </button>
            </div>

        </>
    );
}