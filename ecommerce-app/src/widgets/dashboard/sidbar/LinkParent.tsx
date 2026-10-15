

import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props { icon: React.ReactNode; title: string; collapsed: boolean; onClick?: () => void;}

export default function LinkSidebarParent({ icon, title, collapsed, onClick }: Props) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="sidebar_link pointer" onClick={onClick}>
      <div className="sidebar_link_left">
        {icon}
        {/* {!collapsed && <span className="text text_md weight_500">{title}</span>} */}
        <span className="text text_md weight_500">{title}</span>
      </div>

      {!collapsed && <ChevronIcon size={16} className="chevron_icon" />}
    </div>
  );
}