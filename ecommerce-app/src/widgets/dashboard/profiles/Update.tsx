

import { useEffect } from "react"
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query"
import { useTranslation } from 'react-i18next';

import InputText from "../../../components/forms/InputText"
import { SectionHeader } from "../../../components/ui/SectionHeader"  
import AttentionInput from "../../../components/ui/AttentionInput" 
import { SubmitButton } from "../../../components/ui/SubmitButton" 
import Cities from "./Cities"

import { useFieldText } from "../../../hooks/useFieldText"
import { useFieldSelect } from "../../../hooks/useFieldSelect"

import { UpdateProfileSchema } from "../../../validations/profileSchema"
import { useProfile } from "../../../context/admins/ProfileContext"
import { UpdateProfile as UpdateProfileService } from '../../../services/dashboard/accountService'
import { handleBackendErrors } from "../../../helpers/handleValidationErrors"


export default function UpdateProfile() {
    const { t } = useTranslation();
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
            toast.success(t('profile.messages.updateSuccess'));
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
        <form className=" py_end_5" onSubmit={Update}>

            <div className="">
   
                <SectionHeader title={t('profile.sections.personal.title')} description={t('profile.sections.personal.description')}/>
                <div className="box_input">
                    <InputText
                        type="text"
                        label={t('profile.fields.username')}
                        value={form.values.username}
                        onChange={(e) => form.handleChange("username", e.target.value)}
                        error={form.errors.username}
                    />
                    <AttentionInput title={t('profile.attention.username')} />
                </div>

                <div className="box_input">
                    <InputText
                        type="text"
                        label={t('profile.fields.fullName')}
                        value={form.values.full_name}
                        onChange={(e) => form.handleChange("full_name", e.target.value)}
                        error={form.errors.full_name}
                    />
                </div>
            </div>

            <div className="divider my_end_12"></div>

            <div className="">
                <SectionHeader title={t('profile.sections.address.title')} description={t('profile.sections.address.description')}/>
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
                        label={t('profile.fields.address')}
                        value={form.values.address}
                        onChange={(e) => form.handleChange("address", e.target.value)}
                        error={form.errors.address}
                    />
                </div>
            </div>

            <div className="divider my_end_12"></div>

            <div className="">
                <SectionHeader title={t('profile.sections.contact.title')} description={t('profile.sections.contact.description')}/>

                <div className="box_input">
                    <InputText
                        type="text"
                        label={t('profile.fields.phone')}
                        value={form.values.phone}
                        onChange={(e) => form.handleChange("phone", e.target.value)}
                        error={form.errors.phone}
                    />
                    <AttentionInput title={t('profile.attention.phone')} />
                </div>

                <div className="box_input">
                    <InputText
                        type="email"
                        label={t('profile.fields.email')}
                        value={form.values.email}
                        onChange={(e) => form.handleChange("email", e.target.value)}
                        error={form.errors.email}
                    />
                </div>
            </div>

            <div className="divider my_15"></div>

            <div className="flex_end_center">
                <SubmitButton isPending={Mutation.isPending} type="update" />
            </div>

        </form>


        </>
    );

}