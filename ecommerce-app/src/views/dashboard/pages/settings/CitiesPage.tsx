
/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CityList } from '../../../../widgets/dashboard/cities/CityList';
import { CityFormModal } from '../../../../widgets/dashboard/cities/CityFormModal';
import { ConfirmationModal } from '../../../../components/ui/ConfirmationModal';
import { Pagination } from '../../../../components/ui/Pagination';

import { type CityFormType } from '../../../../validations/citySchema';
import { handleBackendErrors } from '../../../../helpers/handleValidationErrors';

import type { CityTypes } from '../../../../types/cityTypes';
import { LoadingDisplay } from '../../../../components/ui/LoadingDisplay';
import { SearchInput } from '../../../../components/ui/SearchInput';
import { FilterHeader } from '../../../../components/ui/FilterHeader';
import { createCityHooks } from '../../../../controllers/useCities';
import { AddButton } from '../../../../components/ui/AddButton';
import { AccordionRadioFilter } from '../../../../components/filters/AccordionRadioFilter';
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
const PAGE_SIZE = 10;
/* ---------------------------------------------------------------------------------*/



/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const CitiesPage = () => {
    const { t } = useTranslation();

    const statusOptions = [
        { id: true, label: t('common.active') },
        { id: false, label: t('common.inactive') },
    ];
    
    const { useAll, useCreate, useUpdate, useDelete, useBulkDelete } = createCityHooks(t);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<string | boolean | null>(null);
    const [search, setSearch] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [editingCity, setEditingCity] = useState<CityTypes | null>(null);

    const [confirmState, setConfirmState] = useState({ isOpen: false, onConfirm: () => {}, title: '', message: '',});

    const { data, isLoading, isFetching } = useAll({ page, title: search, status: status ?? null });
    const cities = data?.results || [];
    const totalPages = Math.ceil((data?.pagination?.count || 0) / PAGE_SIZE);

    const createMutation = useCreate();
    const updateMutation = useUpdate();
    const deleteMutation = useDelete();
    const bulkDeleteMutation = useBulkDelete();
    

    const showConfirm = ( title: string, message: string, onConfirm: () => void) => {
        setConfirmState({  isOpen: true,  onConfirm,  title,  message});
    };

    const handleSave = (formData: CityFormType, setErrors: (errors: Record<string, string>) => void) => {
        if (editingCity) {
            updateMutation.mutate( 
                {id: editingCity.id, data: formData,}, 
                {onError: (error) => handleBackendErrors(error, setErrors),}
            );
        } else {
            createMutation.mutate(formData, {
                onError: (error) =>
                handleBackendErrors(error, setErrors),
            });
        }
        setModalOpen(false);
    };

    const handleDelete = (id: string, name?: string) => {
        const entity = t('entities.city');
        const title = t('crud.deleteTitle');
        const message = name
            ? t('crud.deleteConfirmationWithName', { entity, name })
            : t('crud.deleteSingleConfirmation', { entity });
        
        showConfirm(title, message, () => deleteMutation.mutate(id));
    };

    const handleBulkDelete = (ids: string[]) => {
        const entity = t('entities.city');
        const title = t('crud.bulkDeleteTitle');
        const count = ids.length;
        const message = t('crud.bulkDeleteConfirmation', { count, entity });

        showConfirm(title, message, () => bulkDeleteMutation.mutate(ids));
    };


    if (isLoading) {return <LoadingDisplay />;}

    return (
        <div className="wrapper_page">

        <aside className="nav_container">

            <FilterHeader title={t('filters.title')} />  
            <div className="nav_body">
                <SearchInput placeholder={t('search.placeholder')} value={search} onChange={(e) => setSearch(e.target.value)}/>
                
                <AccordionRadioFilter
                    title={t('common.status')}
                    items={statusOptions}
                    selectedId={status}
                    onChange={setStatus}
                    open={true}
                />
            </div>
            <AddButton onClick={() => {setEditingCity(null); setModalOpen(true);}} label={t('crud.addNew')} size="lg"/>

        </aside>

        <div className="flex_container">
                
                {/* Liste */}
                <CityList
                    cities={cities}
                    onEdit={(city) => {setEditingCity(city); setModalOpen(true);}}
                    onDelete={handleDelete}
                    onBulkDelete={handleBulkDelete}
                    isFetching={isFetching}
                />
                {totalPages > 1 && (<Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>)}
                
        </div>

        <CityFormModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            initialData={editingCity}
        />

        <ConfirmationModal
                isOpen={confirmState.isOpen}
                title={confirmState.title}
                message={confirmState.message}
                onConfirm={() => {
                    confirmState.onConfirm();
                    setConfirmState((prev) => ({...prev, isOpen: false}));
                }}
                onCancel={() =>
                    setConfirmState((prev) => ({...prev, isOpen: false}))
                }
        />
        </div>
    );

};
/* ---------------------------------------------------------------------------------*/



