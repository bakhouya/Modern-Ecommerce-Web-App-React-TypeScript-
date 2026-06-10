

import {SeparatorVertical, ArrowLeft} from "lucide-react";
import { useState } from "react";
import LinkSidbar from "../../widgets/dashboard/sidbar/Link";
import Logo from "../../widgets/dashboard/sidbar/Logo";
import LinkSidebarParent from "../../widgets/dashboard/sidbar/LinkParent";
import { menuItems, type NavItem } from "../../providers/sidbarList";

interface SidebarProps {collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;}


export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
    const size = 17;
    const [activeGroup, setActiveGroup] = useState<NavItem | null>(null);



    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <Logo collapsed={collapsed} />
            <nav className="sidebar__nav scroll my_start_15">
                {!activeGroup ? (
                    <ul className="sidebar__menu">
                        {menuItems.map((item) => {
                            if (item.items && item.items.length > 0) {
                                return (
                                    <li key={item.id}>
                                        <LinkSidebarParent
                                            icon={item.icon}
                                            title={item.title}
                                            collapsed={collapsed}
                                            onClick={() => setActiveGroup(item)}
                                        />
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={item.id}>
                                        <LinkSidbar
                                            url={item.url!}
                                            icon={item.icon}
                                            title={item.title}
                                            badge={item.badge ?? false}
                                            collapsed={collapsed}
                                        />
                                    </li>
                                );
                            }
                        })}
                    </ul>
                ) : (
                    <div className="sidebar_submenu">
                        <button className="sidebar_back_button" onClick={() => setActiveGroup(null)}>
                            <div className="btn_icon sm flex_center_center radius_6"> 
                                <ArrowLeft size={18} /> 
                            </div>
                            {!collapsed && (<span className="text text_lg weight_700">{activeGroup.title}</span>)}
                        </button>
                        <div className="sidebar_submenu_links">
                            {activeGroup.items!.map((subItem) => (
                                <LinkSidbar
                                    key={subItem.id}
                                    url={subItem.url!}
                                    icon={subItem.icon}
                                    title={subItem.title}
                                    badge={subItem.badge ?? false}
                                    collapsed={collapsed}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </nav>
            <button 
                className="toggle_sidebar" 
                type="button" onClick={() => setCollapsed(!collapsed)}
                title={collapsed ? "Ouvrir la barre latérale" : "Fermer la barre latérale"}>
                <SeparatorVertical size={size} />
            </button>
        </aside>
    );
}



















// interface SimplesProps {title: string; collapsed: boolean;}
// function Simples({ title, collapsed }: SimplesProps) {
//   if (collapsed) return null;
//   return (<div className="sidebar_section_title text_sm weight_500">{title}</div>);
// }


