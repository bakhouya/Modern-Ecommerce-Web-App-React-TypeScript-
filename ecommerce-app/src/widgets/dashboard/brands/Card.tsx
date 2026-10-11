

import { EditIcon, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RelativeDate } from '../../../components/ui/Date';
import type { BrandTypes } from '../../../types/brandTypes';

interface Props {
  item          : BrandTypes;
  isSelected    : boolean;
  onToggleSelect: (id: string) => void;
  onEdit        : (city: BrandTypes) => void;
  onDelete      : (id: string) => void;
}

export const BrandCard = ({ item, isSelected, onToggleSelect, onEdit, onDelete }: Props) => {
    const { t } = useTranslation();
    return (

        <div className={`card_flex  ${isSelected ? 'selected' : ''}`}>
            <div className="flex">
                {item.image 
                    ? <div className="img_card_flex"> <img src={item.image} className='full_img' alt=""/> </div> 
                    : <div className="img_card_flex"> </div>}
                

                <div className="flex_1">
                    <div className="flex_between_center gap_15">
                        <div className="text text_lg weight_700">{item.title}</div>
                        <div className="flex_start_center gap_15">
                            
                            <div className="slash"></div>
                            <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(item.id)} className="icon-checkbox"/>  
                            <span className={`text text_sm  ${item.status ? 'item_active': 'item_inactive'}`}>
                                {item.status ? t('common.active') : t('common.inactive')}
                            </span>
                        
                        </div>                  
                    </div>

                    <RelativeDate date={item.created_at} />
                    <div className="text text_sm my_6 p_limit_2">{item.description}</div>

                    <div className="flex_start_center gap_10">
                        {item?.category_details?.map((i) => (
                            <div className="flex_start_center gap_6 border radius_30 px_5">
                                <img src={i.image} alt="" className="avatars xs"/>
                                <div className="text text_sm p_limit_1">{i.title}</div>
                            </div>
                        ))}
                    </div>
                                              
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

            </div>
        </div>

    )
};



