
import { CheckCircle2, PackageCheck, Tag, ArrowLeft} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WEBROUTES from "../../../routers/web/path";

export default function OfferBenefits() {
  const { t } = useTranslation();

  const benefits = [
    {key: "dedicated", icon: <Tag size={21} />},
    { key: "selection", icon: <PackageCheck size={21} />},
    { key: "transparent", icon: <CheckCircle2 size={21} />},
  ];

  return (
    <>
      <section className="offer-benefits">
        {benefits.map((benefit) => (
          <div className="offer-benefits__item" key={benefit.key}>
            <span className="offer-benefits__icon">{benefit.icon}</span>
            <div>
              <div className="text text_sm weight_600">{t(`store.offer.benefits.${benefit.key}.title`)}</div>
              <div className="text text_xs p_limit_1">{t(`store.offer.benefits.${benefit.key}.description`)}</div>
            </div>
          </div>
        ))}
      </section>

      <div className="offer-page__bottom-link">
        <Link to={WEBROUTES.HOME}><ArrowLeft size={16} />{t("store.offer.backToShop")}</Link>
      </div>
    </>
  );
}