


import type { OrderProduct } from "../../../types/ordersTyes";
import { VariantRow } from "./VariantRow";

export function ProductCard({
  product,
  onDeleteProduct,
  onDeleteVariant,
  onUpdateQty,
  updatingQty,
}: {
  product: OrderProduct;
  onDeleteProduct: () => void;
  onDeleteVariant: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  updatingQty?: boolean;
}) {
  const img = product.product.image?.[0]?.image;

  return (
    <div className="product_card">
      <div className="product_card__head">
        {img ? (
          <img src={img} alt="" className="product_card__img" />
        ) : (
          <div className="product_card__img" />
        )}

        <div className="product_card__info">
          <div className="product_card__title">{product.product.title}</div>
          <div className="product_card__meta">
            <span>{product.variants.length} variant(s)</span>
            {product.has_offer && (
              <span className="product_card__offer">🎁 Offer</span>
            )}
          </div>
        </div>

        <div className="product_card__price">
          <span className="product_card__price-value">{product.price} DH</span>
          {product.has_offer && product.original_price !== product.price && (
            <span className="product_card__price-old">{product.original_price} DH</span>
          )}
        </div>

        <button
          className="icon_btn icon_btn_danger"
          onClick={onDeleteProduct}
          title="Delete product"
        >
          ✕
        </button>
      </div>

      <div className="product_card__body">
        {product.variants.map((v) => (
          <VariantRow
            key={v.id}
            variant={v}
            onDelete={() => onDeleteVariant(v.id)}
            onUpdateQty={(qty) => onUpdateQty(v.id, qty)}
            updatingQty={updatingQty}
          />
        ))}
      </div>
    </div>
  );
}