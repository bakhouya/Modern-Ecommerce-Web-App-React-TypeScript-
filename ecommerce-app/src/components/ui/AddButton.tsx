import { PlusIcon } from "lucide-react";


interface AddButtonProps {
    onClick: () => void; 
    label?: string; 
    className?: string; size?: 'sm' | 'md' | 'lg';
}


export const AddButton: React.FC<AddButtonProps> = ({ onClick, label, className = '', size = 'lg' }) => {
    const buttonClasses = `btn ${size} primary full_width ${className}`;
 
    return (
        <div className="box_add my_start_15">
            <button className={buttonClasses} onClick={onClick} type="button" aria-label="Add New Button">
                <PlusIcon size={20} className="text text_md"/>
                <div className="text text_md">{label}</div>
            </button>
        </div>       
    );
};


