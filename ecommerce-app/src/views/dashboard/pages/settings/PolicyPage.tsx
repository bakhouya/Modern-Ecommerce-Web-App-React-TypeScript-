
/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmationModal } from '../../../../components/ui/ConfirmationModal';
import { Pagination } from '../../../../components/ui/Pagination';
import { LoadingDisplay } from '../../../../components/ui/LoadingDisplay';
import { SearchInput } from '../../../../components/ui/SearchInput';
import { FilterHeader } from '../../../../components/ui/FilterHeader';
import { createPolicyHooks } from '../../../../controllers/usePolicy';

import type { PolicyFormType } from '../../../../validations/policySchema';
import { handleBackendErrors } from '../../../../helpers/handleValidationErrors';
import type { PolicyTypes } from '../../../../types/policyTypes';

import { PolicyFormModal } from '../../../../widgets/dashboard/policy/PolicyFormModal';
import { PolicyList } from '../../../../widgets/dashboard/policy/PolicyList';
import { AddButton } from '../../../../components/ui/AddButton';
import { AccordionRadioFilter } from '../../../../components/filters/AccordionRadioFilter';
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
const PAGE_SIZE = 10;
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const PolicysPage = () => {
    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const { t } = useTranslation();
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const statusOptions  = [
        { id: true, label: t('common.active') },
        { id: false, label: t('common.inactive') },
    ];
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const { useAll, useCreate, useUpdate, useDelete, useBulkDelete } = createPolicyHooks(t);
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<string | boolean | null>(null);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<PolicyTypes | null>(null);
    const [confirmState, setConfirmState] = useState({ isOpen: false, onConfirm: () => {}, title: '', message: '',});
    /* ------------------------------------------------------------------------------*/


    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const { data, isLoading, isFetching } = useAll({
        page, title: search, 
        description: search, 
        status: status ?? null ,
    });
    const policies = data?.results || [];
    const totalPages = Math.ceil((data?.pagination?.count || 0) / PAGE_SIZE);
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const createMutation = useCreate();
    const updateMutation = useUpdate();
    const deleteMutation = useDelete();
    const bulkDeleteMutation = useBulkDelete();
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const showConfirm = ( title: string, message: string, onConfirm: () => void) => {
        setConfirmState({  isOpen: true,  onConfirm,  title,  message});
    };
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const handleSave = (formData: PolicyFormType, setErrors: (errors: Record<string, string>) => void) => {
        if (editing) {
            updateMutation.mutate( 
                {id: editing.id, data: formData,}, 
                {
                    onError: (error) => handleBackendErrors(error, setErrors), 
                    onSuccess: () => setModalOpen(false) 
                }
            );
        } else {
            createMutation.mutate(formData, {
                onError: (error) => handleBackendErrors(error, setErrors),
                onSuccess: () => setModalOpen(false) 
            });
        }
    };
    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const handleDelete = (id: string, name?: string) => {
        const entity = t('entities.policy');
        const title = t('crud.deleteTitle');
        const message = name
            ? t('crud.deleteConfirmationWithName', { entity, name })
            : t('crud.deleteSingleConfirmation', { entity });
        
        showConfirm(title, message, () => deleteMutation.mutate(id));
    };
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const handleBulkDelete = (ids: string[]) => {
        const entity = t('entities.policy');
        const title = t('crud.bulkDeleteTitle');
        const count = ids.length;
        const message = t('crud.bulkDeleteConfirmation', { count, entity });

        showConfirm(title, message, () => bulkDeleteMutation.mutate(ids));
    };
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    if (isLoading) {return <LoadingDisplay />;}
    /* ------------------------------------------------------------------------------*/


    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    return (
        <div className="wrapper_page">

        <aside className="nav_container">

            <FilterHeader title={t('filters.title')} /> 
            <div className="scroll">
                <SearchInput placeholder={t('search.placeholder')} value={search} onChange={(e) => setSearch(e.target.value)}/>

                <AccordionRadioFilter
                    title={t('common.status')}
                    items={statusOptions}
                    selectedId={status}
                    onChange={setStatus}
                    open={true}
                />
            </div>

            <AddButton onClick={() => {setEditing(null); setModalOpen(true);}} label={t('crud.addNew')} size="lg"/>
                

        </aside>

        <div className="flex_container">
                
                {/* Liste */}
                <PolicyList
                    data={policies}
                    onEdit={(policy) => {setEditing(policy); setModalOpen(true);}}
                    onDelete={handleDelete}
                    onBulkDelete={handleBulkDelete}
                    isFetching={isFetching}
                    totalCount={data?.pagination?.count || 0}
                />
                {totalPages > 1 && (<Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>)}
                
        </div>


        {modalOpen && (
            <PolicyFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                initialData={editing}
            />
        )}
        

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
    /* ------------------------------------------------------------------------------*/


};
/* ---------------------------------------------------------------------------------*/





