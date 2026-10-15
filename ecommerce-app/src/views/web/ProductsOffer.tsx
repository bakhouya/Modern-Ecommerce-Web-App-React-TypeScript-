
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useProductsOffer } from "../../controllers/useOffer";


const statusTranslationKeys = {
  active: "store.offer.status.active.label",
  upcoming: "store.offer.status.upcoming.label",
  expired: "store.offer.status.expired.label",
  unknown: "store.offer.status.unknown.label",
} as const;

import { useTranslation } from "react-i18next";
import { formatOfferDate, getDiscountLabel, getOfferStatus } from "../../utils/offerUtils";
import OfferHero from "../../widgets/web/offers/OfferHero";
import OfferStatusNotice from "../../widgets/web/offers/OfferStatusNotice";
import OfferTiers from "../../widgets/web/offers/OfferTiers";
import OfferProductsSection from "../../widgets/web/offers/OfferProductsSection";
import OfferBenefits from "../../widgets/web/offers/OfferBenefits";
import { NotFound } from "../../components/ui/NoutFound";
import { LoadingDisplay } from "../../components/ui/LoadingDisplay";

const OfferPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {window.scrollTo({top: 0, behavior: "instant"});}, []);

  const {data: offer, isLoading, isError} = useProductsOffer(id);

  const tiers = useMemo(() => [...(offer?.variants ?? [])].sort((a, b) => a.min_order_pieces - b.min_order_pieces),[offer?.variants]);
  const status = useMemo(() => getOfferStatus(offer?.start_date, offer?.end_date), [offer?.start_date, offer?.end_date]);
  const products = offer?.products_detials ?? [];
  const availableProducts = products.filter((product) => product.status && Number(product.stock) > 0);
  const startDate = formatOfferDate(offer?.start_date);
  const endDate = formatOfferDate(offer?.end_date);
  const generalDiscount = getDiscountLabel(offer?.discount_fixed_amount, offer?.discount_percentage);

  if (isLoading) {return <LoadingDisplay />;}

  if (isError || !offer) { return <NotFound />;}

  return (
    <main className="offer-page">
      <div className="web_container">
        <OfferHero
          title={offer.title}
          description={offer.description}
          image={offer.image}
          status={status}
          statusLabel={t(statusTranslationKeys[status])}
          generalDiscount={generalDiscount}
          startDate={startDate}
          endDate={endDate}
          availableProductsCount={availableProducts.length}
        />

        <OfferStatusNotice status={status} />
        <OfferTiers tiers={tiers} />
        <OfferProductsSection products={products}/>
        <OfferBenefits />
      </div>
    </main>
  );
};

export default OfferPage;