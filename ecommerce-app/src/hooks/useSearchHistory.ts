



import { useState } from "react";
const KEY = "search_history";
const MAX_ITEMS = 8;


const read = (): string[] => {
    try {
        const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
        return Array.isArray(raw) ? raw : [];
    } catch {return [];}
};

export const useSearchHistory = () => {
    const [history, setHistory] = useState<string[]>(read);

    const persist = (list: string[]) => {
        setHistory(list);
        try {localStorage.setItem(KEY, JSON.stringify(list));} catch {return}
    };
    const add = (q: string) => {
        const value = q.trim();
        if (!value) return;
        const rest = history.filter((x) => x.toLowerCase() !== value.toLowerCase());
        persist([value, ...rest].slice(0, MAX_ITEMS));
    };

    const remove = (q: string) => persist(history.filter((x) => x !== q));
    const clear = () => persist([]);

    return { history, add, remove, clear };
};