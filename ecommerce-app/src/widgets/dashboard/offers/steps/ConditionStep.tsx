import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../../../components/ui/SectionHeader';
import { SelectCardsGroup } from '../../../../components/forms/SelectCardsGroup';
import { conditionItems } from '../../../../models/offers/optionals';

interface Props {
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

export const ConditionStep: React.FC<Props> = ({ value, onChange, description }) => {
  const { t } = useTranslation();
  return (
    <div>
      <SectionHeader title={t('offer.form.conditionType')} description={description} />
      <div className="divider my_8" />
      <SelectCardsGroup items={conditionItems} selectedValue={value} onSelect={onChange} />
    </div>
  );
};