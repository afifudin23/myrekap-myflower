import { z } from "zod";

export const create = z
    .object({
        customerName: z.string().nonempty("Nama wajib diisi"),
        customerCategory: z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
            required_error: "Wajib pilih kategori customer",
            invalid_type_error: "Kategori customer tidak valid",
        }),
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
                price: z.coerce.number().positive("Harga tidak boleh 0 atau negatif"),
            })
        ),
        deliveryOption: z.enum(["DELIVERY", "PICKUP"], {
            required_error: "Wajib pilih metode pengiriman",
            invalid_type_error: "Metode pengiriman tidak valid",
        }),
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
        paymentMethod: z.enum(["CASH", "BANK_TRANSFER"], {
            required_error: "Wajib pilih metode pembayaran",
            invalid_type_error: "Metode pembayaran tidak valid",
        }),
        paymentProof: z.array(z.instanceof(File)),
    })
    .superRefine((data, ctx) => {
        if (data.paymentMethod === "BANK_TRANSFER" && !data.paymentProof) {
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

const existingFile = z.object({
    fileName: z.string(),
    id: z.string(),
    orderId: z.string(),
    publicId: z.string(),
    secureUrl: z.string(),
    size: z.number(),
});

export const update = z
    .object({
        customerName: z.string().nonempty("Nama wajib diisi"),
        customerCategory: z
            .enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
                invalid_type_error: "Kategori customer tidak valid",
            })
            .nullish(),
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
        deliveryOption: z.enum(["DELIVERY", "PICKUP"], {
            invalid_type_error: "Metode pengiriman tidak valid",
        }).nullish(),
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
        paymentMethod: z.enum(["CASH", "BANK_TRANSFER"], {
            invalid_type_error: "Metode pembayaran tidak valid",
        }).nullish(),
        paymentProof: z.array(
            z.union([
                existingFile,
                z
                    .instanceof(File)
                    .nullish()
                    .refine((file) => (file?.size ? file.size <= 2 * 1024 * 1024 : true), {
                        message: "Maksimal ukuran 2 MB.",
                    }),
            ])
        ),
        publicIdsToDelete: z.array(z.string()).nullish(),
    })
    .superRefine((data, ctx) => {
        if (data.paymentMethod === "BANK_TRANSFER" && !data.paymentProof) {
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
