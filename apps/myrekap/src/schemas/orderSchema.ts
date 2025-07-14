import formatters from "@/utils/formatters";
import { TypeOf, z } from "zod";

const existingFile = z.object({
    fileName: z.string(),
    id: z.string(),
    orderSummaryId: z.string(),
    publicId: z.string(),
    secureUrl: z.string(),
    size: z.number(),
});

export const createOrderSchema = z
    .object({
        customerName: z.string().nonempty("Nama wajib diisi"),
        flowerCategory: z
            .string()
            .nonempty("Wajib pilih kategori bunga")
            .transform((value) => formatters.parseCapital(value)),
        quantity: z.coerce.number().positive("Jumlah pesan tidak boleh 0 atau negatif"),
        greetingMessage: z.string().nonempty("Pesan ucapan wajib diisi").max(200, "Maksimal 200 karakter"),
        deliveryDate: z
            .date({
                required_error: "Tanggal pengiriman wajib diisi",
                invalid_type_error: "Format tanggal tidak valid",
            })
            .refine((date) => date > new Date(), "Pengiriman tidak boleh sebelum hari ini"),
        deliveryAddress: z.string().nonempty("Alamat pengiriman wajib diisi").max(200, "Maksimal 200 karakter"),
        customerCategory: z
            .string()
            .nonempty("Wajib pilih kategori customer")
            .transform((value) => formatters.parseCapital(value)),
        price: z
            .number({
                required_error: "Harga wajib diisi",
                invalid_type_error: "Harga harus berupa angka",
            })
            .positive("Harga tidak boleh 0"),
        shippingCost: z
            .number({
                required_error: "Biaya pengiriman wajib diisi",
                invalid_type_error: "Biaya pengiriman harus berupa angka",
            })
            .positive("Biaya pengiriman tidak boleh 0"),
        isPaid: z.coerce.boolean().default(false),
        paymentMethod: z
            .string()
            .nullish()
            .transform((value) => formatters.parseCapital(value || "Pending")),
        paymentProof: z.union([
            existingFile,
            z
                .instanceof(File)
                .nullish()
                .refine((file) => (file?.size ? file.size <= 2 * 1024 * 1024 : true), {
                    message: "Maksimal ukuran 2 MB.",
                }),
        ]),
    })
    .superRefine((data, ctx) => {
        if (data.paymentMethod === "TRANSFER" && !data.paymentProof) {
            ctx.addIssue({
                path: ["paymentProof"],
                code: z.ZodIssueCode.custom,
                message: "Bukti transfer wajib diunggah untuk metode pembayaran transfer",
            });
        }
        if (data.isPaid && data.paymentMethod === "PENDING") {
            ctx.addIssue({
                path: ["paymentMethod"],
                code: z.ZodIssueCode.custom,
                message: "Metode pembayaran wajib diisi jika pesanan sudah dibayar",
            });
        }
    });

export type CreateOrderType = TypeOf<typeof createOrderSchema>;

export const updateOrderSummarySchema = z
    .object({
        customerName: z.string().nonempty("Nama wajib diisi"),
        flowerCategory: z
            .string()
            .nonempty("Wajib pilih kategori bunga")
            .transform((value) => formatters.parseCapital(value)),
        quantity: z.coerce.number().positive("Jumlah pesan tidak boleh 0 atau negatif"),
        greetingMessage: z.string().nonempty("Pesan ucapan wajib diisi").max(200, "Maksimal 200 karakter"),
        deliveryDate: z.date({
            required_error: "Tanggal pengiriman wajib diisi",
            invalid_type_error: "Format tanggal tidak valid",
        }),
        deliveryAddress: z.string().nonempty("Alamat pengiriman wajib diisi").max(200, "Maksimal 200 karakter"),
        customerCategory: z
            .string()
            .nonempty("Wajib pilih kategori customer")
            .transform((value) => formatters.parseCapital(value)),
        price: z
            .number({
                required_error: "Harga wajib diisi",
                invalid_type_error: "Harga harus berupa angka",
            })
            .positive("Harga tidak boleh 0"),
        shippingCost: z
            .number({
                required_error: "Biaya pengiriman wajib diisi",
                invalid_type_error: "Biaya pengiriman harus berupa angka",
            })
            .positive("Biaya pengiriman tidak boleh 0"),
        isPaid: z.coerce.boolean().default(false),
        paymentMethod: z
            .string()
            .nullish()
            .transform((value) => formatters.parseCapital(value || "Pending")),
        paymentProof: z.union([
            existingFile,
            z
                .instanceof(File)
                .nullish()
                .refine((file) => (file?.size ? file.size <= 2 * 1024 * 1024 : true), {
                    message: "Maksimal ukuran 2 MB.",
                }),
        ]),
    })
    .superRefine((data, ctx) => {
        if (data.paymentMethod === "TRANSFER" && !data.paymentProof) {
            ctx.addIssue({
                path: ["paymentProof"],
                code: z.ZodIssueCode.custom,
                message: "Bukti transfer wajib diunggah untuk metode pembayaran transfer",
            });
        }
        if (data.isPaid && data.paymentMethod === "PENDING") {
            ctx.addIssue({
                path: ["paymentMethod"],
                code: z.ZodIssueCode.custom,
                message: "Metode pembayaran wajib diisi jika pesanan sudah dibayar",
            });
        }
    });

export type UpdateOrderSummaryType = TypeOf<typeof updateOrderSummarySchema>;
