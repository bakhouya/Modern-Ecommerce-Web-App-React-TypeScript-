
import { CalendarDays, Clock3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OfferStatus } from "../../../utils/offerUtils";


interface OfferStatusNoticeProps {status: OfferStatus;}

export default function OfferStatusNotice({status}: OfferStatusNoticeProps) {
  const { t } = useTranslation();

  if (status === "active") return null ;

  const icon = status === "expired" ? (<Clock3 size={20} />) : (<CalendarDays size={20} />);

  return (
    <div className={`offer-notice offer-notice--${status}`}role="status">
      <span className="offer-notice__icon">{icon}</span>
      <div>
        <strong>{t(`store.offer.status.${status}.label`)}</strong>
        <p>{t(`store.offer.status.${status}.description`)}</p>
      </div>
    </div>
  );
}