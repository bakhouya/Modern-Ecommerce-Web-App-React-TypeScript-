
interface InputTextProps {
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

export default function InputText({ type, label, value, onChange, error}: InputTextProps) {


    return (
        <div className="input_group">
            <div className="text text_md my_end_6">{label}</div>
            <input type={type} className="input_text" 
                    placeholder={label} value={value} 
                    onChange={onChange} />
            
            {error && <p className="text text_sm text_danger my_start_5 mx_start_3">{error}</p>}
          </div>
    )
}












