import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";

export interface SelectOption {
    value: string;
    label: string;
}

interface SearchableSelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchableSelect = ({options, value, onChange, placeholder = "Sélectionner..."}: SearchableSelectProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find((option) => option.value === value);

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearch("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside);};
    }, []);


    useEffect(() => {
        if (isOpen) {setTimeout(() => {searchInputRef.current?.focus();}, 50);}
    }, [isOpen]);

    const handleSelect = (option: SelectOption) => {
        onChange(option.value);
        setIsOpen(false);
        setSearch("");
    };

    const handleClear = (event: React.MouseEvent) => {
        event.stopPropagation();
        onChange("");
        setSearch("");
    };

    return (
        <div ref={containerRef} className={`searchable-select ${isOpen ? "is-open" : ""}`}>
            {/* Trigger */}
            <button type="button" className="searchable-select__trigger" onClick={() => setIsOpen((prev) => !prev)}>
                <span className={selectedOption ? "text text_sm" : "text text_sm"}>
                    {selectedOption?.label || placeholder}
                </span>

                <span className="searchable-select__actions">
                    {selectedOption && (<X size={18} className="searchable-select__clear" onClick={handleClear}/> )}
                    <ChevronDown size={25} className="searchable-select__arrow"/>
                </span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="searchable-select__dropdown">

                    {/* Search */}
                    <div className="searchable-select__search">
                        <Search size={20} />
                        <input ref={searchInputRef} type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..."/>
                        {search && (<X size={20} onClick={() => setSearch("")}/>)}
                    </div>

                    {/* Options */}
                    <div className="searchable-select__options">

                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => {

                                const isSelected = option.value === value;

                                return (
                                    <button type="button" key={option.value} 
                                        className={`searchable-select__option ${isSelected ? "is-selected" : ""}`}
                                        onClick={() => handleSelect(option)}>
                                            
                                        <span className="text text_sm">{option.label}</span>
                                        {isSelected && (<Check size={20} />)}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="searchable-select__empty">
                                Aucun résultat
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;