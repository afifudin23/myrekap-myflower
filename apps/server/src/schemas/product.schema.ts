import { z, object, string } from "zod";

export const createProductSchema = z.object({
    name: z.string(),
    price: z.coerce.number({ invalid_type_error: "Price must be a number" }).min(1, "Price must be greater than 0"),
    stock: z.coerce.number({ invalid_type_error: "Stock must be a number" }).min(1, "Stock must be greater than 0"),
    description: z.string(),
});

export type CreateProductType = z.infer<typeof createProductSchema>;

export const loginFormSchema = object({
    username: string()
        .nonempty("Username wajib diisi")
        .min(3, "Username minimal 3 karakter")
        .max(10, "Username maksimal 10 karakter"),
    pin: string().nonempty("PIN wajib diisi").length(6, "PIN Harus 6 Angka"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

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
    publicIdsToDelete: z.array(z.string()).optional(),
});
export type UpdateProductType = z.infer<typeof updateProductSchema>;
