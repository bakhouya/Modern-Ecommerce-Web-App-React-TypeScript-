

import type { ShippingTypes } from '../../../types/shippingsTypes';
import { BaseCard } from '../../../components/boxs/BaseCard';

interface Props {
  item          : ShippingTypes;
  isSelected    : boolean;
  onToggleSelect: (id: string) => void;
  onEdit        : (city: ShippingTypes) => void;
  onDelete      : (id: string) => void;
}

export const ShippingCard = ({ item, isSelected, onToggleSelect, onEdit, onDelete }: Props) => {
    return (

        <BaseCard
            id={item.id}
            title={item.title}
            image={item.logo}
            status={item.status}
            created_at={item.created_at}
            description={item.address}
            isSelected={isSelected}
            onToggleSelect={onToggleSelect}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}>

            <div className="flex_start_center gap_10">
                <div className="text text_md">{item?.phone}</div>
                <div className="slash"></div> 
                <div className="text text_md text_primary  p_limit_1">
                    <a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url}</a> 
                </div>
            </div>

        </BaseCard>

    )
};



