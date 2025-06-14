import { z, type TypeOf } from "zod";

export const loginFormSchema = z.object({
    username: z.string({ required_error: "Username Harus Diisi" }),
    pin: z.string({ required_error: "PIN Harus Diisi" }),
})

export type LoginFormType = TypeOf<typeof loginFormSchema>