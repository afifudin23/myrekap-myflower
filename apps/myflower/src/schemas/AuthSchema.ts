import { z, type TypeOf } from "zod";

export const loginFormSchema = z.object({
    username: z.string({ required_error: "Username Harus Diisi" }),
    pin: z.string({ required_error: "PIN Harus Diisi" }),
})

export type LoginFormType = TypeOf<typeof loginFormSchema>

export const registerFormSchema = z.object({
    username: z.string({ required_error: "Username Harus Diisi" }),
    email: z.string({ required_error: "Email Harus Diisi" }).email({ message: "Email Tidak Valid" }),
    pin: z.string({ required_error: "PIN Harus Diisi" }),
    confirmPin: z.string({ required_error: "Konfirmasi PIN Harus Diisi" }),
})

export type RegisterFormType = TypeOf<typeof registerFormSchema>

