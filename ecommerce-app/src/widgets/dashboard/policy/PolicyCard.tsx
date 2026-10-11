

import type { PolicyTypes } from '../../../types/policyTypes';
import { BaseCard } from '../../../components/boxs/BaseCard';

interface Props {
  item: PolicyTypes;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (city: PolicyTypes) => void;
  onDelete: (id: string) => void;
}

export const PolicyCard = ({ item, isSelected, onToggleSelect, onEdit, onDelete }: Props) => {
    return (

        // <div className={`card_flex  ${isSelected ? 'selected' : ''}`}>

        //     <div className="flex_between_center gap_15">
        //         <div className="text text_lg weight_700">{policy.title}</div>
        //         <div className="flex_start_center gap_15">
                    
        //             <div className="slash"></div>
        //             <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(policy.id)} className="icon-checkbox"/>  
        //             <span className={`text text_sm  ${policy.status ? 'item_active': 'item_inactive'}`}>
        //                 {policy.status ? t('common.active') : t('common.inactive')}
        //             </span>
                   
        //         </div>                  
        //     </div>

        //     <div className="flex_start_center gap_10 ">
        //         <RelativeDate date={policy.updated_at} />
        //     </div>

        //     <div className="text text_md my_start_7 p_limit_2">{policy.description}</div>
                       
        //     <div className="flex_end_center gap_12 footer_flex_card">
        //         <button onClick={() => onEdit(policy)} className="btn primary_outline sm" type="button">
        //             <EditIcon size={13}/>
        //             <div className="text text_sm"> {t('common.edit')} </div>
        //         </button>
        //         <button onClick={() => onDelete(policy.id)} className="btn danger sm" type="button">
        //             <TrashIcon size={13} />
        //             <div className="text text_sm"> {t('common.delete')} </div>
        //         </button>
        //     </div>

        // </div>

        <BaseCard
            id={item.id}
            title={item.title}
            status={item.status}
            created_at={item.created_at}
            description={item.description}
            isSelected={isSelected}
            onToggleSelect={onToggleSelect}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}>
        </BaseCard>

    )
};



