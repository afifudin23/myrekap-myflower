import { z } from "zod";

const paymentProofSchema = z
    .union([
        z.object({
            buffer: z.instanceof(Buffer),
            size: z.number().max(2 * 1024 * 1024, { message: "Maksimal ukuran 2 MB." }),
            mimetype: z.string().refine((val) => val.startsWith("image/"), { message: "File harus berupa gambar." }),
            originalname: z.string(),
        }),
        z.object({
            fileName: z.string(),
            id: z.string(),
            orderSummaryId: z.string(),
            publicId: z.string(),
            secureUrl: z.string(),
            size: z.number(),
        }),
    ])
    .nullish();

export const createOrderSchema = z
    .object({
        customerName: z.string({
            invalid_type_error: "Customer name must be a string",
            required_error: "Customer name is required",
        }),
        flowerCategory: z.enum(
            [
                "TAFEL_BOUQUET",
                "BOUQUET",
                "HANDS_BOUQUET",
                "KRANS",
                "TUTUP_PETI",
                "BUNGA_PAPAN",
                "PAPER_FLOWER",
                "BUNGA_BALON",
                "BLOOMBOX",
            ],
            {
                required_error: "Flower category is required",
                invalid_type_error: "Flower category must be a valid enum value",
            }
        ),
        quantity: z.coerce
            .number({
                invalid_type_error: "Quantity must be a number",
                required_error: "Quantity is required",
            })
            .positive("Quantity must be a positive number"),
        greetingMessage: z.string({
            invalid_type_error: "Greeting message must be a string",
            required_error: "Greeting message is required",
        }),
        deliveryDate: z.string({ required_error: "Delivery date is required" }).refine(
            (date) => {
                const delivery = new Date(date);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset to midnight

                return delivery >= today;
            },
            {
                message: "Delivery date minimum is today",
            }
        ),
        deliveryAddress: z.string({
            invalid_type_error: "Delivery address must be a string",
            required_error: "Delivery address is required",
        }),
        customerCategory: z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
            required_error: "Customer category is required",
            invalid_type_error: "Customer category must be a valid enum value",
        }),
        price: z.coerce
            .number({
                invalid_type_error: "Price must be a number",
                required_error: "Price is required",
            })
            .positive("Price must be a positive number"),
        shippingCost: z.coerce
            .number({
                invalid_type_error: "Shipping cost must be a number",
                required_error: "Shipping cost is required",
            })
            .positive("Shipping cost must be a positive number"),
        paymentMethod: z
            .enum(["CASH", "TRANSFER", "PENDING"], {
                required_error: "Payment method is required",
                invalid_type_error: "Payment method must be a valid enum value",
            })
            .default("PENDING"),
        isPaid: z.preprocess((value) => value === "true", z.boolean()).default(false),
        paymentProof: paymentProofSchema,
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

export const updateOrderSchema = z
    .object({
        customerName: z.string({ invalid_type_error: "Customer name must be a string" }).nullish(),
        flowerCategory: z
            .enum(
                [
                    "TAFEL_BOUQUET",
                    "BOUQUET",
                    "HANDS_BOUQUET",
                    "KRANS",
                    "TUTUP_PETI",
                    "BUNGA_PAPAN",
                    "PAPER_FLOWER",
                    "BUNGA_BALON",
                    "BLOOMBOX",
                ],
                {
                    invalid_type_error: "Flower category must be a valid enum value",
                }
            )
            .nullish(),
        quantity: z.coerce
            .number({ invalid_type_error: "Quantity must be a number" })
            .positive("Quantity must be a positive number")
            .nullish(),
        greetingMessage: z.string({ invalid_type_error: "Greeting message must be a string" }).nullish(),
        deliveryDate: z.string().nullish(),
        deliveryAddress: z.string({ invalid_type_error: "Delivery address must be a string" }).nullish(),
        customerCategory: z
            .enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
                invalid_type_error: "Customer category must be a valid enum value",
            })
            .nullish(),
        price: z.coerce.number().positive("Price must be a positive number").nullish(),
        shippingCost: z.coerce.number().positive("Shipping cost must be a positive number").nullish(),
        paymentMethod: z
            .enum(["CASH", "TRANSFER", "PENDING"], {
                required_error: "Payment method is required",
                invalid_type_error: "Payment method must be a valid enum value",
            })
            .nullish(),
        isPaid: z.preprocess((value) => value === "true", z.boolean()).nullish(),
        paymentProof: paymentProofSchema,
    })
    .superRefine((data, ctx) => {
        if (data.paymentMethod === "TRANSFER" && !data.paymentProof) {
            ctx.addIssue({
                path: ["paymentProof"],
                code: z.ZodIssueCode.custom,
                message: "Payment proof is required for transfer payment method",
            });
        }
        if (data.isPaid && (!data.paymentMethod || data.paymentMethod === "PENDING")) {
            ctx.addIssue({
                path: ["paymentMethod"],
                code: z.ZodIssueCode.custom,
                message: "Payment method is required if the order is paid",
            });
        }
    });
