
import { useState } from 'react';

interface UseFieldSelectProps<T = any> {initialValue?: T; validationSchema?: any;}

export function useFieldSelect<T = any>({ initialValue, validationSchema }: UseFieldSelectProps<T> = {}) {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [error, setError] = useState<string | undefined>();

  const handleChange = (newValue: T) => {setValue(newValue); if (error) setError(undefined);};

  const validate = () => {
    if (validationSchema) {
      try {
        validationSchema.parse(value);
        setError(undefined);
        return true;
      } catch (e: any) {
        setError(e.errors?.[0]?.message || 'Invalid value');
        return false;
      }
    }
    return true;
  };

  return {value, setValue, error, handleChange, validate, setError};
}





