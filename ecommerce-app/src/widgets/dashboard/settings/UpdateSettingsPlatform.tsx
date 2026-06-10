// widgets/dashboard/settings/UpdateSettingsGeneral.tsx
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useFieldText } from '../../../hooks/useFieldText';
import { useFieldCheckbox } from '../../../hooks/useFieldCheckbox';
import { Checkbox } from '../../../components/forms/Checkbox';
import InputText from '../../../components/forms/InputText';
import { UpdateSettingsTextSchema, UpdateSettingsCheckboxSchema,  } from '../../../validations/settingsSchema';
import { UpdateSettingPlatform } from '../../../services/settings/settingsService';
import { handleBackendErrors } from '../../../helpers/handleValidationErrors';
import { useSettings } from '../../../context/settings/PublicSettingsContext';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { useFieldFile } from '../../../hooks/useFieldFile';
import { FileUploader } from '../../../components/forms/FileUploader';
import { baseFields, contactFields, currencyFields, legalFields, seoFields, socialFields } from '../../../providers/formsSettings';
import AttentionInput from '../../../components/ui/AttentionInput';


interface PropsTypes {taps: number; pageTitle: string;}

export default function UpdateSettingsGeneral({taps, pageTitle}: PropsTypes) {

    const queryClient = useQueryClient() ;
    const { settingsQuery } = useSettings() ;
    const { data } = settingsQuery ;

    const logo = useFieldFile({multiple: false, required: false, maxSize: 2});
    const icon = useFieldFile({multiple: false, required: false, maxSize: 2});

    const form = useFieldText(UpdateSettingsTextSchema, {
        // informations générales
        title: '',
        description: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        currency_code: '',
        currency_symbol: '',
        
        // réseaux sociaux
        facebook_url: '',
        x_url: '',
        instagram_url: '',
        whatsapp_url: '',
        tiktok_url: '',
        telegram_url: '',
        
        // SEO & analytics
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        google_analytics: '',
        facebook_pixel: '',
        tiktok_pixel: '',
        
        // informations légales
        company_legal_status: '',
        ice_number: '',
        if_number: '',
        rc_number: '',
        patente: '',
    });
    const maintenance = useFieldCheckbox({
        schema: UpdateSettingsCheckboxSchema.shape.maintenance,
        initialValue: data?.maintenance || false,
        fieldName: 'maintenance',
    });
    useEffect(() => {

        if (!data) return;
        
        form.setValues({
            // général
            title: data.title || '',
            description: data.description || '',
            email: data.email || '',
            phone: data.phone || '',
            website: data.website || '',
            address: data.address || '',
            currency_code: data.currency_code || '',
            currency_symbol: data.currency_symbol || '',
            
            // réseaux sociaux
            facebook_url: data.facebook_url || '',
            x_url: data.x_url || '',
            instagram_url: data.instagram_url || '',
            whatsapp_url: data.whatsapp_url || '',
            tiktok_url: data.tiktok_url || '',
            telegram_url: data.telegram_url || '',
            
            // SEO & analytics
            meta_title: data.meta_title || '',
            meta_description: data.meta_description || '',
            meta_keywords: data.meta_keywords || '',
            google_analytics: data.google_analytics || '',
            facebook_pixel: data.facebook_pixel || '',
            tiktok_pixel: data.tiktok_pixel || '',
            
            // légal
            company_legal_status: data.company_legal_status || '',
            ice_number: data.ice_number || '',
            if_number: data.if_number || '',
            rc_number: data.rc_number || '',
            patente: data.patente || '',
        });
        
        maintenance.setValue(data.maintenance || false);
        // logo.setFiles(data.logo || "");
        // icon.setFiles(data.icon || "");

    }, [data]);

    const mutation = useMutation({
        mutationFn: UpdateSettingPlatform,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['publicSettings']});
            toast.success('Paramètres mis à jour');
            form.setErrors({});
            maintenance.setError('');
            logo.reset();
            icon.reset();
        },
        onError: (error: unknown) => {
            handleBackendErrors(error, form.setErrors);
        },
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    if (
        !form.validate() ||
        !maintenance.validate() ||
        !logo.validate() ||
        !icon.validate()
    ) {
        return;
    }

    const formData = new FormData();

    Object.entries(form.values).forEach(
        ([key, value]) => {
            formData.append(
                key,
                String(value ?? '')
            );
        }
    );

    formData.append(
        'maintenance',
        String(maintenance.value)
    );

    if (logo.files[0]) {
        formData.append(
            'logo',
            logo.files[0]
        );
    }

    if (icon.files[0]) {
        formData.append(
            'icon',
            icon.files[0]
        );
    }

    mutation.mutate(formData);
    };

    
    return (
        <form className="py_start_15 py_end_5" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-2 gap-4">

                {/* ========== 1. Informations générales ========== */}
                <div className={taps === 1 ? "active" : "hidden"}>
                    <SectionHeader title={pageTitle} description="Titre, description et identité visuelle du site."/>

                    <div className="">
                        <FileUploader
                            label="Logo"
                            // multiple={true}
                            previews={logo.previews}
                            initialPreviews={data?.logo ? [data.logo] : []}
                            error={logo.error}
                            onAddFiles={logo.addFiles}
                            onRemoveFile={logo.removeFile}
                        />
                    </div>
                    <div className="">
                        <FileUploader
                            label="Favicon"
                            previews={icon.previews}
                            initialPreviews={data?.icon ? [data.icon] : []}
                            error={icon.error}
                            onAddFiles={icon.addFiles}
                            onRemoveFile={icon.removeFile}
                        />
                    </div>

                    {baseFields.map((field) => (
                        <div className="box_input" key={field.name}>
                            <InputText
                                type={field.type}
                                label={field.label}
                                value={form.values[field.name]}
                                onChange={(e) => form.handleChange(field.name, e.target.value)}
                                error={form.errors[field.name]}
                            />
                            {field.attention && <AttentionInput title={field.attention} />}
                        </div>
                    ))}
                    <div className="my_start_12">
                        <Checkbox
                            label="Activer le mode maintenance"
                            desc="Lorsque activé, seuls les administrateurs peuvent accéder au site."
                            checked={maintenance.value}
                            onChange={maintenance.onChange}
                            error={maintenance.error}
                        />
                        
                    </div>

                </div>


                {/* ========== 2. Contact ========== */}
                <div className={taps === 2 ? "col-span-2 active" : "col-span-2 hidden"}>
                    <SectionHeader title={pageTitle} description="Email, téléphone, adresse et site web officiels."/>
                    {contactFields.map((field) => (
                        <div className="box_input" key={field.name}>
                            <InputText
                                type={field.type}
                                label={field.label}
                                value={form.values[field.name]}
                                onChange={(e) => form.handleChange(field.name, e.target.value)}
                                error={form.errors[field.name]}
                            />
                            {field.attention && <AttentionInput title={field.attention} />}
                        </div>
                    ))}
                </div>


                {/* ========== 3. Réseaux sociaux ========== */}
                <div className={taps === 3 ? "col-span-2 active" : "col-span-2 hidden"}>
                    <SectionHeader 
                        title={pageTitle}
                        description="Liens vers vos pages officielles (Facebook, X, Instagram, WhatsApp, TikTok, Telegram)."
                    />
                    {socialFields.map((field) => (
                        <div className="box_input" key={field.name}>
                            <InputText
                                type={field.type}
                                label={field.label}
                                value={form.values[field.name]}
                                onChange={(e) => form.handleChange(field.name, e.target.value)}
                                error={form.errors[field.name]}
                            />
                            {field.attention && <AttentionInput title={field.attention} />}
                        </div>
                    ))}
                </div>


                {/* ========== 4. Devise ========== */}
                <div className={taps === 4 ? "col-span-2 active" : "col-span-2 hidden"}>
                    <SectionHeader 
                        title={pageTitle}
                        description="Code et symbole monétaires utilisés sur le site (ex: MAD, EUR, $)."
                    />
                    {currencyFields.map((field) => (
                        <div className="box_input" key={field.name}>
                            <InputText
                                type={field.type}
                                label={field.label}
                                value={form.values[field.name]}
                                onChange={(e) => form.handleChange(field.name, e.target.value)}
                                error={form.errors[field.name]}
                            />
                            {field.attention && <AttentionInput title={field.attention} />}
                        </div>
                    ))}
                </div>


                {/* ========== 5. Informations légales ========== */}
                <div className={taps === 5 ? "col-span-2 active" : "col-span-2 hidden"}>
                    <SectionHeader 
                        title={pageTitle}
                        description="Statut juridique, ICE, IF, RC et patente de l'entreprise."
                    />
                    {legalFields.map((field) => (
                        <div className="box_input" key={field.name}>
                            <InputText
                                type={field.type}
                                label={field.label}
                                value={form.values[field.name]}
                                onChange={(e) => form.handleChange(field.name, e.target.value)}
                                error={form.errors[field.name]}
                            />
                            {field.attention && <AttentionInput title={field.attention} />}
                        </div>
                    ))}
                </div>


                {/* ========== 6. SEO & Analytics ========== */}
                <div className={taps === 6 ? "col-span-2 active" : "col-span-2 hidden"}>
                    <SectionHeader 
                        title={pageTitle}
                        description="Balises meta, mots-clés et codes de suivi (Google Analytics, Facebook Pixel, TikTok Pixel)."
                    />
                    {seoFields.map((field) => (
                        <div className="box_input" key={field.name}>
                            <InputText
                                type={field.type}
                                label={field.label}
                                value={form.values[field.name]}
                                onChange={(e) => form.handleChange(field.name, e.target.value)}
                                error={form.errors[field.name]}
                            />
                            {field.attention && <AttentionInput title={field.attention} />}
                        </div>
                    ))}
                </div>

            </div>

            <div className="divider my_end_12 col-span-2"></div>   

            <div className="flex_end_center my_start_12">
                <button type="submit" className="btn primary lg" disabled={mutation.isPending}>
                    {mutation.isPending 
                        ? <span className="btn_loader"></span> 
                        : <span className="text text_md"> Modéfier </span> 
                    }
                </button>
            </div>

        </form>
    );
}