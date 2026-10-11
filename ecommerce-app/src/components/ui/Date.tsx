

// components/ui/RelativeDate.tsx
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow, type Locale } from 'date-fns';
import { fr, enUS, ar } from 'date-fns/locale';
import { ClockIcon } from 'lucide-react';


const localeMap: Record<string, Locale> = { fr, en: enUS, ar};
interface RelativeDateProps {date: string | Date;  addSuffix?: boolean; }

export const RelativeDate = ({ date, addSuffix = true }: RelativeDateProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const locale = localeMap[currentLang] || enUS;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return (
    <span className="text text_xs flex_start_center gap_6">
        <ClockIcon size={13}/>
        {formatDistanceToNow(dateObj, { addSuffix, locale })}
    </span>
  );
};



