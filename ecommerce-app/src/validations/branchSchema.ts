



import { z } from 'zod';

/* ------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */
export const BranchSchema = z.object({

    title: z.string()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
        .max(150, "Le nom complet doit contenir au moins 3 caractères")
        .nonempty("Le nom d'utilisateur est obligatoire"),

    address: z.string().max(500, "Le nom complet doit contenir au moins 3 caractères").default(""),

    phone: z.string()
        .regex(/^(00212|\+212|0)?[6-7][0-9]{8}$/, "Numéro de téléphone marocain invalide (ex: 0612345678 ou +212612345678)")
        .min(10, "Le nom complet doit contenir au moins 3 caractères")
        .max(20, "Le nom complet doit contenir au moins 3 caractères")
        .nonempty("Le numéro de téléphone est obligatoire"),

    cities: z.array(z.string()).default([]),
   
    status: z.boolean().default(false),

});
/* ------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */
// 
/* ------------------------------------------------------------------------------- */
export type BranchFormType = z.infer<typeof BranchSchema>;
/* ------------------------------------------------------------------------------- */








