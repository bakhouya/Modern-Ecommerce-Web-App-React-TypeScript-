

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface AccordionSelectItem<T = string> {
  id: T;
  label: string;
}

interface AccordionSelectProps<T> {
  title: string;
  items: AccordionSelectItem<T>[];
  selectedIds: T[];
  onChange: (selected: T[]) => void;
  multi?: boolean;          // false => اختيار مفرد (radio)
  isLoading?: boolean;
  showCount?: boolean;
}

export function AccordionSelect<T extends string | number>({
  title,
  items,
  selectedIds,
  onChange,
  multi = true,
  isLoading = false,
  showCount = true,
}: AccordionSelectProps<T>) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // تبديل عنصر
  const toggleItem = (id: T) => {
    if (!multi) {
      // اختيار مفرد: نختار العنصر فقط أو نلغي الاختيار
      if (selectedIds.includes(id)) {
        onChange([]);
      } else {
        onChange([id]);
      }
      // يمكن إغلاق الـ accordion بعد الاختيار في الوضع المفرد (اختياري)
      // setIsOpen(false);
      return;
    }

    // اختيار متعدد
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((sid) => sid !== id)
      : [...selectedIds, id];
    onChange(newSelected);
  };

  // تحديد/إلغاء الكل (فقط للـ multi)
  const toggleAll = () => {
    if (!multi) return;
    if (selectedIds.length === items.length) {
      onChange([]);
    } else {
      onChange(items.map((item) => item.id));
    }
  };

  const allSelected = multi && items.length > 0 && selectedIds.length === items.length;
  const someSelected = multi && selectedIds.length > 0 && selectedIds.length < items.length;

  return (
    <div className="my_start_12">
      <div className="accordion-filter">
        <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
          <span className="text text_md">
            {title}
            {showCount && selectedIds.length > 0 && (
              <span className="text text_md"> ({selectedIds.length})</span>
            )}
          </span>
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
                {/* خيار "تحديد الكل" للمتعدد فقط */}
                {multi && (
                  <label htmlFor="select-all" className="accordion_item select-all flex_between_center">
                    <span className="text text_md">{t('common.all')}</span>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => { if (el) el.indeterminate = someSelected; }}
                      onChange={toggleAll}
                      id="select-all"
                      className="icon-checkbox"
                    />
                  </label>
                )}
                {/* قائمة العناصر */}
                {items.map((item) => (
                  <label htmlFor={String(item.id)} key={String(item.id)} className="accordion_item flex_between_center">
                    <span className="text text_md">{item.label}</span>
                    <input
                      type={multi ? "checkbox" : "radio"}
                      name={`accordion-${title}`}
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      id={String(item.id)}
                      className={multi ? "icon-checkbox" : "icon-radio"}
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
}