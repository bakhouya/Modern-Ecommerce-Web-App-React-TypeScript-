
import { motion } from "framer-motion";
import { SettingsIcon, PhoneIcon, Share2Icon, DollarSignIcon, FileTextIcon, BarChart3Icon, SearchIcon} from "lucide-react";
import { useMemo, useState } from "react";

import { AnimatedTransition } from "../../../../components/boxs/AnimatedTransition";
import UpdateSettingsPlatform from "../../../../widgets/dashboard/settings/UpdateSettingsPlatform";

export default function SettingsPlatform() {

    const menuItems = [
        { id: 1, label: "Informations générales", icon: <SettingsIcon size={17} /> },
        { id: 2, label: "Coordonnées", icon: <PhoneIcon size={17} /> },
        { id: 3, label: "Réseaux sociaux", icon: <Share2Icon size={17} /> },
        { id: 4, label: "Devise", icon: <DollarSignIcon size={17} /> },
        { id: 5, label: "Informations légales", icon: <FileTextIcon size={17} /> },
        { id: 6, label: "SEO & Analytics", icon: <BarChart3Icon size={17} /> },
    ];

    const [screen, setScreen] = useState(1);
    const [search, setSearch] = useState("");

    const filteredMenuItems = useMemo(() => {
        return menuItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    const selectedLabel = menuItems.find(item => item.id === screen)?.label || "";

    return (
        <section className="wrapper_page">

            <aside className="nav_container">

                <div className="box_input">
                    <input
                        type="search"
                        className="input_search"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="in_icon text text_sm"><SearchIcon size={16} /></div>
                </div>

                <div style={{ position: "relative" }}>

                    {filteredMenuItems.length > 0 ? (
                        filteredMenuItems.map((item) => (
                            <motion.div
                                key={item.id}
                                className="link_item flex_between_center"
                                onClick={() => setScreen(item.id)}
                                style={{cursor: "pointer", position: "relative", zIndex: 2}}>
                                <div className="flex_start_center gap_12 link_item__content">
                                    {item.icon}
                                    <span className="text text_md">{item.label}</span>
                                </div>

                                {screen === item.id && (
                                    <motion.div
                                        layoutId="highlight"
                                        className="active_background"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{type: "spring", stiffness: 300, damping: 30}}
                                        style={{ zIndex: 1 }}
                                    />
                                )}
                            </motion.div>
                        ))
                    ) : (<div className="text text_sm p_12 text_center"> Aucun résultat trouvé </div>)}

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