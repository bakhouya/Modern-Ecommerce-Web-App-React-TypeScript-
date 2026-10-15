

import { EditIcon, TrashIcon } from 'lucide-react';
import type { CityTypes } from '../../../types/cityTypes';
import { useTranslation } from 'react-i18next';

interface Props {
  city: CityTypes;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onEdit: (city: CityTypes) => void;
  onDelete: (id: string) => void;
}

export const CityCard = ({ city, isSelected, onToggleSelect, onEdit, onDelete }: Props) => {
    const { t } = useTranslation();
    return (

        <div className={`card_flex flex_between_center ${isSelected ? 'selected' : ''}`}>

            <div className="flex_between_center gap_15">
                <div className="flex_start_center gap_15">
                    <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(city.id)} className="icon-checkbox"/>
                    <div className="slash"></div>
                    <div className="text text_md">{city.title}</div>
                </div>
                <span className={`text text_sm  ${city.status ? 'item_active': 'item_inactive'}`}>
                    {city.status ? t('common.active') : t('common.inactive')}
                </span>
            </div>
            
            <div className="flex_end_center gap_12">
                <div className="slash"></div>
                <button onClick={() => onEdit(city)} className="btn_icon sm" type="button">
                    <EditIcon size={12}/>
                </button>
                <button onClick={() => onDelete(city.id)} className="btn_icon sm" type="button">
                    <TrashIcon size={12} />
                </button>
            </div>

        </div>

    )
};



