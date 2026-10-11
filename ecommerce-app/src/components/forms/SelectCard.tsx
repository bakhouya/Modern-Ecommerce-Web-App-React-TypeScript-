

interface SelectCardProps {
    icon: string;
    title: string;
    description: string;
    isActive: boolean;
    onClick: () => void;
    className?: string;
}
export const SelectCard = ({ icon, title, description, isActive, onClick, className = ''}: SelectCardProps) => {

    return (
        <div className={`select_card ${isActive ? 'active' : ''} ${className}`} onClick={onClick}>
        <div className="select_card_image">{icon}</div>
        <div className="text text_lg text_center my_stat_8">{title}</div>
        <div className={`text text_sm text_center my_start_10`}>
            {description}
        </div>
        </div>
    );

};