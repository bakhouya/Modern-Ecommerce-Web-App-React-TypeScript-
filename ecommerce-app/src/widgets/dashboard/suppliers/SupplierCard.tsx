
/* ======================================================================================== */
/* ======================================================================================== */
import { EditIcon, TrashIcon, Globe } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { RelativeDate } from '../../../components/ui/Date';
import type { SupplierTypes } from '../../../types/supplierTypes';
import { NavLink } from 'react-router-dom';
import { getInitials } from '../../../helpers/utils';
/* ======================================================================================== */

/* ======================================================================================== */
/* ======================================================================================== */
interface Props {
    item: SupplierTypes;
    isSelected: boolean;
    onToggleSelect: (id: string) => void;
    onEdit: (city: SupplierTypes) => void;
    onDelete: (id: string) => void;
}
/* ======================================================================================== */


/* ======================================================================================== */
/* ======================================================================================== */
export const SupplierCard = ({ item, isSelected, onToggleSelect, onEdit, onDelete }: Props) => {

    const { t } = useTranslation();

    return (

        <div className={`card_flex col_1 md:col_1 lg:col_2 ${isSelected ? 'selected' : ''}`}>

            <div className="">
                <div className="avatars wx border mx_auto my_end_15 bg_2_primary">
                    <div className="text text_xxl">{getInitials(item.title)}</div>
                </div>

                <div className="flex_center_center gap_5">
                    <div className="text text_lg text_center weight_700">{item.title}</div>
                    <div className="flex_start_center gap_15 inset inset_y_start inset_x_end">
                        
                        <div className="slash"></div>
                        <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(item.id)} className="icon-checkbox"/>  
                        <span className={`text text_sm  ${item.status ? 'item_active': 'item_inactive'}`}>
                            {item.status ? t('common.active') : t('common.inactive')}
                        </span>
                    
                    </div>                  
                </div>

                <div className="flex_center_center gap_8">
                    <RelativeDate date={item.created_at} />
                </div>


                <div className=" my_10">
                    <div className="text text_md  p_limit_1 text_center">{item.address}</div>
                    <div className="text text_md  p_limit_1 text_center">{item.phone}</div>
                </div>

                <div className="flex_center_center gap_15">
                    {item.web && (
                        <NavLink className="btn_icon sm bg_base border" to={item.web} target="_blank" rel="noopener noreferrer">
                            <Globe  />
                        </NavLink>
                    )}
                    {item.whatsapp && (
                        <NavLink className="btn_icon sm bg_base border" to={item.whatsapp} target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp />
                        </NavLink>
                    )}
                    {item.telegram && (
                        <NavLink className="btn_icon sm bg_base border" to={item.telegram} target="_blank" rel="noopener noreferrer">
                            <FaTelegramPlane />
                        </NavLink>
                    )}                           
                </div>
                                        
                <div className="footer_flex_card">
                    <div className="row gap_12">
                        <button onClick={() => onEdit(item)} className="btn primary_outline sm col_2" type="button">
                            <EditIcon size={13}/>
                            <div className="text text_sm"> {t('common.edit')} </div>
                        </button>
                        <button onClick={() => onDelete(item.id)} className="btn danger sm col_2" type="button">
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




