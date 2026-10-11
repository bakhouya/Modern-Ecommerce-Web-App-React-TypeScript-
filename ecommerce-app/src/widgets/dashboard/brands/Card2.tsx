
import type { BrandTypes } from '../../../types/brandTypes';
import { BaseCard } from '../../../components/boxs/BaseCard';

interface Props {
  item: BrandTypes;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (brand: BrandTypes) => void;
  onDelete: (id: string) => void;
}

export const BrandCard = ({ item, isSelected, onToggleSelect, onEdit, onDelete}: Props) => {
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


            {item?.category_details?.length > 0 && (
                <div className="base-card__categories">
                    {item.category_details.map((cat) => (
                    <span key={cat.id} className="flex_start_center gap_6 base-card__tag">
                        <img src={cat?.image} alt="" className="avatars xs"/>
                        <div className="text text_sm"> {cat.title} </div>
                    </span>
                    ))}
                </div>
            )}

        </BaseCard>
    );
};

