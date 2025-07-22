import z, { object, string } from "zod";

export const create = object({
    fullName: string(),
    username: string(),
    email: string().email(),
    phoneNumber: string(),
    password: string().min(5),
    confPassword: string().min(5),
    role: z.enum(["ADMIN", "SUPERADMIN"]).default("ADMIN"),
});

export const update = object({
    fullName: string().nullish(),
    username: string().nullish(),
    email: string().email().nullish(),
    phoneNumber: string().nullish(),
    password: string().nullish(),
    confPassword: string().nullish(),
    role: z.enum(["ADMIN", "SUPERADMIN"]).nullish(),
});

export const updateProfile = object({
    fullName: string().nullish(),
    username: string().nullish(),
    email: string().email().nullish(),
    phoneNumber: string().nullish(),

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
