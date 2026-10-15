

import { z } from "zod";

/* ------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */
export const RoleSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom du rôle doit contenir au moins 3 caractères")
    .max(150, "Le nom du rôle ne peut pas dépasser 150 caractères")
    .nonempty("Le nom du rôle est obligatoire"),

  // permissions_ids: z.array(z.number()).min(1, "Veuillez sélectionner au moins une permission").optional(),
  permissions_ids: z.array(z.number()).min(1, "Veuillez sélectionner au moins une permission").optional().default([]),
});
/* ------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------- */

export type RoleFormType = z.infer<typeof RoleSchema>;