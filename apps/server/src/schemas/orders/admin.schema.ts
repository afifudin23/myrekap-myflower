import { formatters } from "@/utils";
import { z } from "zod";

const itemSchema = z.object({
    id: z.string().nullish(),
    productId: z
        .string({ invalid_type_error: "productId must be a string", required_error: "productId is required" })
        .nonempty("productId is required"),
    quantity: z.coerce.number().positive("Quantity must be a positive number"),
    message: z.string({ invalid_type_error: "Message must be a string" }).nonempty("Message is not empty").nullish(),
});

export const create = z
    .object({
        customerName: z.string({
            invalid_type_error: "Customer name must be a string",
            required_error: "Customer name is required",
        }),
        // customerCategory: z.preprocess(
        //     (value) => (typeof value === "string" ? formatters.parseCapital(value) : value),
        //     z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
        //         required_error: "Customer category is required",
        //         invalid_type_error: "Customer category must be a valid enum value",
        //     })
        // ),
        phoneNumber: z
            .string({ invalid_type_error: "Phone number must be a string", required_error: "Phone number is required" })
            .nonempty("Phone number is required"),
        items: z
            .string()
            .transform((val) => {
                const parsed = JSON.parse(val);
                return Array.isArray(parsed) ? parsed : [parsed];
            })
            .pipe(z.array(itemSchema)),
        deliveryOption: z.preprocess(
            (value) => (typeof value === "string" ? formatters.parseCapital(value) : value),
            z.enum(["PICKUP", "DELIVERY"], {
                required_error: "Delivery option is required",
                invalid_type_error: "Delivery option must be a valid enum value",
            })
        ),
        deliveryAddress: z
            .string({ invalid_type_error: "Delivery address must be a string" })
            .transform((val) => (val === "" ? null : val))
            .nullish(),
        readyDate: z.coerce.date(),
        paymentMethod: z.preprocess(
            (val) => (typeof val === "string" ? val.toUpperCase() : val),
            z.enum(["CASH", "BANK_TRANSFER"], {
                invalid_type_error: "Payment method must be a valid enum value",
                required_error: "Payment method is required",
            })
        ),
    })
    .superRefine((data, ctx) => {
        // If delivery option is "PICKUP", set delivery address to null
        if (data.deliveryOption === "DELIVERY" && !data.deliveryAddress) {
            ctx.addIssue({
                path: ["deliveryAddress"],
                code: z.ZodIssueCode.custom,
                message: "Delivery address is required for delivery",
            });
        } else if (data.deliveryOption === "PICKUP") {
            data.deliveryAddress = null;
        }
    });

export const update = z
    .object({
        customerName: z
            .string({
                invalid_type_error: "Customer name must be a string",
                required_error: "Customer name is required",
            })
            .nullish(),
        // customerCategory: z
        //     .preprocess(
        //         (value) => (typeof value === "string" ? formatters.parseCapital(value) : value),
        //         z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
        //             required_error: "Customer category is required",
        //             invalid_type_error: "Customer category must be a valid enum value",
        //         })
        //     )
        //     .nullish(),
        phoneNumber: z
            .string({ invalid_type_error: "Phone number must be a string", required_error: "Phone number is required" })
            .nonempty("Phone number is required")
            .nullish(),
        items: z
            .string()
            .transform((val) => {
                const parsed = JSON.parse(val);
                return Array.isArray(parsed) ? parsed : [parsed];
            })
            .pipe(z.array(itemSchema))
            .nullish(),
        deliveryOption: z.preprocess(
            (value) => (typeof value === "string" ? formatters.parseCapital(value) : value),
            z
                .enum(["PICKUP", "DELIVERY"], {
                    required_error: "Delivery option is required",
                    invalid_type_error: "Delivery option must be a valid enum value",
                })
                .nullish()
        ),
        deliveryAddress: z
            .string({ invalid_type_error: "Delivery address must be a string" })
            .transform((val) => (val === "" ? null : val))
            .nullish(),
        readyDate: z.coerce
            .date()
            .nullish(),
        paymentMethod: z
            .preprocess(
                (val) => (typeof val === "string" ? val.toUpperCase() : val),
                z.enum(["CASH", "BANK_TRANSFER"], {
                    invalid_type_error: "Payment method must be a valid enum value",
                    required_error: "Payment method is required",
                })
            )
            .nullish(),
        publicIdsToDelete: z
            .string()
            .transform((val) => {
                const parsed = JSON.parse(val);
                return Array.isArray(parsed) ? parsed : [parsed];
            })
            .pipe(z.array(z.string()))
            .nullish(),
    })
    .superRefine((data, ctx) => {
        // If delivery option is "PICKUP", set delivery address to null
        if (data.deliveryOption === "DELIVERY" && !data.deliveryAddress) {
            ctx.addIssue({
                path: ["deliveryAddress"],
                code: z.ZodIssueCode.custom,
                message: "Delivery address is required for delivery",
            });
        } else if (data.deliveryOption === "PICKUP") {
            data.deliveryAddress = null;
        }
    });

export const updateOrderStatus = z.object({
    orderStatus: z.preprocess(
        (value) => (typeof value === "string" ? formatters.parseCapital(value) : value),
        z.enum(["COMPLETED", "DELIVERY", "IN_PROCESS", "CANCELED"], {
            required_error: "Order status is required",
            invalid_type_error: "Order status must be a valid enum value",
        })
    ),
});
