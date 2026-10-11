

/* ------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------- */
import { useState } from 'react';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import { useTranslation } from 'react-i18next';
import { NotFound } from '../../../components/ui/NoutFound';
import type { UserTypes } from '../../../types/userTypes';
import { UserCard } from './Card';
import { UserDetail } from './UserDetail';
/* ------------------------------------------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------- */
interface Props {
    data          : UserTypes[];
    onEdit        : (city: UserTypes) => void;
    onDelete      : (id: string) => void;
    onBulkDelete  : (ids: string[]) => void;
    isFetching?   : boolean;
    totalCount    : number;
}
/* ------------------------------------------------------------------------------------------------------------- */


/* ------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------- */
export const UserList = ({ data, onEdit, onDelete, onBulkDelete, isFetching, totalCount }: Props) => {

    const { t } = useTranslation();
    /* ---------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------- */
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserTypes | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    /* ---------------------------------------------------------------------- */

    /* ---------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------- */
    const toggleSelect = (id: string) => {
      setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
    };
    /* ---------------------------------------------------------------------- */

    /* ---------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------- */
    const handleViewDetails = (user: UserTypes) => {
        setSelectedUser(user);
        setIsSidebarOpen(true);
    };
    /* ---------------------------------------------------------------------- */

    /* ---------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------- */
    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        onBulkDelete(selectedIds);
        setSelectedIds([]);
    };
    /* ---------------------------------------------------------------------- */

    /* ---------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------- */
    if (!data.length && !isFetching) return <NotFound />;
    /* ---------------------------------------------------------------------- */

    /* ---------------------------------------------------------------------- */
    /* ---------------------------------------------------------------------- */
    return (
        <div>

            <div className="bulkBar">

                  <div className="">
                      <SectionHeader title={` ${totalCount}  ${t('models.user.plural')}`} description={t('models.user.desc')}/>
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
                    <div className="row">
                        {data.map((item) => (
                            <UserCard
                                key={item.id}
                                item={item}
                                isSelected={selectedIds.includes(item.id)}
                                onToggleSelect={toggleSelect}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
            }
            <UserDetail user={selectedUser} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
        </div>
    );
    /* ---------------------------------------------------------------------- */


};
/* ------------------------------------------------------------------------------------------------------------- */
