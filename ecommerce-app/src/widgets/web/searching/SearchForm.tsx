
import { X } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
}

export default function SearchForm({ value, onChange, onSubmit}: Props) {
  return (
    <form className="search-form" role="search" onSubmit={(e) => {e.preventDefault();  onSubmit(value);}}>
      <div className="search-form__field">
        <svg className="search-form__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M21 21l-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z" />
        </svg>

        <input
          className="search-form__input"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search products, brands, categories..."
          aria-label="Search"
          autoFocus/>

        {value && ( <button type="button" className="search-form__clear" onClick={() => onChange("")} aria-label="Clear"><X size={18}/></button>)}
      </div>

    </form>
  );
}