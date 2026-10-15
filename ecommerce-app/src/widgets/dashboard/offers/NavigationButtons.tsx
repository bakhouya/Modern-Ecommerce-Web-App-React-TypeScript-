import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  step: number;
  totalSteps: number;
  isPending: boolean;
  isEdit: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const NavigationButtons: React.FC<Props> = ({
  step,
  totalSteps,
  isPending,
  isEdit,
  onPrev,
  onNext,
  onSubmit,
}) => {
  const { t } = useTranslation();

  if (step < totalSteps) {
    return (
      <div className="offer-form-nav  gap_15">
        <button type="button" className="btn md secondary" onClick={onPrev} disabled={step === 1}>
          <ChevronLeft size={20} />
          <div className="text text_md">{t('common.back')}</div>
        </button>
        <button type="button" className="btn md secondary" onClick={onNext}>
          <div className="text text_md">{t('common.next')}</div>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="offer-form-nav  gap_15">
        <button type="button" className="btn md secondary" onClick={onPrev}>
            <ChevronLeft size={20} />
            <div className="text text_md">{t('common.back')}</div>
        </button>
        <button type="submit" className="btn md primary" disabled={isPending} onClick={onSubmit}>
            <div className="text text_md">
            {isPending ? t('common.saving') : isEdit ? t('common.update') : t('common.create')}
            </div>
        </button>
    </div>
  );
};