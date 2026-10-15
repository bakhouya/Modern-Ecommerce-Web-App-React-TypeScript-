
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RoleCard } from './Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import { NotFound } from '../../../components/ui/NoutFound';
import type { RoleTypes } from '../../../types/RolesTypes';

interface Props {
    data          : RoleTypes[];
    onEdit        : (city: RoleTypes) => void;
    onDelete      : (id: number) => void;
    onBulkDelete  : (ids: (number)[]) => void;
    isFetching?   : boolean;
}


export const RoleList = ({ data, onEdit, onDelete, onBulkDelete, isFetching }: Props) => {

    const { t } = useTranslation();

    const [selectedIds, setSelectedIds] = useState<(number)[]>([]);

    const toggleSelect = (id: number) => {
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
                        title={t('models.role.plural')} 
                        description={t('models.role.desc')}/>
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
                        <RoleCard
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