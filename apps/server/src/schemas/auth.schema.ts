import { z } from "zod";

export const loginUserSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const registerCustomer = z.object({
    fullName: z.string(),
    username: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string().min(5),
    confPassword: z.string().min(5),
    role: z.enum(["CUSTOMER"]).default("CUSTOMER"),
});
