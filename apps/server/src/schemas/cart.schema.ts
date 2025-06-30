import { z } from "zod";

export const upsertCartItemSchema = z.object({
    productId: z.string().uuid({ message: "Invalid product ID" }),
    quantity: z
        .number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
        })
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1"),
});

export type UpsertCartItemType = z.infer<typeof upsertCartItemSchema>;
