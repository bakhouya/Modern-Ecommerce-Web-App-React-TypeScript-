



import { z } from 'zod';

export const ServiceSchema = z.object({
    title: z.string().min(1, "Le nom est requis").max(100, "Trop long"),
    description: z.string().refine(val => val.replace(/<[^>]*>/g, '').trim().length > 0, {
        message: "La description ne peut pas être vide",
    }),
    image: z.string().default(''),
    status: z.boolean().default(true),
});

export type ServiceFormType = z.infer<typeof ServiceSchema>;




