


import { z } from 'zod';

export const citySchema = z.object({
    title: z.string().min(1, "Le nom est requis").max(100, "Trop long"),
    status: z.boolean().default(true),
});

export type CityFormType = z.infer<typeof citySchema>;