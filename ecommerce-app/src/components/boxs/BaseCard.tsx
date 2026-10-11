import { Edit2, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { RelativeDate } from '../ui/Date';

interface BaseCardProps {
    id: string;
    title: string;
    image?: string | null;
    status: boolean;
    created_at: string;
    description?: string;
    isSelected: boolean;


    onToggleSelect: (id: string) => void;
    onEdit: () => void;
    onDelete: () => void;

    children?: ReactNode;

    className?: string;
}

export const BaseCard = ({ id, title, image, status, created_at, description, isSelected, onToggleSelect, onEdit, onDelete, children, className = ''}: BaseCardProps) => {
  const { t } = useTranslation();

  return (
    <div className={`base-card ${isSelected ? 'base-card--selected' : ''} ${className}`}>

      <div className="base-card__media">
        {image ? (
          <img src={image} alt={title} className="base-card__image" />
        ) : (
          <div className="base-card__placeholder">
            <span>{title?.charAt(0) || 'B'}</span>
          </div>
        )}
      </div>

      <div className="base-card__content">
        <div className="__header">
          <div className="text text_lg"> {title} </div>
          <div className="flex_start_center gap_10">
            <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(id)} className="icon-checkbox"/>
            <div className="slash"></div>
            <span className={`text text_xs ${status ? 'item_active' : 'item_inactive'}`}>
              {status ? t('common.active') : t('common.inactive')}
            </span>
          </div>
        </div>

        <RelativeDate date={created_at} />

        {description && <p className="text text_sm p_limit_2  my_start_8">{description}</p>}


        {children && <div>{children}</div>}


        <div className="__actions">
            <button className="btn_icon border base sm" onClick={onEdit}>
                <Edit2 size={15} className='text text_md'/>
            </button>
            <button className="btn_icon border bg_base sm " onClick={onDelete}>
                <TrashIcon size={18} className='text text_danger'/>
            </button>
        </div>
      </div>
    </div>
  );
};