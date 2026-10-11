
// import React, { useState, useId } from 'react';
// import { useTranslation } from 'react-i18next';

// export interface AccordionFilterItem { id: string | boolean ; label?: string;}

// export interface AccordionRadioFilterProps {
//     title       : string;
//     items       : AccordionFilterItem[];
//     selectedId  : string | boolean | null; 
//     onChange    : (id: string | boolean | null) => void;
//     isLoading?  : boolean;
//     open?       : boolean;
// }

// export const AccordionRadioFilter: React.FC<AccordionRadioFilterProps> = ({title, items, selectedId, onChange, isLoading = false, open = false}) => {
//     const { t } = useTranslation();
//     const [isOpen, setIsOpen] = useState(open);
//     const uniqueId = useId();

//     const getDisplayLabel = (item: AccordionFilterItem): string => {
//         if (item.label) return item.label;
//         return String(item.id);
//     };


//     return (
//         <div className="my_start_12">
//             {/* <div className="text text_lg my_end_5">{title}</div> */}
//             <div className="accordion-filter">
//                 <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
//                 <span className="text text_md">{title}</span>
//                 <span className={`accordion-chevron ${isOpen ? 'open' : ''}`}>
//                     <svg width="18" height="16" viewBox="0 0 16 16" fill="none">
//                     <path
//                         d="M4 6L8 10L12 6"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     />
//                     </svg>
//                 </span>
//                 </div>

//                 {isOpen && (
//                 <div className="accordion-body">
//                     {isLoading ? (
//                     <div className="text_sm text_secondary">{t('common.loading')}</div>
//                     ) : items.length === 0 ? (
//                     <div className="text_sm text_secondary">{t('common.noData')}</div>
//                     ) : (
//                     <>
//                         <label className="accordion_item flex_between_center">
//                             <span className="text text_md">{t('common.all')}</span>
//                             <input
//                                 type="radio"
//                                 name={`radio-group-${uniqueId}`}
//                                 checked={selectedId === null}
//                                 onChange={() => onChange(null)}
//                                 className="icon-radio"
//                             />
//                         </label>

//                         {items.map((item) => {
//                             const displayText = getDisplayLabel(item);
//                             const key = String(item.id);
//                             return (
//                                 <label key={key} className="accordion_item flex_between_center">
//                                     <span className="text text_md">{displayText}</span>
//                                     <input
//                                         type="radio"
//                                         name={`radio-group-${uniqueId}`}
//                                         checked={selectedId === item.id} 
//                                         onChange={() => onChange(item.id)}
//                                         className="icon-radio"
//                                     />
//                                 </label>
//                             );
//                         })}
//                     </>
//                     )}
//                 </div>
//                 )}
//             </div>
//         </div>
//     );

// };




import { MenuSquare } from 'lucide-react';
import React, { useState, useId } from 'react';
import { useTranslation } from 'react-i18next';

export interface AccordionFilterItem<T = string | number | boolean> {
    id: T;
    label?: string;
}

interface AccordionRadioFilterProps<T> {
    title: string;
    items: AccordionFilterItem<T>[];
    selectedId: T | null; // القيمة المختارة أو null للكل
    onChange: (id: T | null) => void;
    isLoading?: boolean;
    open?: boolean;
}

export function AccordionRadioFilter<T extends string | number | boolean>({
    title,
    items,
    selectedId,
    onChange,
    isLoading = false,
    open = false,
}: AccordionRadioFilterProps<T>) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(open);
    const uniqueId = useId();

    const getDisplayLabel = (item: AccordionFilterItem<T>): string => {
        return item.label ?? String(item.id);
    };

    return (
        <div className="my_start_12">
            <div className="accordion-filter">
                <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
                    <div className="flex_start_center gap_12">
                        <MenuSquare size={17}/>
                        <span className="text text_md">{title}</span>
                    </div>
                    <span className={`accordion-chevron ${isOpen ? 'open' : ''}`}>
                        <svg width="18" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M4 6L8 10L12 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
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
                                {/* خيار "الكل" */}
                                <label className="accordion_item flex_between_center">
                                    <span className="text text_md">{t('common.all')}</span>
                                    <input
                                        type="radio"
                                        name={`radio-group-${uniqueId}`}
                                        checked={selectedId === null}
                                        onChange={() => onChange(null)}
                                        className="icon-radio"
                                    />
                                </label>

                                {/* قائمة العناصر */}
                                {items.map((item) => {
                                    const displayText = getDisplayLabel(item);
                                    const key = String(item.id);
                                    return (
                                        <label key={key} className="accordion_item flex_between_center">
                                            <span className="text text_md">{displayText}</span>
                                            <input
                                                type="radio"
                                                name={`radio-group-${uniqueId}`}
                                                checked={selectedId === item.id}
                                                onChange={() => onChange(item.id)}
                                                className="icon-radio"
                                            />
                                        </label>
                                    );
                                })}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

