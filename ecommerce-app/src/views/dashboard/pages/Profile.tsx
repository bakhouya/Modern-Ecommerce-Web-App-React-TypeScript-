




import { motion} from "framer-motion";
import { UserCircleIcon, LockIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

import UpdateProfile from "../../../widgets/dashboard/profiles/Update";
import ChangePassword from "../../../widgets/dashboard/profiles/ChnagePassword";
import { ProfileProvider } from "../../../context/admins/ProfileContext";
import { AnimatedTransition } from "../../../components/boxs/AnimatedTransition";


export default function AdminProfile() {
    const [screen, setScreen] = useState(1);
    

    // Éléments du menu
    const menuItems = [
        { id: 1, label: "Modifier le profil", icon: <UserCircleIcon size={17} /> },
        { id: 2, label: "Modifier le mot de passe", icon: <LockIcon size={17} /> }
    ];

    return (

        <ProfileProvider>
            <section className="wrapper_page">
                
                <aside className="nav_container">

                    <div className="box_input">
                        <input type="search" className="input_search" placeholder="Rechercher ... " />
                        <div className="in_icon text text_sm" > <SearchIcon size={16} /> </div> 
                    </div>

                    <div className="" style={{ position: "relative" }}>
                        {menuItems.map((item) => (
                            <motion.div key={item.id}
                                className={`link_item flex_between_center`}
                                onClick={() => setScreen(item.id)}
                                style={{ cursor: "pointer", position: "relative", zIndex: 2 }}>

                                <div className="flex_start_center gap_12 link_item__content">
                                    {item.icon}
                                    <span className="text text_md">{item.label}</span>
                                </div>
                                {/* Indicateur animé (fond qui glisse) */}
                                {screen === item.id && (
                                    <motion.div 
                                        layoutId="highlight" 
                                        className="active_background" 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }} 
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        style={{ zIndex: 1 }}/>
                                )}
                            </motion.div>
                        ))}
                        
                    </div>

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



