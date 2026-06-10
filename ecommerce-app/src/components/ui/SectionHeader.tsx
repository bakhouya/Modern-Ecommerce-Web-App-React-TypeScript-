

interface SectionHeaderProps {title: string; description?: string ; className?: string ;}
export const SectionHeader = ({title, description, className = ""}: SectionHeaderProps) => {

    return (
        <div className={className}>
            <div className="text text_xl weight_500">{title}</div>
            {description && (<p className="text text_sm">{description}</p>)}
        </div>
    );

};





