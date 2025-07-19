import { z } from "zod";

export const create = z
    .object({
        deliveryOption: z.preprocess(
            (val) => (typeof val === "string" ? val.toUpperCase() : val),
            z.enum(["DELIVERY", "PICKUP"])
        ),
        deliveryAddress: z.string().nullish(),
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
        paymentMethod: z
            .preprocess((val) => (typeof val === "string" ? val.toUpperCase() : val), z.enum(["COD", "OTHERS"]))
            .nullable()
            .transform((val) => (val === "OTHERS" ? null : val)),
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
        }

        if (data.deliveryOption === "DELIVERY") {
            if (!data.deliveryAddress) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["deliveryAddress"],
                    message: "Delivery address is required for delivery",
                });
            }
        }
    });

export type CreateType = z.infer<typeof create>;
