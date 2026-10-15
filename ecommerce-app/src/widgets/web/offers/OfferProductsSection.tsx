


import { useTranslation } from "react-i18next";
import ProductCard from "../products/ProductCard";
import type { IApiProduct } from "../../../types/productTypes";
import { NotFound } from "../../../components/ui/NoutFound";


interface OfferProductsSectionProps {products: IApiProduct[];}

export default function OfferProductsSection({products}: OfferProductsSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="offer-products" id="offer-products">
      <div className="offer-products__header">
        <div className="offer-products__heading">
          <div className="text text_xl weight_600">{t("store.offer.products.title")}</div>
          <div className="text text_sm">{t("store.offer.products.description")}</div>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="products_list">
          {products.slice(0, 8).map((product) => (
              <div key={product.id}> <ProductCard product={product} /> </div>
          ))}
        </div>
      ) : (<NotFound />)}
    </section>
  );
}