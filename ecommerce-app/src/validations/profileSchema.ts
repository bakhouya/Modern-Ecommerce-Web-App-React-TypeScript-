// ==================================================
// ==================================================
import { z } from "zod";

export const UpdateProfileSchema = z.object({

    username: z.string()
        .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
        .nonempty("Le nom d'utilisateur est obligatoire"),

    full_name: z.string()
        .min(3, "Le nom complet doit contenir au moins 3 caractères")
        .nonempty("Le nom complet est obligatoire"),

    phone: z.string()
        .regex(/^(00212|\+212|0)?[6-7][0-9]{8}$/, "Numéro de téléphone marocain invalide (ex: 0612345678 ou +212612345678)")
        .nonempty("Le numéro de téléphone est obligatoire"),

    email: z.string()
        .email("Adresse email invalide")
        .nonempty("L'email est obligatoire"),

    address: z.string()
        .min(5, "L'adresse doit contenir au moins 5 caractères")
        .nonempty("L'adresse est obligatoire"),

    // city: z.string()
    //     .min(2, "La ville doit contenir au moins 2 caractères")
    //     .nonempty("La ville est obligatoire"),
});





export const ChangePasswordSchema = z.object({

    old_password: z.string()
        .min(8, "L'ancien mot de passe doit contenir au moins 8 caractères")
        .nonempty("L'ancien mot de passe est obligatoire"),

    new_password: z.string()
        .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères")
        .nonempty("Le nouveau mot de passe est obligatoire"),

    confirm_password: z.string()
        .min(8, "La confirmation doit contenir au moins 8 caractères")
        .nonempty("La confirmation du mot de passe est obligatoire"),

}).refine((data) => data.new_password === data.confirm_password, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm_password"],
});

// ==================================================