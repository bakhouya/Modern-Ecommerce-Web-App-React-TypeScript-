
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CouponCard } from './Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import { NotFound } from '../../../components/ui/NoutFound';
import type { CouponTypes } from '../../../types/couponTypes';

interface Props {
  data          : CouponTypes[];
  onEdit        : (city: CouponTypes) => void;
  onDelete      : (id: string) => void;
  onBulkDelete  : (ids: string[]) => void;
  isFetching?   : boolean;
}


export const CouponList = ({ data, onEdit, onDelete, onBulkDelete, isFetching }: Props) => {

    const { t } = useTranslation();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
      setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
    };


    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        onBulkDelete(selectedIds);
        setSelectedIds([]);
    };

    if (!data.length && !isFetching) return <NotFound />;

    return (
        <div>

            <div className="bulkBar">

                  <div className="">
                      <SectionHeader 
                        title={t('models.coupon.plural')} 
                        description={t('models.coupon.desc')}/>
                  </div>
                  <div className="flex_start_center gap_10">

                      {selectedIds.length > 0 && (
                          <button onClick={handleBulkDelete} className="btn md danger">
                              <div className="text text_md"> {t('common.delete')} ({selectedIds.length})</div>
                          </button>
                      )}
                  </div>

            </div>

            {isFetching 
            ? 
                <LoadingDisplay /> 
            :
                <div className="cardGrid row">
                    {data.map((item) => (
                        <CouponCard
                            key={item.id}
                            item={item}
                            isSelected={selectedIds.includes(item.id)}
                            onToggleSelect={toggleSelect}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            }

        </div>
    );

};