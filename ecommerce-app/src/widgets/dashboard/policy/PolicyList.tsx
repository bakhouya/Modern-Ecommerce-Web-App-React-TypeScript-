
import { useState } from 'react';
import { PolicyCard } from './PolicyCard';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import type { PolicyTypes } from '../../../types/policyTypes';
import { useTranslation } from 'react-i18next';

interface Props {
  data: PolicyTypes[];
  onEdit: (city: PolicyTypes) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  isFetching?: boolean;
  totalCount?    : number;
}


export const PolicyList = ({ data, onEdit, onDelete, onBulkDelete, isFetching, totalCount }: Props) => {

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

    if (!data.length && !isFetching) return <div>Aucune ville trouvée</div>;

    return (
        <div>

            <div className="bulkBar">

                  <div className="">
                    <SectionHeader title={`${totalCount}  ${t('models.policy.plural')}`} description={t('models.policy.desc')}/>
                  </div>
                  <div className="flex_start_center gap_10">

                      {selectedIds.length > 0 && (
                          <button onClick={handleBulkDelete} className="btn md danger">
                              <div className="text text_md"> {t('common.delete')} ({selectedIds.length})</div>
                          </button>
                      )}

                      <label className="pointer flex_start_center gap_10 border radius px_8 py_9">
                          <input
                              type="checkbox"
                              checked={selectedIds.length === data.length && data.length > 0}
                              onChange={toggleSelectAll}
                              className="icon-checkbox"
                          />
                          <div className="text text_md"> {t('common.selectAll')}  </div>
                      </label>

                  </div>

            </div>

            {isFetching && <LoadingDisplay />}

            <div className="cardGrid">
                  {data.map((item) => (
                      <PolicyCard
                          key={item.id}
                          item={item}
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