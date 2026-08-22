import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre."),
  email: z.string().trim().email("Ingresa un correo válido."),
  empresa: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  mensaje: z.string().trim().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)."),
  web: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
