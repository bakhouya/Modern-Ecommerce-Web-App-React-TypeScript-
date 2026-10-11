

import { Link } from "react-router-dom";
import type { SearchProduct } from "../../../types/searchTypes";
import ImagePlaceholder from '../../../assets/images/placeholder_product.png' ;
import WEBROUTES from "../../../routers/web/path";

const money = (v: string | null) => v === null ? null : Number(v).toLocaleString("fr-MA", { style: "currency", currency: "MAD" });

export default function ProductCard({ product: p }: { product: SearchProduct }) {
    const sale = money(p.price_sale);
    const regular = money(p.price_regular);
    const hasDiscount = sale && regular && Number(p.price_sale) < Number(p.price_regular);

    return (
        <Link to={WEBROUTES.PRODUCT(p.id)} className="product-card">
            <div className="product-card__media">
                <img src={p.image || ImagePlaceholder} alt={p.title} loading="lazy" />
            </div>

            <div className="product-card__body">
                {p.brand && <span className="product-card__brand">{p.brand}</span>}
                <div className="text text_sm p_limit_2">{p.title}</div>

                <div className="product-card__price">
                {sale || regular ? (
                    <>
                    <div className="text text_sm weight_600">{sale ?? regular}</div>
                    {hasDiscount && <s>{regular}</s>}
                    </>
                ) : (
                    <span className="product-card__no-price">Price on request</span>
                )}
                </div>
            </div>
        </Link>
    );
}