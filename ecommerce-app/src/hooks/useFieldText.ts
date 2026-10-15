

import { useState } from "react";
import type { ZodSchema } from "zod";
import { validators } from "../helpers/validators";

export function useFieldText(schema: ZodSchema, initialValues: any) {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setValues((prev: any) => ({...prev, [field]: value}));
        setErrors((prev) => ({...prev, [field]: ""}));
    };

    const validate = () => {
        const result = validators(schema, values);
        setErrors(result.errors);
        return result.success;
    };
    return {values, errors, setValues, setErrors, handleChange, validate};

}