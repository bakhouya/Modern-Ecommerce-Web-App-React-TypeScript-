import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../../../components/ui/SectionHeader';
import InputText from '../../../../components/forms/InputText';
import { VariantManager } from '../VariantManager/VariantManager';
import { VariantModal } from '../VariantManager/VariantModal';
import type { Variant } from '../types';

interface Props {
  isPrice: boolean;
  isFixed: boolean;
  minOrderPrice: string;
  discountFixed: string;
  discountPercent: string;
  variants: Variant[];
  showAddVariant: boolean;
  newVariant: Variant;
  variantsError: string;
  onMinPriceChange: (val: string) => void;
  onFixedChange: (val: string) => void;
  onPercentChange: (val: string) => void;
  onAddVariant: () => void;
  onRemoveVariant: (idx: number) => void;
  onVariantModalOpen: () => void;
  onVariantModalClose: () => void;
  onNewVariantChange: (v: Variant) => void;
  errors: Record<string, string>;
  description?: string;
}

export const RulesStep: React.FC<Props> = ({
  isPrice,
  isFixed,
  minOrderPrice,
  discountFixed,
  discountPercent,
  variants,
  showAddVariant,
  newVariant,
  variantsError,
  onMinPriceChange,
  onFixedChange,
  onPercentChange,
  onAddVariant,
  onRemoveVariant,
  onVariantModalOpen,
  onVariantModalClose,
  onNewVariantChange,
  errors,
  description,
}) => {
  const { t } = useTranslation();

  if (isPrice) {
    return (
      <div className="block_form">
        <SectionHeader title={t('offer.form.discountRules')} description={description} />
        <div className="divider my_end_15" />

        <div className="box_input">
          <InputText
            type="number"
            label={t('offer.form.minOrderPrice')}
            value={minOrderPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            error={errors.min_order_price}
          />
        </div>

        {isFixed ? (
          <div className="box_input">
            <InputText
              type="number"
              label={t('offer.form.discountFixedAmount')}
              value={discountFixed}
              onChange={(e) => onFixedChange(e.target.value)}
              error={errors.discount_fixed_amount}
            />
          </div>
        ) : (
          <div className="box_input">
            <InputText
              type="number"
              label={t('offer.form.discountPercentage')}
              value={discountPercent}
              onChange={(e) => onPercentChange(e.target.value)}
              error={errors.discount_percentage}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="block_form">
      <SectionHeader title={t('offer.form.variants')} description={description} />
      <div className="divider my_end_15" />

      <VariantManager
        variants={variants}
        isFixed={isFixed}
        onRemove={onRemoveVariant}
        onAdd={onVariantModalOpen}
        error={variantsError}
      />

      <VariantModal
        isOpen={showAddVariant}
        variant={newVariant}
        isFixed={isFixed}
        onVariantChange={onNewVariantChange}
        onSave={onAddVariant}
        onClose={onVariantModalClose}
      />
    </div>
  );
};