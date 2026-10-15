

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConfirmationModal } from '../../../../components/ui/ConfirmationModal';
import { Pagination } from '../../../../components/ui/Pagination';
import { LoadingDisplay } from '../../../../components/ui/LoadingDisplay';
import { SearchInput } from '../../../../components/ui/SearchInput';
import { FilterHeader } from '../../../../components/ui/FilterHeader';

import { handleBackendErrors } from '../../../../helpers/handleValidationErrors';
import { AddButton } from '../../../../components/ui/AddButton';
import { AccordionRadioFilter } from '../../../../components/filters/AccordionRadioFilter';
import { createUsersHooks } from '../../../../controllers/useUser';
import type { UserTypes } from '../../../../types/userTypes';
import { UserList } from '../../../../widgets/dashboard/users/List';
import { UserFormModal } from '../../../../widgets/dashboard/users/FormModal';
import { useActiveCities } from '../../../../controllers/useCities';
import { useActiveBranches } from '../../../../controllers/useBranch';
import { useGroups } from '../../../../controllers/useRoles';
import { BooleanPillFilter } from '../../../../components/filters/BooleanPillFilter';

/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
const PAGE_SIZE = 10;
/* ---------------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const UsersPage = () => {
    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const { t } = useTranslation();
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const statusOptions = [
        { id: true, label: t('common.active') },
        { id: false, label: t('common.inactive') },
    ];
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const { useAll, useCreate, useUpdate, useDelete, useBulkDelete } = createUsersHooks(t);

    const { data: citiesData} = useActiveCities();
    const { data: branchesData } = useActiveBranches();
    const { data: groupsData } = useGroups();

    const cities = citiesData?.map((item) => ({id: item.id, label: item.title})) || []; 
    const branches = branchesData?.map((item) => ({id: item.id, label: item.title})) || []; 
    const groups = groupsData?.map((item) => ({id: item.id, label: item.name})) || []; 
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<string | boolean | null>(null);
    const [search, setSearch] = useState('');
    const [city, setCity] = useState<string | null>(null);
    const [branch, setBranch] = useState<string | null>(null);
    const [role, setRole] = useState<number | null>(null);

    const [isStaff, setIsStaff] = useState<boolean | null>(true);
    const [isSuperuser, setIsSuperuser] = useState<boolean | null>(false);
    const [isOnDuty, setIsOnDuty] = useState<boolean | null>(null);
    const [isBusy, setIsBusy] = useState<boolean | null>(null);
    const [canViewAllBranches, setCanViewAllBranches] = useState<boolean | null>(null);


    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<UserTypes | null>(null);
    const [confirmState, setConfirmState] = useState({ isOpen: false, onConfirm: () => {}, title: '', message: '',});

    const [selectedCityIds, setSelectedCityIds] = useState<string[]>([]);
    const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>([]);
    const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
    /* ------------------------------------------------------------------------------*/


    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const { data, isLoading, isFetching } = useAll({
        page, 
        full_name: search, 
        email: search, 
        phone: search, 
        address: search, 
        is_active  : status ?? null  ,
        branch_id: branch ?? null,
        city_id: city ?? null,
        group_id: role ?? null, 

        is_staff: isStaff ?? null,
        is_superuser: isSuperuser ?? null,
        is_on_duty: isOnDuty ?? null,
        is_busy: isBusy ?? null,
        can_view_all_branches: canViewAllBranches ?? null,
    });
    const users = data?.results || [];
    const totalPages = Math.ceil((data?.pagination?.count || 0) / PAGE_SIZE);
    /* ------------------------------------------------------------------------------*/

    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const createMutation  = useCreate();
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
    const handleSave = (formData: FormData, setErrors: (errors: Record<string, string>) => void) => {
        if (editing) {
            updateMutation.mutate({ id: editing.id, data: formData },{ 
                onError: (error) => handleBackendErrors(error, setErrors),
                onSuccess: () => {setModalOpen(false)},
            }
            );
        } else {
            createMutation.mutate(formData, {
                onError: (error) => {handleBackendErrors(error, setErrors)},
                onSuccess: () => {setModalOpen(false)},
            });
        }
    };
    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    const handleDelete = (id: string, name?: string) => {
        const entity = t('models.user.singular');
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
        const entity = t('models.user.plural');
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



    const handleOpenAddModal = () => {
        setEditing(null);
        setSelectedCityIds([]);
        setSelectedBranchIds([]);
        setSelectedGroupIds([]);
        setModalOpen(true);
    };

    const handleOpenEditModal = (user: UserTypes) => {
        setEditing(user);
        setSelectedCityIds(user.user_city?.id ? [user.user_city.id] : []);
        setSelectedBranchIds(user.user_branches?.map(b => b.id) || []);
        setSelectedGroupIds(user.user_groups?.map(g => g.id) || []);
        setModalOpen(true);
    };


    /* ------------------------------------------------------------------------------*/
    /* ------------------------------------------------------------------------------*/
    return (
        <div className="wrapper_page">

        <aside className="nav_container">

            <FilterHeader title={t('filters.title')} /> 
            <div className="scroll">
                <SearchInput placeholder={t('search.placeholder')} value={search} onChange={(e) => setSearch(e.target.value)}/>
               
                <div className="">
                    <BooleanPillFilter title={t('fields.staff')} value={isStaff} onChange={setIsStaff}/>
                    <AccordionRadioFilter
                        title={t('common.status')}
                        items={statusOptions}
                        selectedId={status}
                        onChange={setStatus}
                        open={false}
                    />
                </div>
                <div className="">
                    <BooleanPillFilter title={t('fields.superuser')} value={isSuperuser} onChange={setIsSuperuser}/>
                    <AccordionRadioFilter
                        title={t('models.role.plural')}
                        items={groups}
                        selectedId={role}
                        onChange={setRole}
                        open={false}
                    />
                </div>
                <div className="">
                    <BooleanPillFilter title={t('fields.on_duty')} value={isOnDuty} onChange={setIsOnDuty}/>
                    <AccordionRadioFilter
                        title={t('models.branch.plural')}
                        items={branches}
                        selectedId={branch}
                        onChange={setBranch}
                        open={false}
                    />
                </div>
                <div className="">
                    <BooleanPillFilter
                        title={t('fields.can_view_all_branches')}
                        value={canViewAllBranches}
                        onChange={setCanViewAllBranches}
                    />
                    <AccordionRadioFilter
                        title={t('models.city.plural')}
                        items={cities}
                        selectedId={city}
                        onChange={setCity}
                        open={false}
                    />
                </div>
                <div className="">
                               
                    <BooleanPillFilter
                        title={t('fields.busy')}
                        value={isBusy}
                        onChange={setIsBusy}
                    />
                
                </div>

               
                

                
            </div>
            <AddButton onClick={handleOpenAddModal} label={t('crud.addNew')} size="lg"/>
                                

        </aside>

        <div className="flex_container">
                
                {/* Liste */}
                <UserList
                    data={users}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDelete}
                    onBulkDelete={handleBulkDelete}
                    isFetching={isFetching}
                    totalCount={data?.pagination?.count || 0}
                />
                {totalPages > 1 && (<Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>)}
                
        </div>


        {modalOpen && (
            // <UserFormModal
            //     isOpen={modalOpen}
            //     isPending={updateMutation.isPending || createMutation.isPending}
            //     onClose={() => setModalOpen(false)}
            //     onSave={handleSave}
            //     initialData={editing}
            // />
            <UserFormModal
                isOpen={modalOpen}
                isPending={createMutation.isPending || updateMutation.isPending}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                initialData={editing}
                selectedCityIds={selectedCityIds}
                selectedBranchIds={selectedBranchIds}
                selectedGroupIds={selectedGroupIds}
                onSelectedCityChange={setSelectedCityIds}
                onSelectedBranchChange={setSelectedBranchIds}
                onSelectedGroupChange={setSelectedGroupIds}
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





