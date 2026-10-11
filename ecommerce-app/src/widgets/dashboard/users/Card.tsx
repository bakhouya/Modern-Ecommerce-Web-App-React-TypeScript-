
/* ======================================================================================== */
/* ======================================================================================== */
import { EditIcon, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getInitials } from '../../../helpers/utils';
import type { UserTypes } from '../../../types/userTypes';
/* ======================================================================================== */

/* ======================================================================================== */
/* ======================================================================================== */
interface Props {
    item: UserTypes;
    isSelected: boolean;
    onToggleSelect: (id: string) => void;
    onEdit: (city: UserTypes) => void;
    onDelete: (id: string) => void;
    onViewDetails: (user: UserTypes) => void;
}
/* ======================================================================================== */


/* ======================================================================================== */
/* ======================================================================================== */
export const UserCard = ({ item, isSelected, onToggleSelect, onEdit, onDelete, onViewDetails }: Props) => {

    const { t } = useTranslation();

    return (

        <div className={`card_flex col_1 md:col_1 lg:col_2 ${isSelected ? 'selected' : ''}`} onClick={() => onViewDetails(item)}>

            <div className="">
                <div className="avatars wx border mx_auto my_end_15 bg_2_primary">
                    {item?.avatar 
                        ? <img src={item?.avatar} alt={item?.full_name}  />
                        : <div className="text text_xxl">{getInitials(item?.full_name)}</div> }
                    
                </div>

                <div className="gap_5">
                    <div className="text text_lg text_center">{item.full_name}</div>
                    <div className="text text_sm text_center">@{item.username}</div>
                    <div className="flex_start_center gap_15 inset inset_y_start inset_x_end">
                        <input type="checkbox" 
                            checked={isSelected} onChange={() => onToggleSelect(item.id)}
                            onClick={(e) => e.stopPropagation()} 
                            className="icon-checkbox"/>  
                        <span className={`text text_sm  ${item.is_active ? 'item_active': 'item_inactive'}`}>
                            {item.is_active ? t('common.active') : t('common.inactive')}
                        </span>                    
                    </div>                  
                </div>


                <div className=" my_8">
                    <div className="text text_sm  p_limit_1 text_center">{item?.email}</div>
                    <div className="text text_sm  p_limit_1 text_center">{item?.phone}</div>
                    <div className="text text_sm  p_limit_1 text_center">{item?.user_city?.title}</div>
                </div>

                                       
                <div className="footer_flex_card">
                    <div className="row gap_12">
                        <button onClick={(e) => {e.stopPropagation(); onEdit(item)}} className="btn primary_outline sm col_2" type="button">
                            <EditIcon size={13}/>
                            <div className="text text_sm"> {t('common.edit')} </div>
                        </button>
                        <button onClick={(e) => {e.stopPropagation(); onDelete(item.id)} } className="btn danger sm col_2" type="button">
                            <TrashIcon size={13} />
                            <div className="text text_sm"> {t('common.delete')} </div>
                        </button>
                    </div>
                </div>
            </div>

        </div>

    )
};
/* ======================================================================================== */




