
import { SelectCard } from './SelectCard';

export interface SelectCardItem {
    id: string;
    icon: string;
    title: string;
    description: string;
    value: string; 
}

interface SelectCardsGroupProps {
    items: SelectCardItem[];
    selectedValue: string; 
    onSelect: (value: string) => void; 
    columns?: 2 | 3 | 4;
    className?: string;
}

export const SelectCardsGroup = ({ items, selectedValue, onSelect, columns = 2, className = ''}: SelectCardsGroupProps) => {
    const colClass = `col_${columns}`;
    return (
        <div className="box_select">
            <div className={`select_cards row ${className}`}>
                {items.map((item) => (
                <SelectCard
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    isActive={selectedValue === item.value}
                    onClick={() => onSelect(item.value)}
                    className={colClass}
                />
                ))}
            </div>
        </div>
    );
};

