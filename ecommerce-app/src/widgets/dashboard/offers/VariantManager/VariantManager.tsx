import React from 'react';
import { X } from 'lucide-react';
import type { Variant } from '../types';


interface Props {
  variants: Variant[];
  isFixed: boolean;
  onRemove: (index: number) => void;
  onAdd: () => void;
  error?: string;
}

export const VariantManager: React.FC<Props> = ({
  variants,
  isFixed,
  onRemove,
  onAdd,
  error,
}) => {
  return (
    <div>
      <div className="flex_between_center my_end_15">
        <button type="button" className="btn md primary" onClick={onAdd} typeof="button">
           <div className="text text_md"> Ajouter Variant </div>
        </button>
      </div>

      {error && <div className="offer-form-error">{error}</div>}

      <div className="check_cards">
        {variants.map((v, idx) => (
          <div key={idx} className="check_item_card p_add">
            <div className="flex_start_center gap_12">
              <span>
                <span className="text text_md">Min pieces:</span>
                <span className="text text_md text_primary"> {v.min_order_pieces}</span>
              </span>
              <span>
                {isFixed ? (
                  <>
                    <span className="text text_md">Fixed:</span>
                    <span className="text text_md text_primary"> {v.discount_fixed_amount}Dh</span>
                  </>
                ) : (
                  <>
                    <span className="text text_md">%:</span>
                    <span className="text text_md text_primary"> {v.discount_percentage}%</span>
                  </>
                )}
              </span>
            </div>
            <button type="button" className="btn_icon border sm" onClick={() => onRemove(idx)}>
              <X size={18} className="text text_sm" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};