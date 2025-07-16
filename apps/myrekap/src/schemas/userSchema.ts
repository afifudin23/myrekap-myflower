import { z } from "zod";

export const inputUserSchema = z.object({
    username: z.string().nonempty("Username wajib diisi"),
    email: z.string().email("Format email tidak valid"),
    phoneNumber: z.string().nonempty("Nomor telepon wajib diisi"),
    password: z.string().length(6, "Password Harus 6 Angka"),
    confPassword: z.string().length(6, "Password Harus 6 Angka"),
});

export type InputUserType = z.infer<typeof inputUserSchema>;
export type InputUserKey = keyof InputUserType;
