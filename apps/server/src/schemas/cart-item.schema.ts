import { z } from "zod";

export const addToCartSchema = z.object({
    productId: z.string(),
});

export type AddToCartType = z.infer<typeof addToCartSchema>;
