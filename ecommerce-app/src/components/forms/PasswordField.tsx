


import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

export default function PasswordField({ label, value, onChange, error}: PasswordFieldProps) {
    const [type, setType] = useState<"password" | "text">("password");
    const changeType = () => {
        setType((prev) => prev === "password" ? "text" : "password");
    };

    return (
        <div className="input_group">
            <div className="text text_lg my_end_6">{label}</div>
            <input type={type} 
                    className="input_text" 
                    placeholder={label} 
                    value={value} 
                    onChange={onChange} />

            <button type="button" className="btn_icon sm default flex_center_center toggle_type_password" onClick={changeType}>
                {type === "password" 
                    ? (<Eye size={18} />) 
                    : (<EyeOff size={18} />)
                }
            </button>

            {error && <p className="text text_sm text_danger my_start_5 mx_start_3">{error}</p>}
          </div>
    )
}






























