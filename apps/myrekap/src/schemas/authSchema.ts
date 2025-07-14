import { object, string, z } from "zod";

export const loginFormSchema = object({
    username: string()
        .nonempty("Username wajib diisi")
        .min(3, "Username minimal 3 karakter")
        .max(10, "Username maksimal 10 karakter"),
    password: string().nonempty("Password wajib diisi").length(6, "Password Harus 6 Angka"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export type LoginKey = "username" | "password";
