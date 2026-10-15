


import { forwardRef, type InputHTMLAttributes } from 'react';
import { SearchIcon } from 'lucide-react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string; 
  iconClassName?: string;    
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ wrapperClassName = '', iconClassName = '', className = '', ...props }, ref) => {
    return (
      <div className={`box_input ${wrapperClassName}`}>
        <input
          ref={ref}
          type="search"
          className={`input_search ${className}`}
          {...props}
        />
        <div className={`in_icon text text_sm ${iconClassName}`}>
          <SearchIcon size={16} />
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

