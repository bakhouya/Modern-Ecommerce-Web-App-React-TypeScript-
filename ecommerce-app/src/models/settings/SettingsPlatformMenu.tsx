


import { SettingsIcon, PhoneIcon, Share2Icon, DollarSignIcon, FileTextIcon, BarChart3Icon } from "lucide-react";
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
export const SettingsPlatformMenu = [
    { id: 1, label: t('generalSettings.sections.general'), icon: <SettingsIcon size={17} /> },
    { id: 2, label: t('generalSettings.sections.contact'), icon: <PhoneIcon size={17} /> },
    { id: 3, label: t('generalSettings.sections.social'), icon: <Share2Icon size={17} /> },
    { id: 4, label: t('generalSettings.sections.currency'), icon: <DollarSignIcon size={17} /> },
    { id: 5, label: t('generalSettings.sections.legal'), icon: <FileTextIcon size={17} /> },
    { id: 6, label: t('generalSettings.sections.seo'), icon: <BarChart3Icon size={17} /> },
];


