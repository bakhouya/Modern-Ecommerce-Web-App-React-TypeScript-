
import type { CategoryTypes } from '../../../types/categoryTypes';
import { BaseCard } from '../../../components/boxs/BaseCard';

interface Props {
  item          : CategoryTypes;
  isSelected    : boolean;
  onToggleSelect: (id: string) => void;
  onEdit        : (city: CategoryTypes) => void;
  onDelete      : (id: string) => void;
}

export const CategoryCard = ({ item, isSelected, onToggleSelect, onEdit, onDelete }: Props) => {

    return (

        <BaseCard
            id={item.id}
            title={item.title}
            image={item.image}
            status={item.status}
            created_at={item.created_at}
            description={item.description}
            isSelected={isSelected}
            onToggleSelect={onToggleSelect}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}>

            {item?.parent_details && (
                <div className="base-card__categories ">
                    <div className="flex_start_center gap_6 base-card__tag">
                        <img src={item?.parent_details.image} alt="" className="avatars xs"/>
                        <div className="text text_sm">{item?.parent_details.title}</div>
                    </div> 
                </div> 
            )} 

        </BaseCard>

    )
};



