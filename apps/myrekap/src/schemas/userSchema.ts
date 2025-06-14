import { z } from "zod";

export const inputUserSchema = z.object({
    username: z.string().nonempty("Username wajib diisi"),
    email: z.string().email("Format email tidak valid"),
    pin: z.string().length(6, "PIN Harus 6 Angka"),
    confPin: z.string().length(6, "PIN Harus 6 Angka"),
});

export type InputUserType = z.infer<typeof inputUserSchema>;
export type InputUserKey = keyof InputUserType;
