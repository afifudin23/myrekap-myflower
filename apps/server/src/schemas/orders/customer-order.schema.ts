import { z } from "zod";

export const createCustomerOrderSchema = z
    .object({
        customerName: z.string(),
        customerCategory: z.preprocess(
            (val) => (typeof val === "string" ? val.toUpperCase() : val),
            z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"])
        ),
        phoneNumber: z.string(),
        deliveryOption: z.preprocess(
            (val) => (typeof val === "string" ? val.toUpperCase() : val),
            z.enum(["DELIVERY", "PICKUP"])
        ),
        deliveryAddress: z.string().nullish(),
        deliveryDate: z.coerce
            .date()
            .nullish()
            .refine(
                (date) => {
                    if (!date) return true; // Allow null values

                    const delivery = new Date(date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Reset to midnight

                    return delivery >= today;
                },
                {
                    message: "Delivery date minimum is today",
                }
            ),
        shippingCost: z.coerce.number().min(0, { message: "Shipping cost must be a positive number" }).nullish(),
        readyDate: z.coerce.date().refine(
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
        paymentMethod: z.preprocess(
            (val) => (typeof val === "string" ? val.toUpperCase() : val),
            z.enum(["COD", "OTHERS"])
        ).nullable().transform((val) => (val === "OTHERS" ? null : val)),
        messages: z.array(
            z.object({
                productId: z.string(),
                message: z.string().nullish(),
            })
        ),
    })
    .superRefine((data, ctx) => {
        // If delivery option is "PICKUP", set delivery address, date, and shipping cost to null
        if (data.deliveryOption === "PICKUP") {
            data.deliveryAddress = null;
            data.deliveryDate = null;
            data.shippingCost = null;
        }

        if (data.deliveryOption === "DELIVERY") {
            if (!data.deliveryAddress) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["deliveryAddress"],
                    message: "Delivery address is required for delivery",
                });
            }
            if (!data.deliveryDate) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["deliveryDate"],
                    message: "Delivery date is required for delivery",
                });
            }
            if (!data.shippingCost || data.shippingCost < 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["shippingCost"],
                    message: "Shipping cost is required for delivery",
                });
            }
        }
    });

export type CreateCustomerOrderType = z.infer<typeof createCustomerOrderSchema>;
