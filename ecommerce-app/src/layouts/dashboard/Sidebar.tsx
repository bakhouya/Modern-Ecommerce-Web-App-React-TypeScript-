


import { SeparatorVertical, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import LinkSidbar from "../../widgets/dashboard/sidbar/Link";
import Logo from "../../widgets/dashboard/sidbar/Logo";
import LinkSidebarParent from "../../widgets/dashboard/sidbar/LinkParent";
import { getMenuItems } from "../../models/layouts/sidbarList";

interface SidebarProps {collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const ArrowIcon = isRTL ? ArrowRight  : ArrowLeft ;
    const size = 19;
    const menuItems = useMemo(() => getMenuItems(t, size), [t, size]);

    const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

    const activeGroup = useMemo(() => {
        return menuItems.find(item => item.id === activeGroupId) || null;
    }, [menuItems, activeGroupId]);

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <Logo collapsed={collapsed} />
        <nav className="sidebar__nav my_start_15">
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
                        onClick={() => setActiveGroupId(item.id)} 
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
                <button className="sidebar_back_button" onClick={() => setActiveGroupId(null)}>
                <div className="btn_icon sm flex_center_center radius_6">
                    <ArrowIcon size={18} />
                </div>
                {!collapsed && (
                    <span className="text text_lg weight_700">{activeGroup.title}</span>
                )}
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
        <button className="toggle_sidebar" type="button" onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? t('navigation.sidebar.open') : t('navigation.sidebar.close')}>
            <SeparatorVertical size={size} />
        </button>
        </aside>
    );
}


