

import { EditIcon, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { RoleTypes } from '../../../types/RolesTypes';
import { useState } from 'react';

interface Props {
  item          : RoleTypes;
  isSelected    : boolean;
  onToggleSelect: (id: number) => void;
  onEdit: (city: RoleTypes) => void;
  onDelete: (id: number) => void;
}

export const RoleCard = ({ item, isSelected, onToggleSelect, onEdit, onDelete }: Props) => {
    const { t } = useTranslation();
    const [show, setShow]   = useState(false);

    return (

        <div className={`card_flex col_1 md:col_1 lg:col_1  ${isSelected ? 'selected' : ''}`}>

            <div className="flex_between_center gap_15">
                <div className="text text_lg weight_700">{item?.name}</div>
                <div className="flex_start_center gap_15">
                    
                    <div className="slash"></div>
                    <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(item.id)} className="icon-checkbox"/>  
                    {/* <span className={`text text_sm  ${item.status ? 'item_active': 'item_inactive'}`}>
                        {item.status ? t('common.active') : t('common.inactive')}
                    </span> */}
                   
                </div>                  
            </div>

            <div className="row my_start_12" onClick={() => setShow(!show)}>
                <div className="col_1 bg_2_success radius py_8 px_12 flex_between_center"> 
                    <div className="text text"> {t('models.permissions.plural')} </div>
                    <div className="text text_xl"> {item?.permissions?.length} </div> 
                </div>
            </div>

            {show && (
                <div className="row my_start_12">
                    {item?.permissions?.map((perm) => (
                        <div className="col_2 py_15 px_15 bg_2_primary radius" key={perm.id}>
                            <div className="">
                                <div className="text text_md">{perm.name}</div> 
                            </div>                        
                        </div>                   
                    ))}
                </div>
            )}
                       
            <div className="flex_end_center gap_12 footer_flex_card">
                <button onClick={() => onEdit(item)} className="btn primary_outline sm " type="button">
                    <EditIcon size={13}/>
                    <div className="text text_sm"> {t('common.edit')} </div>
                </button>
                <button onClick={() => onDelete(item.id)} className="btn danger sm " type="button">
                    <TrashIcon size={13} />
                    <div className="text text_sm"> {t('common.delete')} </div>
                </button>
            </div>

        </div>

    )
};



