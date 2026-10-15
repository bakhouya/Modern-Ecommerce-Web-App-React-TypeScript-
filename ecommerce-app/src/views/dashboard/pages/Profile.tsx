


import { UserCircleIcon, LockIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';

import UpdateProfile from "../../../widgets/dashboard/profiles/Update";
import ChangePassword from "../../../widgets/dashboard/profiles/ChnagePassword";
import { ProfileProvider } from "../../../context/admins/ProfileContext";
import { AnimatedTransition } from "../../../components/boxs/AnimatedTransition";
import { SearchInput } from "../../../components/ui/SearchInput";
import TabListBlock from "../../../components/forms/AnimatedTabList";


export default function AdminProfile() {
    const { t } = useTranslation();
    const [screen, setScreen] = useState(1);
    const [search, setSearch] = useState("");
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const menuItems = [
        { id: 1, label: t('profile.menu.editProfile'), icon: <UserCircleIcon size={17} /> },
        { id: 2, label: t('profile.menu.changePassword'), icon: <LockIcon size={17} /> }
    ];

    const filteredMenuItems = useMemo(() => {
        return menuItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [search, menuItems]);

    return (

        <ProfileProvider>
            <section className="wrapper_page">
                
                <aside className="nav_container">

                    <SearchInput placeholder={t('search.placeholder')} value={search} onChange={(e) => setSearch(e.target.value)}/>
                    
                    <TabListBlock items={filteredMenuItems} activeItem={screen} onChange={setScreen}/>

                </aside>

                <div className="flex_container">
                    {screen === 1 && (
                        <AnimatedTransition transitionKey="profile" direction="up" duration={0.2}>  
                                <UpdateProfile />
                        </AnimatedTransition>
                    )}
                    {screen === 2 && (
                        <AnimatedTransition transitionKey="password" direction="up" duration={0.2}>
                                <ChangePassword />
                        </AnimatedTransition>
                    )}
                </div>

            </section>
        </ProfileProvider>
        
    );

}



