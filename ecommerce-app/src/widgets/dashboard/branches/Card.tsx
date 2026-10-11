

import type { BranchTypes } from '../../../types/branchTypes';
import { BaseCard } from '../../../components/boxs/BaseCard';

interface Props {
  item          : BranchTypes;
  isSelected    : boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (city: BranchTypes) => void;
  onDelete: (id: string) => void;
}

export const BranchCard = ({ item, isSelected, onToggleSelect, onEdit, onDelete }: Props) => {

    return (

        <BaseCard
            id={item.id}
            title={item.title}
            // image={item.image}
            status={item.status}
            created_at={item.created_at}
            description={item.address + "  |  " + item.phone}
            isSelected={isSelected}
            onToggleSelect={onToggleSelect}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}>


            {item?.branch_cities?.length > 0 && (
                <div className="base-card__categories">
                    {item.branch_cities.map((cat) => (
                    <span key={cat.id} className="flex_start_center gap_6 base-card__tag">
                        <div className="text text_xs"> {cat.title} </div>
                    </span>
                    ))}
                </div>
            )}

        </BaseCard>

    )
};



