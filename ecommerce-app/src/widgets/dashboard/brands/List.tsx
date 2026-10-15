
import { useState } from 'react';
import { BrandCard } from './Card2';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import { useTranslation } from 'react-i18next';
import { NotFound } from '../../../components/ui/NoutFound';
import type { BrandTypes } from '../../../types/brandTypes';

interface Props {
    data          : BrandTypes[];
    onEdit        : (city: BrandTypes) => void;
    onDelete      : (id: string) => void;
    onBulkDelete  : (ids: string[]) => void;
    isFetching?   : boolean;
    totalCount    : number;
}


export const BrandList = ({ data, onEdit, onDelete, onBulkDelete, isFetching, totalCount }: Props) => {

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
                      <SectionHeader title={` ${totalCount}  ${t('models.brand.plural')}`} description={t('models.brand.desc')}/>
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
                            <BrandCard
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