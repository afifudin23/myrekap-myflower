import { z } from "zod";

// export const create = z
//     .object({
//         deliveryOption: z.preprocess(
//             (val) => (typeof val === "string" ? val.toUpperCase() : val),
//             z.enum(["DELIVERY", "PICKUP"])
//         ),
//         deliveryAddress: z.string().nullish(),
//         readyDate: z.coerce.date().refine(
//             (date) => {
//                 const delivery = new Date(date);
//                 const today = new Date();
//                 today.setHours(0, 0, 0, 0); // Reset to midnight

//                 return delivery >= today;
//             },
//             {
//                 message: "Delivery date minimum is today",
//             }
//         ),
//         paymentMethod: z
//             .preprocess((val) => (typeof val === "string" ? val.toUpperCase() : val), z.enum(["COD", "OTHERS"]))
//             .transform((val) => (val === "OTHERS" ? null : val))
//             .nullable(),
//         items: z.array(
//             z.object({
//                 productId: z.string(),
//                 message: z.string().nullish(),
//             })
//         ),
//     })
//     .superRefine((data, ctx) => {
//         // If delivery option is "PICKUP", set delivery address, date, and shipping cost to null
//         if (data.deliveryOption === "PICKUP") {
//             data.deliveryAddress = null;
//         }

//         if (data.deliveryOption === "DELIVERY") {
//             if (!data.deliveryAddress) {
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     path: ["deliveryAddress"],
//                     message: "Delivery address is required for delivery",
//                 });
//             }
//         }
//     });

export const orderFormSchema = z
    .object({
        deliveryOption: z
            .string({ required_error: "Opsi Pengiriman Harus Diisi" })
            .nonempty({ message: "Opsi Pengiriman Harus Diisi" }),
        deliveryAddress: z.string().nullish(),
        readyDate: z.date({ required_error: "Tanggal Siap Harus Diisi" }).refine(
            (date) => {
                const delivery = new Date(date);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset to midnight

                return delivery >= today;
            },
            {
                message: "Tanggal Siap Minimal Besok",
            }
        ),
        paymentMethod: z
            .string({
                invalid_type_error: "Metode Pembayaran Harus Diisi",
                required_error: "Metode Pembayaran Harus Diisi",
            })
            .nonempty({ message: "Metode Pembayaran Harus Diisi" }),
        items: z.array(
            z.object({
                productId: z.string(),
                quantity: z.number(),
                message: z.string().nullish(),
            })
        ),
    })
    .superRefine((data, ctx) => {
        // If delivery option is "Pickup", set delivery address, date, and shipping cost to null
        if (data.deliveryOption === "Pickup") {
            data.deliveryAddress = null;
        }

        if (data.deliveryOption === "Delivery") {
            if (!data.deliveryAddress) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["deliveryAddress"],
                    message: "Alamat Pengiriman Harus Diisi Untuk Pengiriman",
                });
            }
        }
    });
