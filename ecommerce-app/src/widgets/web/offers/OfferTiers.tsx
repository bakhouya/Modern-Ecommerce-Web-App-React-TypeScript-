



import { CheckCircle2, PackageCheck, Sparkles, Tag, TrendingDown} from "lucide-react";
import { useTranslation } from "react-i18next";
import { getDiscountLabel } from "../../../utils/offerUtils";
import type { OfferVariantTypes } from "../../../types/offersTypes";


interface OfferTiersProps {tiers: OfferVariantTypes[];}

export default function OfferTiers({ tiers }: OfferTiersProps) {
    const { t } = useTranslation();
    if (!tiers.length) return null;

    return (
      <section className="offer-tiers">

        <div className="offer-section-heading">
          <div className="offer-section-heading__icon">
            <Tag size={21} />
          </div>

          <div>
            <div className="text text_xl weight_600">{t("store.offer.tiers.title")}</div>
            <div className="text text_sm">{t("store.offer.tiers.description")}</div>
          </div>
        </div>

        <div className="offer-tiers__grid">
          {tiers.map((tier, index) => {

              const discount = getDiscountLabel( tier.discount_fixed_amount, tier.discount_percentage);
              const isBest = index === tiers.length - 1;
              return (
                <article className={`offer-tier ${isBest ? "offer-tier--best" : ""}`} key={`${tier.min_order_pieces}-${index}`}>
                    {isBest && (
                      <span className="offer-tier__recommended">
                        <Sparkles size={13} />
                        {t("store.offer.tiers.topTier")}
                      </span>
                    )}

                    <div className="offer-tier__top">
                      <span className="offer-tier__index">
                        {t("store.offer.tiers.tierNumber", {
                          number: String(index + 1).padStart(2, "0"),
                        })}
                      </span>

                      <span className="offer-tier__icon">
                        {isBest ? (<TrendingDown size={20} />) : (<PackageCheck size={20} />)}
                      </span>
                    </div>

                    <div className="offer-tier__quantity">
                      <strong>{tier.min_order_pieces}</strong>
                      <span>
                        {t(tier.min_order_pieces > 1 ? "store.offer.tiers.minimumArticles" : "store.offer.tiers.minimumArticle")}
                      </span>
                    </div>

                    <div className="offer-tier__divider" />

                    <div className="offer-tier__benefit">
                      <span>{t("store.offer.tiers.benefit")}</span>
                      <strong>{discount ?? t("store.offer.tiers.conditionsApply")}</strong>
                    </div>

                    <div className="offer-tier__footer">
                      <CheckCircle2 size={16} />
                      <span>{t("store.offer.tiers.fromArticles", {count: tier.min_order_pieces})}</span>
                    </div>
                </article>
              );

          })}
        </div>

      </section>
    );
}