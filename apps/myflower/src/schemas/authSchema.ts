import { z, type TypeOf } from "zod";

export const loginFormSchema = z.object({
    username: z.string({ required_error: "Username Harus Diisi" }).nonempty({ message: "Username Harus Diisi" }),
    password: z.string({ required_error: "Password Harus Diisi" }).nonempty({ message: "Password Harus Diisi" }),
});

export type LoginFormType = TypeOf<typeof loginFormSchema>;

export const registerFormSchema = z.object({
    fullName: z.string({ required_error: "Nama Harus Diisi" }).nonempty({ message: "Nama Harus Diisi" }),
    username: z.string({ required_error: "Username Harus Diisi" }).nonempty({ message: "Username Harus Diisi" }),
    email: z
        .string({ required_error: "Email Harus Diisi" })
        .nonempty({ message: "Email Harus Diisi" })
        .email({ message: "Email Tidak Valid" }),
    phoneNumber: z
        .string({ required_error: "Nomor Telepon Harus Diisi" })
        .nonempty({ message: "Nomor Telepon Harus Diisi" }),
    password: z.string({ required_error: "Password Harus Diisi" }).nonempty({ message: "Password Harus Diisi" }),
    confPassword: z
        .string({ required_error: "Konfirmasi Password Harus Diisi" })
        .nonempty({ message: "Konfirmasi Password Harus Diisi" }),
});

export type RegisterFormType = TypeOf<typeof registerFormSchema>;
