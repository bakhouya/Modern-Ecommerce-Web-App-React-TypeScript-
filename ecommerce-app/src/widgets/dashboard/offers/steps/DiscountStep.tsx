import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../../../components/ui/SectionHeader';
import { SelectCardsGroup } from '../../../../components/forms/SelectCardsGroup';
import { discountItems } from '../../../../models/offers/optionals';

interface Props {
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

export const DiscountStep: React.FC<Props> = ({ value, onChange, description }) => {
  const { t } = useTranslation();
  return (
    <div>
      <SectionHeader title={t('offer.form.discountType')} description={description} />
      <div className="divider my_8" />
      <SelectCardsGroup items={discountItems} selectedValue={value} onSelect={onChange} />
    </div>
  );
};