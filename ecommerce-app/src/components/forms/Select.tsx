

import ReactSelect from 'react-select';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
}

export default function Select({options, value, onChange, error, multiple = false, placeholder, required = false}: SelectProps) {


  return (
    <div className="input_group">
      <ReactSelect
          className="custom-select"
          classNamePrefix="custom-select"
          isMulti={multiple}
          options={options}
          placeholder={placeholder}
          required={required}
          value={
            multiple
              ? options.filter(o => (value as string[])?.includes(String(o.value)))
              : options.find(o => String(o.value) === value)
          }
          onChange={(selected) => {
            if (multiple) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange((selected as any[])?.map(item => item.value) || []);
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange((selected as any)?.value || '');
            }
          }}
      />
      {error && (<div className="text_danger text_xs my_start_4">{error}</div>)}

    </div>
  );



}




