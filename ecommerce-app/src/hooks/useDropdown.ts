

import { useState, useRef, useEffect } from 'react';

export function useDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    // const dropdownRef = useRef(null);
    const triggerRef = useRef(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggle = () => setIsOpen(prev => !prev);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    return {isOpen, toggle, open, close, dropdownRef, triggerRef};
}

