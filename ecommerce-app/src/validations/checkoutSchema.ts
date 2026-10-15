
import { z } from "zod";

export const CheckoutTextSchema  = z.object({
  name: z.string().trim().min(2, "Le prénom doit contenir au moins 2 caractères."),
  // last_name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères."),
  phone: z.string().trim().min(9, "Numéro de téléphone invalide.").regex(/^(?:\+212|0)([5-7])\d{8}$/,"Numéro de téléphone invalide."),
  address: z.string().trim().min(5, "L'adresse doit contenir au moins 5 caractères."),
  note: z.string().trim().max(500, "La note ne peut pas dépasser 500 caractères.").optional(),
});
export const CheckoutSchema = CheckoutTextSchema.extend({
  visitor: z.string().min(1, "Visitor obligatoire."),
  city: z.string().min(1, "Veuillez sélectionner une ville."),
});
export type CheckoutFormType = z.infer<typeof CheckoutSchema>;
