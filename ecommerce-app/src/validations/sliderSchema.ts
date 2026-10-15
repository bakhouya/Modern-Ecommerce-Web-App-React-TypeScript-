


import { z } from 'zod';

/* ================================================================================== */
/* ================================================================================== */
export const SliderSchema = z.object({
    title   : z.string().min(1, "Le nom est requis").max(100, "Trop long"),
    slug    : z.string().optional(),

    description: z.string().refine(val => val.replace(/<[^>]*>/g, '').trim().length > 0, {
        message: "La description ne peut pas être vide",
    }),

    status  : z.boolean().default(true),
    image   : z.string().default(''),
    position: z.coerce.number().default(0).optional(),
    url     : z.string().min(1, "Le nom est requis"),
});
/* ================================================================================== */



/* ================================================================================== */
/* ================================================================================== */
export type SliderFormType = z.infer<typeof SliderSchema>;
/* ================================================================================== */



