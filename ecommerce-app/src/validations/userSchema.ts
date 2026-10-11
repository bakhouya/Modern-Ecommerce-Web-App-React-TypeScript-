


import { z } from 'zod';


/* ================================================================================== */
/* ================================================================================== */
export const UserSchema = z.object({
  username: z.string()
    .min(3, "اسم المستخدم يجب أن يكون على الأقل 3 أحرف")
    .max(50, "اسم المستخدم طويل جداً")
    .regex(/^[a-zA-Z0-9_]+$/, "اسم المستخدم يحتوي فقط على أحرف وأرقام و _"),

  email: z.string()
    .optional()
    .refine(val => val === undefined || val === '' || z.string().email().safeParse(val).success, {
      message: "البريد الإلكتروني غير صحيح"
    }),

  password: z.string()
    .optional()
    .refine(val => !val || val.length >= 8, {
      message: "كلمة المرور يجب أن تكون على الأقل 8 أحرف"
    }),

  full_name: z.string().min(1, "الاسم الكامل مطلوب").max(100, "الاسم الكامل طويل جداً"),
  phone: z.string().min(1, "رقم الهاتف مطلوب").regex(/^[0-9]{10,15}$/, "رقم الهاتف يجب أن يكون بين 10 و 15 رقماً"),
  is_superuser: z.boolean().default(false),
  is_staff: z.boolean().default(false),
  is_active: z.boolean().default(true),
  address: z.string().min(1, "العنوان مطلوب").max(200, "العنوان طويل جداً"),

  city: z.string().optional(), // اختيارية لأنك كتضيفها يدوياً
  avatar: z.string().nullable().optional(),
  branches: z.array(z.string()).optional(), // اختيارية
  can_view_all_branches: z.boolean().default(false),
  groups: z.array(z.number().int()).optional(), // اختيارية
});
/* ================================================================================== */


/* ================================================================================== */
/* ================================================================================== */
export type UserFormType = z.infer<typeof UserSchema>;
/* ================================================================================== */


