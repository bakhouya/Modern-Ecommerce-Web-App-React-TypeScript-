
import { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import type { ServiceTypes } from '../../../types/serviceTypes';
import { useTranslation } from 'react-i18next';
import { NotFound } from '../../../components/ui/NoutFound';

interface Props {
  data: ServiceTypes[];
  onEdit: (city: ServiceTypes) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  isFetching?: boolean;
  totalCount?    : number;
}


export const ServiceList = ({ data, onEdit, onDelete, onBulkDelete, isFetching, totalCount }: Props) => {

    const { t } = useTranslation();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    const toggleSelectAll = () => {
      if (selectedIds.length === data.length) {
        setSelectedIds([]);
      } else {
        setSelectedIds(data.map((c) => c.id));
      }
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
                    <SectionHeader title={`${totalCount}  ${t('models.service.plural')}`} description={t('models.service.desc')}/>
                  </div>
                  <div className="flex_start_center gap_8">

                      {selectedIds.length > 0 && (
                          <button onClick={handleBulkDelete} className="btn md danger">
                              <div className="text text_md"> {t('common.delete')} ({selectedIds.length})</div>
                          </button>
                      )}

                      <label className="pointer flex_start_center gap_10 radius px_10 py_7 select_all border">
                          <input
                              type="checkbox"
                              checked={selectedIds.length === data.length && data.length > 0}
                              onChange={toggleSelectAll}
                              className="icon-checkbox hidden"
                          />
                          <div className="text text_md"> {t('common.selectAll')}  </div>
                      </label>

                  </div>

            </div>

            {isFetching && <LoadingDisplay />}

            <div className="cardGrid">
                  {data.map((item) => (
                      <ServiceCard
                          key={item.id}
                          policy={item}
                          isSelected={selectedIds.includes(item.id)}
                          onToggleSelect={toggleSelect}
                          onEdit={onEdit}
                          onDelete={onDelete}
                      />
                  ))}
            </div>

        </div>
    );

};