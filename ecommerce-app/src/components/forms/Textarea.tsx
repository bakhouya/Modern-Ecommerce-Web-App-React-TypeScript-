

import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({ label, error, className, ...props }: TextareaProps) => {
  return (
    <div className="my_start_12">
        {label && <label className="text text_md">{label}</label>}
        <textarea className={`form-textarea ${error ? 'error' : ''} ${className || ''}`} {...props} placeholder={label} />
        {error && <span className="text text_sm text_danger my_start_8">{error}</span>}
    </div>
  );
};


