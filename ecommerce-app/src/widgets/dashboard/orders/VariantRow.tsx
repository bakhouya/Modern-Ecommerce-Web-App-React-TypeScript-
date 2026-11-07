

import type { OrderVariant } from "../../../types/ordersTyes";
import { QuantityControl } from "./QuantityControl";

export function VariantRow({
  variant,
  onDelete,
  onUpdateQty,
  updatingQty,
}: {
  variant: OrderVariant;
  onDelete: () => void;
  onUpdateQty: (qty: number) => void;
  updatingQty?: boolean;
}) {
  return (
    <div className="variant_row">
      <div className="variant_row__info">
        <span className="variant_row__title">{variant.variant_snapshot.title}</span>
        <div className="variant_row__attrs">
          {variant.variant_snapshot.attributes.map((a, i) => (
            <span key={i} className="variant_row__attr">
              {a.attribute__title}: {a.value}
            </span>
          ))}
        </div>
      </div>

      <span className="variant_row__price">{variant.price} DH</span>

      <QuantityControl
        value={variant.quantity}
        onChange={onUpdateQty}
        disabled={updatingQty}
      />

      <div className="variant_row__actions">
        <button
          className="icon_btn icon_btn_danger"
          onClick={onDelete}
          title="Delete variant"
        >
          ✕
        </button>
      </div>
    </div>
  );
}