

import { NavLink } from "react-router-dom";

interface Props {
  url: string;
  icon: React.ReactNode;
  title: string;
  badge: boolean;
  collapsed: boolean;
}

export default function LinkSidbar({url, icon, title, badge, collapsed}: Props) {
    const activeClass = ({ isActive }: { isActive: boolean }) => isActive ? "sidebar_link active" : "sidebar_link";

    return (
        <NavLink to={url} className={activeClass} end>

        <div className="sidebar_link_left">
            {icon}
            {/* {!collapsed && (<span className="text text_md weight_500">{title}</span>)} */}
            <span className="text text_md weight_500">{title}</span>
        </div>

        {!collapsed && badge && (<div className="sidebar_badge">4</div>)}

        </NavLink>
    );
    
}






