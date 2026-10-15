
import { useState } from 'react';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import { useTranslation } from 'react-i18next';
import { NotFound } from '../../../components/ui/NoutFound';
import type { SupplierTypes } from '../../../types/supplierTypes';
import { SupplierCard } from './SupplierCard';

interface Props {
  data: SupplierTypes[];
  onEdit: (city: SupplierTypes) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  isFetching?: boolean;
}


export const SupplierList = ({ data, onEdit, onDelete, onBulkDelete, isFetching }: Props) => {

    const { t } = useTranslation();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    // const toggleSelectAll = () => {
    //   if (selectedIds.length === data.length) {
    //     setSelectedIds([]);
    //   } else {
    //     setSelectedIds(data.map((c) => c.id));
    //   }
    // };

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
                      <SectionHeader title={t('entities.supplier')} description="Configurer l'affichage des factures liées aux commandes clients"/>
                  </div>
                  <div className="flex_start_center gap_10">

                      {selectedIds.length > 0 && (
                          <button onClick={handleBulkDelete} className="btn md danger">
                              <div className="text text_md"> {t('common.delete')} ({selectedIds.length})</div>
                          </button>
                      )}
                  </div>

            </div>

            {isFetching && <LoadingDisplay />}

            <div className="row">
                  {data.map((item) => (
                      <SupplierCard
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