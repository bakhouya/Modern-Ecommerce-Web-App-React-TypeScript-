
import { useState } from 'react';
import type { CityTypes } from '../../../types/cityTypes';
import { CityCard } from './CityCard';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import { useTranslation } from 'react-i18next';

interface Props {
  cities: CityTypes[];
  onEdit: (city: CityTypes) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  isFetching?: boolean;
}

export const CityList = ({ cities, onEdit, onDelete, onBulkDelete, isFetching }: Props) => {
  const { t } = useTranslation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === cities.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cities.map((c) => c.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    onBulkDelete(selectedIds);
    setSelectedIds([]);
  };

  if (!cities.length && !isFetching) return <div>Aucune ville trouvée</div>;

  return (
    <div>

      <div className="bulkBar">

            <div className="">
                <SectionHeader title={t('entities.city')} description="Configurer l'affichage des factures liées aux commandes clients"/>
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
                        checked={selectedIds.length === cities.length && cities.length > 0}
                        onChange={toggleSelectAll}
                        className="icon-checkbox"
                    />
                    <div className="text text_md"> {t('common.selectAll')}  </div>
                </label>

            </div>

      </div>

      {isFetching && <LoadingDisplay />}

      <div className="cardGrid">
            {cities.map((city) => (
                <CityCard
                    key={city.id}
                    city={city}
                    isSelected={selectedIds.includes(city.id)}
                    onToggleSelect={toggleSelect}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
      </div>


    </div>
  );
};