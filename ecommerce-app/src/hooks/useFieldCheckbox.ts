

import { useState, useCallback } from 'react';
import type { ZodSchema } from 'zod';
import { validators } from '../helpers/validators'; 

interface UseFieldCheckboxProps {
    schema: ZodSchema;   
    initialValue?: boolean;
    fieldName?: string;   
}

export const useFieldCheckbox = ({
    schema,
    initialValue = false,
    fieldName = 'checkbox',
}: UseFieldCheckboxProps) => {
    const [value, setValue] = useState<boolean>(initialValue);
    const [error, setError] = useState<string>('');

    const handleChange = (newValue: boolean) => {
        setValue(newValue);
        setError('');
    };

    const validate = useCallback((): boolean => {
        const result = validators(schema, value);
        if (!result.success) {
            setError(result.errors[fieldName] || 'Valeur invalide');
            return false;
        }
        setError('');
        return true;
    }, [schema, value, fieldName]);

    return {
        value,
        error,
        onChange: handleChange,
        setValue,
        setError,
        validate,
    };
};