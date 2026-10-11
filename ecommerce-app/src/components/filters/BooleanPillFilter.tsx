

import React from 'react';
import { useTranslation } from 'react-i18next';


/* ------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------- */
interface BooleanPillFilterProps {
  title: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
}
/* ------------------------------------------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------- */
export const BooleanPillFilter: React.FC<BooleanPillFilterProps> = ({ title, value, onChange}) => {

    const { t } = useTranslation();

    return (
        <div className="boolean-pill-filter">
            <div className="text text_md my_end_8">{title}</div>
            <div className="boolean-pill-group">
                <button className={`boolean-pill ${value === null ? 'active' : ''}`} onClick={() => onChange(null)}>
                    <div className="text text_sm"> {t('common.all')} </div>   
                </button>
                <button className={`boolean-pill ${value === true ? 'active' : ''}`} onClick={() => onChange(value === true ? null : true)}>
                    <div className="text text_sm"> {t('common.yes')} </div>
                </button>
                <button className={`boolean-pill ${value === false ? 'active' : ''}`} onClick={() => onChange(value === false ? null : false)}>
                    <div className="text text_sm"> {t('common.no')} </div> 
                </button>
            </div>
        </div>
    );

};
/* ------------------------------------------------------------------------------------------------------------- */