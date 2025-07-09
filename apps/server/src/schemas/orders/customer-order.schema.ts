import { z } from "zod";
// const test = [{ productId: "cmcjfszds00007kj4y1zgfbxz", message: "Halo Apeepp" },{ productId: "cmckjb0xd00007kqk70ow0ri0", message: null }];
export const createCustomerOrderSchema = z.object({
    customerName: z.string(),
    customerCategory: z.enum(["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"]),
    deliveryOption: z.enum(["DELIVERY", "PICKUP"]),
    deliveryAddress: z
        .string()
        .transform((val) => (val === "" ? null : val))
        .nullish(),
    deliveryDate: z
        .string()
        .transform((val) => (val === "" ? null : new Date(val)))
        .nullish(),
    shippingCost: z
        .string()
        .transform((val) => (val === "" ? null : Number(val)))
        .refine((val) => val === null || val > 0, {
            message: "Shipping cost must be a positive number",
        })
        .nullish(),
    readyDate: z.coerce.date(),
    paymentMethod: z.enum(["COD", "OTHERS"]).nullish(),
    greetings: z.preprocess(
        (val) => (typeof val === "string" ? JSON.parse(val) : val),
        z.array(
            z.object({
                productId: z.string(),
                message: z
                    .string()
                    .transform((val) => (val === "" ? null : val))
                    .nullish(),
            })
        )
    ),
});

export type CreateCustomerOrderType = z.infer<typeof createCustomerOrderSchema>;
