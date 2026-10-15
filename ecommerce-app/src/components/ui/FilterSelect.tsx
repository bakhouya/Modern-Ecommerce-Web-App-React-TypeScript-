

import { useTranslation } from 'react-i18next';
import Select,  {type SingleValue } from 'react-select';

export interface FilterOption<T> {
  value: T;
  label: string;
}

interface FilterSelectProps<T> {
  label?: string;
  options: FilterOption<T>[];
  value: T | null | undefined;
  onChange: (value: T | null) => void;
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  className?: string;
  classNamePrefix?: string;
  isLoading?: boolean;
}

export function FilterSelect<T>({
  label,
  options,
  value,
  onChange,
  placeholder,
  isClearable = false,
  isDisabled = false,
  className = 'react-select-container',
  classNamePrefix = 'react-select',
  isLoading = false,
}: FilterSelectProps<T>) {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder || t('common.selectOption');

  const selectedOption = options.find(opt => opt.value === value) || null;

  const handleChange = (newValue: SingleValue<FilterOption<T>>) => {
    onChange(newValue ? newValue.value : null);
  };

  return (
    <div className="filter-select-wrapper">
      {label && <div className="text text_lg my_end_6">{label}</div>}
      <Select
        className={className}
        classNamePrefix={classNamePrefix}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={defaultPlaceholder}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
      />
    </div>
  );
}

