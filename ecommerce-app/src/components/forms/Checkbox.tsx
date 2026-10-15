

import React from 'react';
// import {getInitials} from "../../helpers/utils"
interface CheckboxProps {
    label?: string;
    desc?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, desc, checked, onChange, error, disabled = false, className = ''}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {onChange(e.target.checked);};

    return (
        <label className={`switch-container ${className}`} htmlFor={`checkbox-${label}`}>
            <div className="flex_between_center">
                <div className="flex_start_center gap_15">
                    {/* <div className="avatars md radius_8 bg_2_primary"> 
                        <div className="text text_lg weight_700">
                            {getInitials(label)}
                        </div>
                    </div> */}
                    <div className="flex-1">
                        {label && <div className="text text_lg">{label}</div>}
                        <div className="text_sm text-gray-500 p_limit_1"> {desc} </div>
                    </div>
                </div>

                <label className="switch" htmlFor={`checkbox-${label}`}>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleChange}
                        disabled={disabled}
                        id={`checkbox-${label}`}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
            {error && <p className="text text_sm text_danger my_start_8">{error}</p>}
        </label>
    );
};



