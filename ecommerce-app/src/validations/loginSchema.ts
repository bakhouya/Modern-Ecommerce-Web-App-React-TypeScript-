
// ==================================================
// ==================================================
import { z } from "zod";
export const loginSchema = z.object({

    username: z
        .string()
        .min(3, "Minimum 3 caractères")
        .nonempty("Username obligatoire"),

    password: z
        .string()
        .min(6, "Minimum 6 caractères")
        .nonempty("Password obligatoire"),
});
// ==================================================

