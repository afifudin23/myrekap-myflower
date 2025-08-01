import { z } from "zod";

export const create = z
    .object({
        deliveryOption: z.preprocess(
            (val) => (typeof val === "string" ? val.toUpperCase() : val),
            z.enum(["DELIVERY", "PICKUP"])
        ),
        deliveryAddress: z.string().nullish(),
        readyDate: z.coerce.date(),
        paymentMethod: z
            .preprocess((val) => (typeof val === "string" ? val.toUpperCase() : val), z.enum(["COD", "OTHERS"]))
            .transform((val) => (val === "OTHERS" ? null : val))
            .nullable(),
        items: z.array(
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
