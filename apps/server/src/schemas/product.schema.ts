import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().transform((val) => val.trim()),
    price: z.coerce.number({ invalid_type_error: "Price must be a number" }).min(1, "Price must be greater than 0"),
    description: z.string().transform((val) => val.trim()),
});

export type CreateProductType = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
    name: z
        .string()
        .transform((val) => val.trim())
        .optional(),
    price: z.coerce
        .number({ invalid_type_error: "Price must be a number" })
        .min(1, "Price must be greater than 0")
        .optional(),
    description: z
        .string()
        .transform((val) => val.trim())
        .optional(),
    isActive: z.coerce.boolean().optional(),
    publicIdsToDelete: z.array(z.string()).optional(),
});
export type UpdateProductType = z.infer<typeof updateProductSchema>;

export const manageStock = z.object({
    type: z.preprocess(
        (val) => (typeof val === "string" ? val.toUpperCase() : val),
        z.enum(["STOCK_IN", "STOCK_OUT"], {
            invalid_type_error: "Type must be a valid enum value",
            required_error: "Type is required",
        })
    ),
    quantity: z.coerce
        .number({ invalid_type_error: "Quantity must be a number" })
        .min(1, "Quantity must be greater than 0"),
    note: z.string({ invalid_type_error: "Note must be a string" }).nonempty("Note is not empty").optional(),
});
