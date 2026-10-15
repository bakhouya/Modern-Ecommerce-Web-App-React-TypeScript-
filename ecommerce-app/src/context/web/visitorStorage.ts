


import type { Visitor } from "../../types/visitorsTypes";

const VISITOR_STORAGE_KEY = "web_visitor";

export const visitorStorage = {
    get: (): Visitor | null => {
        try {
            const stored = localStorage.getItem(VISITOR_STORAGE_KEY);
            if (!stored) {return null;}
            return JSON.parse(stored) as Visitor;
        } catch {
            return null;
        }
    },

    set: (visitor: Visitor): void => {
        localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(visitor));
    },

    remove: (): void => {
        localStorage.removeItem(VISITOR_STORAGE_KEY);
    },
};
