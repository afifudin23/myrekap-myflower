import { z } from "zod";

export const create = z
    .object({
        customerName: z.string().nonempty("Harap isi nama terlebih dahulu."),
        // customerCategory: z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
        //     required_error: "Harap pilih kategori terlebih dahulu.",
        //     invalid_type_error: "Kategori tidak valid.",
        // }),
        phoneNumber: z.string().nonempty("Harap isi nomor telepon terlebih dahulu."),
        items: z.array(
            z.object({
                productId: z.string().nonempty("Harap pilih bunga terlebih dahulu."),
                quantity: z.coerce.number().positive("Jumlah pesanan harus lebih dari 0."),
                message: z
                    .string()
                    .transform((val) => (val === "" ? null : val))
                    .nullish(),
                price: z.coerce.number().positive("Harga harus lebih dari 0."),
            })
        ),
        deliveryOption: z.enum(["DELIVERY", "PICKUP"], {
            required_error: "Harap pilih metode pengiriman terlebih dahulu.",
            invalid_type_error: "Metode pengiriman tidak valid.",
        }),
        deliveryAddress: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .nullish(),
        readyDate: z
            .date({
                required_error: "Harap isi tanggal produk jadi terlebih dahulu.",
                invalid_type_error: "Format tanggal tidak valid.",
            })
            .transform((date) => date.toISOString()),
        paymentMethod: z.enum(["CASH", "BANK_TRANSFER"], {
            required_error: "Harap pilih metode pembayaran terlebih dahulu.",
            invalid_type_error: "Metode pembayaran tidak valid.",
        }),
        paymentProof: z.array(
            z
                .instanceof(File)
                .nullish()
                .refine((file) => (file?.size ? file.size <= 2 * 1024 * 1024 : true), {
                    message: "Ukuran maksimal file adalah 2 MB.",
                })
        ),
    })
    .superRefine((data, ctx) => {
        if (data.paymentMethod === "BANK_TRANSFER" && (!data.paymentProof || data.paymentProof.length === 0)) {
            ctx.addIssue({
                path: ["paymentProof"],
                code: z.ZodIssueCode.custom,
                message: "Harap unggah bukti transfer terlebih dahulu untuk metode pembayaran transfer.",
            });
        }
        if (data.deliveryOption === "DELIVERY" && !data.deliveryAddress) {
            ctx.addIssue({
                path: ["deliveryAddress"],
                code: z.ZodIssueCode.custom,
                message: "Harap isi alamat pengiriman terlebih dahulu untuk metode pengiriman kirim ke alamat.",
            });
        }
    });

const existingFile = z.object({
    id: z.string(),
    fileName: z.string(),
    orderId: z.string(),
    publicId: z.string(),
    secureUrl: z.string(),
    size: z.number(),
});

export const update = z
    .object({
        customerName: z.string().nonempty("Harap isi nama terlebih dahulu."),
        // customerCategory: z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
        //     required_error: "Harap pilih kategori terlebih dahulu.",
        //     invalid_type_error: "Kategori tidak valid.",
        // }),
        phoneNumber: z.string().nonempty("Harap isi nomor telepon terlebih dahulu."),
        items: z.array(
            z.object({
                id: z.string().nullish(),
                productId: z.string().nonempty("Harap pilih bunga terlebih dahulu."),
                quantity: z.coerce.number().positive("Jumlah pesanan harus lebih dari 0."),
                message: z
                    .string()
                    .transform((val) => (val === "" ? null : val))
                    .nullish(),
            })
        ),
        deliveryOption: z.enum(["DELIVERY", "PICKUP"], {
            required_error: "Harap pilih metode pengiriman terlebih dahulu.",
            invalid_type_error: "Metode pengiriman tidak valid.",
        }),
        deliveryAddress: z
            .string()
            .transform((val) => (val === "" ? null : val))
            .nullish(),
        readyDate: z
            .date({
                required_error: "Harap isi tanggal siap terlebih dahulu.",
                invalid_type_error: "Format tanggal tidak valid.",
            })
            .transform((date) => date.toISOString()),
        paymentMethod: z.enum(["CASH", "BANK_TRANSFER"], {
            required_error: "Harap pilih metode pembayaran terlebih dahulu.",
            invalid_type_error: "Metode pembayaran tidak valid.",
        }),
        paymentProof: z.array(
            z.union([
                existingFile,
                z
                    .instanceof(File)
                    .nullish()
                    .refine((file) => (file?.size ? file.size <= 2 * 1024 * 1024 : true), {
                        message: "Ukuran maksimal file adalah 2 MB.",
                    }),
            ])
        ),
        publicIdsToDelete: z.array(z.string()).nullish(),
    })
    .superRefine((data, ctx) => {
        if (data.paymentMethod === "BANK_TRANSFER" && (!data.paymentProof || data.paymentProof.length === 0)) {
            ctx.addIssue({
                path: ["paymentProof"],
                code: z.ZodIssueCode.custom,
                message: "Harap unggah bukti transfer terlebih dahulu untuk metode pembayaran transfer.",
            });
        }
        if (data.deliveryOption === "DELIVERY" && !data.deliveryAddress) {
            ctx.addIssue({
                path: ["deliveryAddress"],
                code: z.ZodIssueCode.custom,
                message: "Harap isi alamat pengiriman terlebih dahulu untuk metode pengiriman kirim ke alamat.",
            });
        }
    });
