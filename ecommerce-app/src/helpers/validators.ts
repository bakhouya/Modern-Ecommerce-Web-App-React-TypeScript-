



import type { ZodSchema } from "zod";
export function validators(schema: ZodSchema, data: any) {

    const result = schema.safeParse(data);
    if (result.success) {return {success: true, errors: {}};}
    const errors: Record<string, string> = {};

    result.error.issues.forEach((err) => {
        const path = err.path[0] as string;
        errors[path] = err.message;
    });

    return {success: false, errors};
}

