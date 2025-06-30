import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string(),
    price: z.coerce.number({ invalid_type_error: "Price must be a number" }).min(1, "Price must be greater than 0"),
    stock: z.coerce.number({ invalid_type_error: "Stock must be a number" }).min(1, "Stock must be greater than 0"),
    description: z.string(),
});

export type CreateProductType = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
    name: z.string().optional(),
    price: z.coerce
        .number({ invalid_type_error: "Price must be a number" })
        .min(1, "Price must be greater than 0")
        .optional(),
    stock: z.coerce
        .number({ invalid_type_error: "Stock must be a number" })
        .min(1, "Stock must be greater than 0")
        .optional(),
    description: z.string().optional(),
    isActive: z
        .enum(["true", "false"])
        .transform((val) => val === "true")
        .optional(),
    publicIdsToDelete: z.array(z.string()).optional(),
});
export type UpdateProductType = z.infer<typeof updateProductSchema>;
