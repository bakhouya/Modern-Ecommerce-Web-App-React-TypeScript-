

import type { ServiceTypes } from '../../../types/serviceTypes';
import { BaseCard } from '../../../components/boxs/BaseCard';

interface Props {
  policy: ServiceTypes;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (city: ServiceTypes) => void;
  onDelete: (id: string) => void;
}

export const ServiceCard = ({ policy, isSelected, onToggleSelect, onEdit, onDelete }: Props) => {

    return (

        <BaseCard
            id={policy.id}
            title={policy.title}
            image={policy.image}
            status={policy.status}
            created_at={policy.created_at}
            description={policy.description}
            isSelected={isSelected}
            onToggleSelect={onToggleSelect}
            onEdit={() => onEdit(policy)}
            onDelete={() => onDelete(policy.id)}>

        </BaseCard>

    )
};



