import { formatters } from "@/utils";
import { z } from "zod";

export const profileFormSchema = z
    .object({
        fullName: z.string({ required_error: "Nama Harus Diisi" }).nonempty({ message: "Nama Harus Diisi" }),
        username: z.string({ required_error: "Username Harus Diisi" }).nonempty({ message: "Username Harus Diisi" }),
        email: z
            .string({ required_error: "Email Harus Diisi" })
            .nonempty({ message: "Email Harus Diisi" })
            .email({ message: "Email Tidak Valid" }),
        phoneNumber: z
            .string({ required_error: "Nomor Telepon Harus Diisi" })
            .nonempty({ message: "Nomor Telepon Harus Diisi" }),
        customerCategory: z
            .string()
            .nullish()
            .transform((val) => (val ? formatters.formatCapital(val) : null)),
        oldPassword: z.string().nullish(),
        newPassword: z.string().nullish(),
        confPassword: z.string().nullish(),
    })
    .superRefine((data, ctx) => {
        const oneFilled = !!(data.oldPassword || data.newPassword || data.confPassword);
        const allFilled = !!(data.oldPassword && data.newPassword && data.confPassword);

        if (oneFilled && !allFilled) {
            if (!data.oldPassword) {
                ctx.addIssue({
                    path: ["oldPassword"],
                    message: "Password lama tidak boleh kosong jika ingin mengganti password",
                    code: z.ZodIssueCode.custom,
                });
            }
            if (!data.newPassword) {
                ctx.addIssue({
                    path: ["newPassword"],
                    message: "Password baru tidak boleh kosong jika ingin mengganti password",
                    code: z.ZodIssueCode.custom,
                });
            }
            if (!data.confPassword) {
                ctx.addIssue({
                    path: ["confPassword"],
                    message: "Konfirmasi password tidak boleh kosong jika ingin mengganti password",
                    code: z.ZodIssueCode.custom,
                });
            }
        }

        if (data.newPassword && data.confPassword && data.newPassword !== data.confPassword) {
            ctx.addIssue({
                path: ["confPassword"],
                message: "Konfirmasi password harus sama dengan password baru",
                code: z.ZodIssueCode.custom,
            });
        }
    });
