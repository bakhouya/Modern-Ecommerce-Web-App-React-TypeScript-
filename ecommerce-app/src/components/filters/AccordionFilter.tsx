import { MenuSquare } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface AccordionFilterItem { id: string ; label?: string ;}

interface AccordionFilterProps {
    title: string;                       
    items: AccordionFilterItem[];        
    selectedIds: string[];               
    onChange: (selectedIds: string[]) => void; 
    isLoading?: boolean;
    showCount?: boolean;                 
}

export const AccordionFilter: React.FC<AccordionFilterProps> = ({ title, items, selectedIds, onChange, isLoading = false, showCount = true}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false); 

    // Bascule la sélection d'un item
    const toggleItem = (id: string) => {
        const newSelected = selectedIds.includes(id)
            ? selectedIds.filter((sid) => sid !== id)
            : [...selectedIds, id];
        onChange(newSelected);
    };

    // Sélectionner / désélectionner tout
    const toggleAll = () => {
        if (selectedIds.length === items.length) {
            onChange([]);
        } else {
            onChange(items.map((item) => item.id));
        }
    };

    const allSelected = items.length > 0 && selectedIds.length === items.length;
    const someSelected = selectedIds.length > 0 && selectedIds.length < items.length;

    return (
        <div className='my_start_12'>
            {/* <div className="text text_lg my_end_5"> {title} </div> */}
            <div className="accordion-filter">


                <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
                    <div className="flex_start_center gap_12">
                        <MenuSquare size={17}/>
                        <span className="text text_md">
                            {title}
                            {showCount && selectedIds.length > 0 && (<span className="text text_md">({selectedIds.length})</span>)}
                        </span>
                    </div>
                   
                    <span className={`accordion-chevron ${isOpen ? 'open' : ''}`}>
                        <svg width="18" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                </div>

                {isOpen && (
                    <div className="accordion-body">
                        {isLoading ? (
                            <div className="text_sm text_secondary">{t('common.loading')}</div>
                        ) : items.length === 0 ? (
                            <div className="text_sm text_secondary">{t('common.noData')}</div>
                        ) : (
                            <>
                                {/* Option "Tout sélectionner" */}
                                <label htmlFor={t('common.all')} className="accordion_item select-all flex_between_center">
                                    <span className='text text_md'>{t('common.all')}</span>
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        ref={(el) => {if (el) el.indeterminate = someSelected;}}
                                        onChange={toggleAll}
                                        id={t('common.selectAll')}
                                        className="icon-checkbox"
                                    />
                                </label>
                                {/* Liste des items */}
                                {items.map((item) => (
                                    <label htmlFor={item.id} key={item.id} className="accordion_item flex_between_center">
                                        <span className='text text_md'>{item.label}</span>
                                        <input type="checkbox"
                                            checked={selectedIds.includes(item.id)}
                                            onChange={() => toggleItem(item.id)}
                                            id={item.id}
                                            className="icon-checkbox"
                                        />
                                    </label>
                                ))}
                            </>
                        )}
                    </div>
                )}
                
            </div>
        </div>
    );
};