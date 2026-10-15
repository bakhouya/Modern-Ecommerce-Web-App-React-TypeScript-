
import { SettingsIcon, PhoneIcon, Share2Icon, DollarSignIcon, FileTextIcon, BarChart3Icon} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';

import { AnimatedTransition } from "../../../../components/boxs/AnimatedTransition";
import UpdateSettingsPlatform from "../../../../widgets/dashboard/settings/UpdateSettingsPlatform";
import { SearchInput } from "../../../../components/ui/SearchInput";
import TabListBlock from "../../../../components/forms/AnimatedTabList";

export default function SettingsPlatform() {
    const { t } = useTranslation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const menuItems = [
        { id: 1, label: t('generalSettings.sections.general'), icon: <SettingsIcon size={17} /> },
        { id: 2, label: t('generalSettings.sections.contact'), icon: <PhoneIcon size={17} /> },
        { id: 3, label: t('generalSettings.sections.social'), icon: <Share2Icon size={17} /> },
        { id: 4, label: t('generalSettings.sections.currency'), icon: <DollarSignIcon size={17} /> },
        { id: 5, label: t('generalSettings.sections.legal'), icon: <FileTextIcon size={17} /> },
        { id: 6, label: t('generalSettings.sections.seo'), icon: <BarChart3Icon size={17} /> },
    ];

    const [screen, setScreen] = useState(1);
    const [search, setSearch] = useState("");

    const filteredMenuItems = useMemo(() => {
        return menuItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [search, menuItems]);

    const selectedLabel = menuItems.find(item => item.id === screen)?.label || "";

    return (
        <section className="wrapper_page">

            <aside className="nav_container">
                <div className="nav_body">
                    <SearchInput placeholder={t('search.placeholder')} value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <TabListBlock items={filteredMenuItems} activeItem={screen} onChange={setScreen}/>
                </div>
            </aside>

            <div className="flex_container">
                <AnimatedTransition transitionKey={`screen-${screen}`} direction="up" duration={0.2}>
                    <UpdateSettingsPlatform taps={screen} pageTitle={selectedLabel}/>
                </AnimatedTransition>
            </div>

        </section>
    );
}