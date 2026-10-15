

import { z } from 'zod';

export const CategorySchema = z.object({
    title: z.string().min(1, "Le nom est requis").max(100, "Trop long"),

    slug: z.string().optional(),

    description: z.string().refine(val => val.replace(/<[^>]*>/g, '').trim().length > 0, {
        message: "La description ne peut pas être vide",
    }),

    status: z.boolean().default(true),

    image: z.string().default(''),
    
    parent: z.string().optional().nullable(),
});

export type CategoryFormType = z.infer<typeof CategorySchema>;