


import { z } from 'zod';

/* ------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */
export const CouponSchema = z.object({

    code: z.string()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
        .max(150, "Le nom complet doit contenir au moins 3 caractères")
        .nonempty("Le nom d'utilisateur est obligatoire"),

    discount_percentage : z.string()
        .nonempty("Le nom complet est obligatoire"),

    max_uses: z.coerce.number().default(0),

    minimum_cart_total  : z.string().nonempty("Le nom d'utilisateur est obligatoire"),
    start_date          : z.string().nonempty("Le nom d'utilisateur est obligatoire"),
    end_date            : z.string().nonempty("Le nom d'utilisateur est obligatoire"),
    
    status              : z.boolean().default(false),

});
/* ------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */
// 
/* ------------------------------------------------------------------------------- */
export type CouponFormType = z.infer<typeof CouponSchema>;
/* ------------------------------------------------------------------------------- */


