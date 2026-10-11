

import React from 'react';
import { useTranslation } from 'react-i18next';
import { SaveIcon, RefreshCcwDot } from 'lucide-react';

interface SubmitButtonProps {
  isPending: boolean;          
  type?: 'create' | 'update';  
  label?: string;              
  icon?: React.ReactNode;      
  className?: string;         
  children?: React.ReactNode;  
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isPending, type = 'create', label, icon, className = '', children}) => {
    const { t } = useTranslation();
    const defaultLabel = type === 'update' ? t('common.update') : t('common.save');
    const defaultIcon = type === 'update' ? <RefreshCcwDot size={18} /> : <SaveIcon size={18} />;

    if (children) {
      return (
        <button type="submit" className={`btn primary lg ${className}`} disabled={isPending}>
          {isPending ? <span className="btn_loader"></span> : children}
        </button>
      );
    }

    return (
      <button type="submit" className={`btn primary lg ${className}`} disabled={isPending}>
        {isPending ? (
          <span className="btn_loader"></span>
        ) : (
          <>
            {icon || defaultIcon}
            <span className="text text_md">{label || defaultLabel}</span>
          </>
        )}
      </button>
    );
  
};

