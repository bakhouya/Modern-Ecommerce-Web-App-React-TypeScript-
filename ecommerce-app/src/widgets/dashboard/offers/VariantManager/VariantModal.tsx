import React from 'react';
import { useTranslation } from 'react-i18next';
import InputText from '../../../../components/forms/InputText';
import type { Variant } from '../types';


interface Props {
  isOpen: boolean;
  variant: Variant;
  isFixed: boolean;
  onVariantChange: (v: Variant) => void;
  onSave: () => void;
  onClose: () => void;
}

export const VariantModal: React.FC<Props> = ({
  isOpen,
  variant,
  isFixed,
  onVariantChange,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card p_12">
        <div className="text text_xxl">{t('offer.form.variants')}</div>
        <div className="divider my_start_12 my_end_15" />

        <div className="box_input">
          <InputText
            type="number"
            label="Min pieces"
            value={String(variant.min_order_pieces)}
            onChange={(e) =>
              onVariantChange({
                ...variant,
                min_order_pieces: parseInt(e.target.value, 10) || 0,
              })
            }
            error=""
          />
        </div>

        {isFixed ? (
          <div className="box_input">
            <InputText
              type="number"
              label="Fixed amount"
              value={variant.discount_fixed_amount}
              onChange={(e) =>
                onVariantChange({ ...variant, discount_fixed_amount: e.target.value })
              }
              error=""
            />
          </div>
        ) : (
          <div className="box_input">
            <InputText
              type="number"
              label="Percentage"
              value={variant.discount_percentage}
              onChange={(e) =>
                onVariantChange({ ...variant, discount_percentage: e.target.value })
              }
              error=""
            />
          </div>
        )}

        <div className="flex_end_center gap_10 my_start_20">
          <button type="button" className="btn md secondary" onClick={onClose}>
            <div className="text text_sm">{t('common.cancel')}</div>
          </button>
          <button type="button" className="btn md primary" onClick={onSave}>
            <div className="text text_sm">{t('common.save')}</div>
          </button>
        </div>
      </div>
    </div>
  );
};