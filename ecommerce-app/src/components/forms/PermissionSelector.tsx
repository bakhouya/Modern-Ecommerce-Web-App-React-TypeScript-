// components/forms/PermissionSelector.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { PermissionGroupTypes } from '../../types/RolesTypes';

interface PermissionSelectorProps {
    groups: PermissionGroupTypes[];
    selectedIds: number[];
    onChange: (selectedIds: number[]) => void;
}

export const PermissionSelector: React.FC<PermissionSelectorProps> = ({
  groups,
  selectedIds,
  onChange,
}) => {
  const { t } = useTranslation();

  // حالة فتح/غلق كل مجموعة (مفتاح = عنوان المجموعة)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(groups.map(g => [g.title, false]))
  );

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // تبديل صلاحية فردية
  const togglePermission = (permId: number) => {
    const newSelected = selectedIds.includes(permId)
      ? selectedIds.filter(id => id !== permId)
      : [...selectedIds, permId];
    onChange(newSelected);
  };

  // تحديد/إلغاء تحديد كل صلاحيات مجموعة معينة
  const toggleGroupPermissions = (group: PermissionGroupTypes, selectAll: boolean) => {
    const permIds = group.permissions.map(p => p.id);
    const newSelected = selectAll
      ? [...selectedIds, ...permIds.filter(id => !selectedIds.includes(id))]
      : selectedIds.filter(id => !permIds.includes(id));
    onChange(newSelected);
  };

  // معرفة إذا كانت كل صلاحيات المجموعة محددة
  const isGroupFullySelected = (group: PermissionGroupTypes) => {
    const permIds = group.permissions.map(p => p.id);
    return permIds.every(id => selectedIds.includes(id));
  };

  // معرفة إذا كانت بعض صلاحيات المجموعة محددة (لحالة indeterminate)
  const isGroupPartiallySelected = (group: PermissionGroupTypes) => {
    const permIds = group.permissions.map(p => p.id);
    const selectedInGroup = permIds.filter(id => selectedIds.includes(id));
    return selectedInGroup.length > 0 && selectedInGroup.length < permIds.length;
  };

  return (
    <div className="permission-selector">
      {groups.map((group) => {
        const isOpen = openGroups[group.title] ?? false;
        const fullySelected = isGroupFullySelected(group);
        const partiallySelected = isGroupPartiallySelected(group);

        return (
          <div key={group.title} className="accordion-filter my_start_12">
            {/* رأس الـ Accordion */}
            <div className="accordion-header" onClick={() => toggleGroup(group.title)}>
              <span className="text text_md">
                {group.title}
                {selectedIds.filter(id => group.permissions.some(p => p.id === id)).length > 0 && (
                  <span className="text text_md" style={{ marginLeft: '8px' }}>
                    ({selectedIds.filter(id => group.permissions.some(p => p.id === id)).length})
                  </span>
                )}
              </span>
              <span className={`accordion-chevron ${isOpen ? 'open' : ''}`}>
                <svg width="18" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>

            {/* محتوى الـ Accordion */}
            {isOpen && (
              <div className="accordion-body">
                {/* خيار "تحديد الكل" للمجموعة */}
                <label className="accordion_item flex_between_center select-all">
                  <span className="text text_md">{t('common.all')}</span>
                  <input
                    type="checkbox"
                    checked={fullySelected}
                    ref={(el) => {
                      if (el) el.indeterminate = partiallySelected;
                    }}
                    onChange={(e) => toggleGroupPermissions(group, e.target.checked)}
                    className="icon-checkbox"
                  />
                </label>

                {/* قائمة الصلاحيات */}
                {group.permissions.map((perm) => (
                  <label key={perm.id} className="accordion_item flex_between_center">
                    <span className="text text_md">{perm.codename}</span>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(perm.id)}
                      onChange={() => togglePermission(perm.id)}
                      className="icon-checkbox"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};