

import { ArrowUpRight, CalendarDays, Clock3, ShoppingBag, Sparkles, TrendingDown} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { OfferStatus } from "../../../utils/offerUtils";

interface OfferHeroProps {
  title: string;
  description?: string | null;
  image?: string | null;
  status: OfferStatus;
  statusLabel: string;
  generalDiscount: string | null;
  startDate: string | null;
  endDate: string | null;
  availableProductsCount: number;
}

export default function OfferHero({ title, description, status, statusLabel, generalDiscount, startDate, endDate, availableProductsCount}: OfferHeroProps) {
  const { t } = useTranslation();

  const canShop = status === "active" && availableProductsCount > 0;

  const actionLabel = {
    upcoming: t("store.offer.hero.upcomingAction"),
    expired: t("store.offer.hero.expiredAction"),
    unknown: t("store.offer.hero.unknownAction"),
    active: t("store.offer.hero.noProductsAction"),
  }[status];

  return (
    <section className={`offer-hero offer-hero--${status}`}>
      <div className="offer-hero__content">

        <div className="offer-hero__topline">
          <span className="offer-hero__eyebrow">
            <Sparkles size={15} />{t("store.offer.hero.eyebrow")}
          </span>

          <span className={`offer-status offer-status--${status}`}>
            <span className="offer-status__dot" />{statusLabel}
          </span>
        </div>

        <h1 className="offer-hero__title">{title}</h1>
        {description && (<div className="offer-hero__description text text_center p_limit_2">{description}</div>)}

        {generalDiscount && (
          <div className="offer-hero__discount">
            <span className="offer-hero__discount-icon"><TrendingDown size={21} /></span>
            <div>
              <span className="text text_xs">{t("store.offer.hero.yourBenefit")}</span>
              <div className="text text_lg weight_600">{generalDiscount}</div>
            </div>
          </div>
        )}

        <div className="offer-hero__dates">
          {startDate && (
            <div className="offer-date">
              <span className="offer-date__icon">
                <CalendarDays size={17} />
              </span>

              <div>
                <span>{t("store.offer.hero.startDate")}</span>
                <strong>{startDate}</strong>
              </div>
            </div>
          )}

          {endDate && (
            <div className="offer-date">
              <span className="offer-date__icon">
                <Clock3 size={17} />
              </span>

              <div>
                <span>{t("store.offer.hero.endDate")}</span>
                <strong>{endDate}</strong>
              </div>
            </div>
          )}
        </div>

        <div className="offer-hero__actions">
          {canShop ? (
            <a href="#offer-products" className="offer-button">
              <ShoppingBag size={18} />
              {t("store.offer.hero.discoverProducts")}
              <ArrowUpRight size={17} />
            </a>
          ) : (
            <span className="offer-button offer-button--disabled">
              {actionLabel}
            </span>
          )}

        </div>
      </div>


    </section>
  );
}