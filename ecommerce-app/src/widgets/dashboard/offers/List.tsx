
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OfferCard } from './Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import { NotFound } from '../../../components/ui/NoutFound';
import type { OfferTypes } from '../../../types/offersTypes';

interface Props {
  data          : OfferTypes[];
  onDelete      : (id: string) => void;
  onBulkDelete  : (ids: string[]) => void;
  isFetching?   : boolean;
}


export const OfferList = ({ data, onDelete, onBulkDelete, isFetching }: Props) => {

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
                        title={t('models.offer.plural')} 
                        description={t('models.offer.desc')}/>
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
                        <OfferCard
                            key={item.id}
                            item={item}
                            isSelected={selectedIds.includes(item.id)}
                            onToggleSelect={toggleSelect}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            }

        </div>
    );

};