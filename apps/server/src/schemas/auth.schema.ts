import { z } from "zod";

export const loginUserSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const registerCustomer = z
    .object({
        fullName: z.string(),
        username: z.string(),
        email: z.string().email(),
        phoneNumber: z.string(),
        // customerCategory: z.preprocess(
        //     (value) => (typeof value === "string" ? formatters.parseCapital(value) : value),
        //     z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
        //         required_error: "Customer category is required",
        //         invalid_type_error: "Customer category must be a valid enum value",
        //     })
        // ),
        password: z.string().min(5),
        confPassword: z.string().min(5),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confPassword) {
            ctx.addIssue({
                path: ["confPassword"],
                message: "Confirmation password does not match",
                code: z.ZodIssueCode.custom,
            });
        }
    });

export const resendVerificationEmail = z.object({
    email: z.string().email(),
});

export const forgotPassword = z.object({
    email: z.string().email(),
});

export const resetPassword = z
    .object({
        token: z.string(),
        password: z.string().min(5),
        confPassword: z.string().min(5),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confPassword) {
            ctx.addIssue({
                path: ["confPassword"],
                message: "Confirmation password does not match",
                code: z.ZodIssueCode.custom,
            });
        }
    });
