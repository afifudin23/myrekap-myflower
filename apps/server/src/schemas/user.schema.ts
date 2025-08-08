import { formatters } from "../utils";
import z, { object, string } from "zod";

export const create = z
    .object({
        fullName: z.string(),
        username: z.string(),
        email: z.string().email(),
        phoneNumber: z.string(),
        password: z.string().min(5),
        confPassword: z.string().min(5),
    })
    .superRefine((data, ctx) => {
        if (data.password && data.confPassword && data.password !== data.confPassword) {
            ctx.addIssue({
                path: ["password", "confPassword"],
                message: "Confirm password does not match new password",
                code: z.ZodIssueCode.custom,
            });
        }
    });

export const update = object({
    fullName: string().nullish(),
    username: string().nullish(),
    email: string().email().nullish(),
    phoneNumber: string().nullish(),
    password: string().nullish(),
    confPassword: string().nullish(),
    role: z.enum(["ADMIN"]).nullish(),
});

export const updateProfile = object({
    fullName: string().nullish(),
    username: string().nullish(),
    email: string().email().nullish(),
    phoneNumber: string().nullish(),
    customerCategory: z.preprocess(
        (value) => (typeof value === "string" ? formatters.parseCapital(value) : value),
        z
            .enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
                required_error: "Customer category is required",
                invalid_type_error: "Customer category must be a valid enum value",
            })
            .nullish()
    ),
    oldPassword: string().nullish(),
    newPassword: string().nullish(),
    confPassword: string().nullish(),
}).superRefine((data, ctx) => {
    const oneFilled = !!(data.oldPassword || data.newPassword || data.confPassword);
    const allFilled = !!(data.oldPassword && data.newPassword && data.confPassword);

    if (oneFilled && !allFilled) {
        if (!data.oldPassword) {
            ctx.addIssue({
                path: ["oldPassword"],
                message: "Old password is required",
                code: z.ZodIssueCode.custom,
            });
        }
        if (!data.newPassword) {
            ctx.addIssue({
                path: ["newPassword"],
                message: "New password is required",
                code: z.ZodIssueCode.custom,
            });
        }
        if (!data.confPassword) {
            ctx.addIssue({
                path: ["confPassword"],
                message: "Confirmation password is required",
                code: z.ZodIssueCode.custom,
            });
        }
    }

    if (data.newPassword && data.confPassword && data.newPassword !== data.confPassword) {
        ctx.addIssue({
            path: ["confPassword"],
            message: "Confirm password does not match new password",
            code: z.ZodIssueCode.custom,
        });
    }
});
