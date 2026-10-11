
/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmationModal } from '../../../../components/ui/ConfirmationModal';
import { Pagination } from '../../../../components/ui/Pagination';
import { LoadingDisplay } from '../../../../components/ui/LoadingDisplay';
import { SearchInput } from '../../../../components/ui/SearchInput';
import { FilterHeader } from '../../../../components/ui/FilterHeader';

import { AccordionRadioFilter } from '../../../../components/filters/AccordionRadioFilter';
import { createOffersHooks } from '../../../../controllers/useOffer';
import { OfferList } from '../../../../widgets/dashboard/offers/List';

import ROUTES from '../../../../routers/dashboard/path';
import { AddLinkButton } from '../../../../components/ui/AddLinkButton';
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
const PAGE_SIZE = 10;
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const OfferPage = () => {
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
    const { useAll, useDelete, useBulkDelete } = createOffersHooks(t);
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const [page, setPage]                   = useState(1);
    const [status, setStatus]               = useState<string | boolean | null>(null);
    const [search, setSearch]               = useState('');
    const [confirmState, setConfirmState]   = useState({ isOpen: false, onConfirm: () => {}, title: '', message: '',});
    /* ------------------------------------------------------------------------------*/


    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const { data, isLoading, isFetching } = useAll({
        page, 
        title   : search, 
        status  : status ?? null ,
    });
    const coupons = data?.results || [];
    const totalPages = Math.ceil((data?.pagination?.count || 0) / PAGE_SIZE);
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
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
    const handleDelete = (id: string, name?: string) => {
        const entity = t('models.coupon.singular');
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
        const entity = t('models.coupon.singular');
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

            <AddLinkButton url={ROUTES.CREATE} label={t('crud.addNew')} size="lg"/>
                
            
        </aside>

        <div className="flex_container">
                
                {/* Liste */}
                <OfferList
                    data={coupons}
                    onDelete={handleDelete}
                    onBulkDelete={handleBulkDelete}
                    isFetching={isFetching}
                />
                {totalPages > 1 && (<Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>)}
                
        </div>


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







