import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";


interface AddButtonProps {
    url?: string  ;
    label?: string; 
    className?: string; 
    size?: 'sm' | 'md' | 'lg';
}


export const AddLinkButton: React.FC<AddButtonProps> = ({ label, className = '', size = 'lg', url = "" }) => {
    const buttonClasses = `btn ${size} primary full_width ${className}`;
 
    return (
        <div className="box_add my_start_15">
            <Link to={url} className={buttonClasses} type="button" aria-label="Add New Button">
                <PlusIcon size={20} className="text text_md"/>
                <div className="text tex_md"> {label} </div>
            </Link>
        </div>       
    );
};


