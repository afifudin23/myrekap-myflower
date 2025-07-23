import { formatters } from "@/utils";
import { z } from "zod";

export const create = z
    .object({
        customerName: z.string().nonempty("Nama wajib diisi"),
        customerCategory: z
            .string()
            .nonempty("Wajib pilih kategori customer")
            // enum validation replace
            .refine(
                (val) => ["Umum", "Pemda", "Akademik", "Rumah Sakit", "Polisi/Militer", "Perbankan"].includes(val),
                {
                    message: "Kategori customer tidak valid",
                }
            )
            .transform((value) => formatters.parseCapital(value)),
        phoneNumber: z.string().nonempty("Nomor telepon wajib diisi"),
        items: z.array(
            z.object({
                id: z.string().nullish(),
                productId: z.string().nonempty("Wajib pilih bunga"),
                quantity: z.coerce.number().positive("Jumlah pesan tidak boleh 0 atau negatif"),
                message: z
                    .string()
                    .transform((val) => (val === "" ? null : val))
                    .nullish(),
            })
        ),
        deliveryOption: z
            .string()
            .nonempty("Wajib pilih metode pengiriman")
            .refine((val) => ["Delivery", "Pickup"].includes(val), {
                message: "Metode pengiriman tidak valid",
            })
            .transform((val) => formatters.parseCapital(val)),
        deliveryAddress: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .nullish(),
        readyDate: z
            .date({
                required_error: "Tanggal siap wajib diisi",
                invalid_type_error: "Format tanggal tidak valid",
            })
            .refine(
                (date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Reset to midnight
                    return date > today;
                },
                {
                    message: "Tanggal produk jadi minimal besok hari",
                }
            )
            .transform((date) => date.toISOString()),
        paymentMethod: z
            .string()
            .nonempty("Wajib pilih metode pembayaran")
            .refine((val) => ["Cash", "Bank Transfer"].includes(val), {
                message: "Metode pembayaran tidak valid",
            })
            .transform((value) => formatters.parseCapital(value)),
        paymentProof: z.array(z.instanceof(File)),
    })
    .superRefine((data, ctx) => {
        if (data.paymentMethod === "Bank Transfer" && !data.paymentProof) {
            ctx.addIssue({
                path: ["paymentProof"],
                code: z.ZodIssueCode.custom,
                message: "Bukti transfer wajib diunggah untuk metode pembayaran transfer",
            });
        }
        if (data.deliveryOption === "DELIVERY" && !data.deliveryAddress) {
            ctx.addIssue({
                path: ["deliveryAddress"],
                code: z.ZodIssueCode.custom,
                message: "Alamat pengiriman wajib diisi untuk metode pengiriman delivery",
            });
        }
    });

export const update = z
    .object({
        customerName: z.string().nonempty("Nama wajib diisi"),
        customerCategory: z
            .string()
            .nonempty("Wajib pilih kategori customer")
            // enum validation replace
            .refine(
                (val) => ["Umum", "Pemda", "Akademik", "Rumah Sakit", "Polisi/Militer", "Perbankan"].includes(val),
                {
                    message: "Kategori customer tidak valid",
                }
            )
            .transform((value) => formatters.parseCapital(value)),
        phoneNumber: z.string().nonempty("Nomor telepon wajib diisi"),
        items: z.array(
            z.object({
                id: z.string().nullish(),
                productId: z.string().nonempty("Wajib pilih bunga"),
                quantity: z.coerce.number().positive("Jumlah pesan tidak boleh 0 atau negatif"),
                message: z
                    .string()
                    .transform((val) => (val === "" ? null : val))
                    .nullish(),
            })
        ),
        deliveryOption: z
            .string()
            .nonempty("Wajib pilih metode pengiriman")
            .refine((val) => ["Delivery", "Pickup"].includes(val), {
                message: "Metode pengiriman tidak valid",
            })
            .transform((val) => formatters.parseCapital(val)),
        deliveryAddress: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .nullish(),
        readyDate: z
            .date({
                required_error: "Tanggal siap wajib diisi",
                invalid_type_error: "Format tanggal tidak valid",
            })
            .refine(
                (date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Reset to midnight
                    return date > today;
                },
                {
                    message: "Ready date minimum is today",
                }
            )
            .transform((date) => date.toISOString()),
        paymentMethod: z
            .string()
            .nonempty("Wajib pilih metode pembayaran")
            .refine((val) => ["Cash", "Bank Transfer"].includes(val), {
                message: "Metode pembayaran tidak valid",
            })
            .transform((value) => formatters.parseCapital(value)),
        paymentProof: z.array(z.instanceof(File)),
        publicIdsToDelete: z.array(z.string()).nullish(),
    })
    .superRefine((data, ctx) => {
        if (data.paymentMethod === "Bank Transfer" && !data.paymentProof) {
            ctx.addIssue({
                path: ["paymentProof"],
                code: z.ZodIssueCode.custom,
                message: "Bukti transfer wajib diunggah untuk metode pembayaran transfer",
            });
        }
        if (data.deliveryOption === "DELIVERY" && !data.deliveryAddress) {
            ctx.addIssue({
                path: ["deliveryAddress"],
                code: z.ZodIssueCode.custom,
                message: "Alamat pengiriman wajib diisi untuk metode pengiriman delivery",
            });
        }
    });
