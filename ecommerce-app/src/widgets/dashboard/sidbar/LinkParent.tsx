import { ChevronRight } from "lucide-react";



interface Props { 
    icon: React.ReactNode; 
    title: string; 
    collapsed: boolean;
    onClick?: () => void ;
}

export default function LinkSidebarParent({icon, title,  collapsed, onClick}: Props) {
    return (
        <div className={'sidebar_link pointer'} onClick={onClick}>

            <div className="sidebar_link_left">
                {icon}
                {!collapsed && (<span className="text text_md weight_500">{title}</span>)}
            </div>

            {!collapsed && (<ChevronRight size={16} />)}
            

        </div>
    );
    
}






