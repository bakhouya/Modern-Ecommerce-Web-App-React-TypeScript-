import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronLeft, SlidersHorizontalIcon} from 'lucide-react';
interface FilterHeaderProps {
  title: string;
  onClick?: () => void; 
  className?: string;
}

export const FilterHeader = ({ title, onClick, className = '' }: FilterHeaderProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <>
      <div className={`flex_between_center header_filter ${className}`} onClick={onClick} >
          <div className="flex_start_center gap_10">
              <SlidersHorizontalIcon size={22}/>
              <div className="text text_xl">{title}</div>
          </div>
          <ChevronIcon size={18} />
      </div>
      <div className="divider mx_20"></div>
    </>
  );
};