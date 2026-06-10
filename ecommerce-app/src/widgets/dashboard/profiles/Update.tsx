
import InputText from "../../../components/forms/InputText"
import { SectionHeader } from "../../../components/ui/SectionHeader"  
import AttentionInput from "../../../components/ui/AttentionInput"  

import { useFieldText } from "../../../hooks/useFieldText"
import { useFieldSelect } from "../../../hooks/useFieldSelect"
import { UpdateProfileSchema } from "../../../validations/profileSchema"
import { useProfile } from "../../../context/admins/ProfileContext"
import { useEffect } from "react"
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query"
import { UpdateProfile as UpdateProfileService } from '../../../services/dashboard/accountService'
import Cities from "./Cities"
import { handleBackendErrors } from "../../../helpers/handleValidationErrors"

export default function UpdateProfile() {

    const { profileQuery, refetchProfile } = useProfile();
    const { data } = profileQuery;
    
    const form = useFieldText(UpdateProfileSchema, {
        username: "",
        full_name: "",
        email: "",
        phone: "",
        address: "",
    });

    const city = useFieldSelect<string | string[]>({
        initialValue: data?.user_city?.id || '',
    });

    useEffect(() => {
        if (!data) return;

        form.setValues({
            username: data.username || '',
            full_name: data.full_name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
        });

        city.setValue(data.user_city?.id || '');
    }, [data]);

    const Mutation = useMutation({
        mutationFn : UpdateProfileService,
        onSuccess  : () => {
            refetchProfile();
            toast.success("Modifié avec succès");
            form.setErrors({});
        },
        onError: (error: unknown) => {
            handleBackendErrors(error, form.setErrors);
        },
    });

    const Update = (e: React.FormEvent) => {
        e.preventDefault();
        const isTextValid = form.validate();
        const isCityValid = city.validate();

        if (!isTextValid || !isCityValid) return;

        const PuttData = {...form.values, city: city.value };
        Mutation.mutate(PuttData);
    };

    return (
        <>
            <form className="py_start_15 py_end_5" onSubmit={Update}>
                {/* Section Informations personnelles */}
                <SectionHeader
                    title="Informations personnelles"
                    description="Modifiez votre nom d'utilisateur et votre nom complet. Ces informations seront affichées publiquement."
                />
                <div className="box_input">
                    <InputText
                        type="text"
                        label="Nom d'utilisateur"
                        value={form.values.username}
                        onChange={(e) => form.handleChange("username", e.target.value)}
                        error={form.errors.username}
                    />
                    <AttentionInput 
                        title="Ce nom d'utilisateur sera utilisé pour vous connecter à votre compte. Choisissez un nom unique et facile à retenir. Il peut contenir des lettres, chiffres et certains caractères spéciaux." 
                    />
                </div>
                <div className="box_input">
                    <InputText
                        type="text"
                        label="Nom complet"
                        value={form.values.full_name}
                        onChange={(e) => form.handleChange("full_name", e.target.value)}
                        error={form.errors.full_name}
                    />
                </div>

                {/* Section Adresse */}
                <div className="divider my_end_12"></div>
                <SectionHeader
                    title="Adresse"
                    description="Vous pouvez modifier votre adresse et contrôler qui peut la voir."
                />
                <div className="box_input">
                    <Cities
                        value={city.value}
                        onChange={city.handleChange}
                        error={city.error}
                        multi={false}
                        required={false}
                    />
                </div>
                <div className="box_input">
                    <InputText
                        type="text"
                        label="Adresse"
                        value={form.values.address}
                        onChange={(e) => form.handleChange("address", e.target.value)}
                        error={form.errors.address}
                    />
                </div>

                {/* Section Contact */}
                <div className="divider my_end_12"></div>

                <SectionHeader title="Contact"
                    description="Ajoutez un numéro de téléphone personnel ou officiel pour rester connecté facilement et permettre la récupération de votre compte."
                />

                <div className="box_input">
                    <InputText
                        type="tel"
                        label="Téléphone"
                        value={form.values.phone}
                        onChange={(e) => form.handleChange("phone", e.target.value)}
                        error={form.errors.phone}
                    />
                    <AttentionInput title="Ce numéro de téléphone doit être confirmé pour garantir son authenticité avant d'être associé à votre profil."/>

                </div>

                <div className="box_input">
                    <InputText
                        type="email"
                        label="Adresse e-mail"
                        value={form.values.email}
                        onChange={(e) => form.handleChange("email", e.target.value)}
                        error={form.errors.email}
                    />
                </div>
            </form>

            <div className="divider"></div>

            <div className="flex_end_center my_start_12">
                <button className="btn primary lg w_max" type="button"
                    onClick={Update}
                    disabled={Mutation.isPending}>
                    {Mutation.isPending
                        ? <span className="btn_loader"></span>
                        : <div className="text text_md"> Modifer </div>}
                </button>
            </div>
        </>
    );
}