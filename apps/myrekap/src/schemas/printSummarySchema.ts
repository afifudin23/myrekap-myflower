import { z } from "zod";

export const printSummarySchema = z.object({
    fromDate: z.date({
        required_error: "Tanggal mulai wajib diisi",
        invalid_type_error: "Format tanggal tidak valid",
    }),
    toDate: z.date({
        required_error: "Tanggal selesai wajib diisi",
        invalid_type_error: "Format tanggal tidak valid",
    }),
    flowerCategory: z.string().nonempty("Wajib pilih kategori bunga"),
    customerCategory: z.string().nonempty("Wajib pilih kategori customer"),
    paymentMethod: z.string().nonempty("Wajib pilih metode pembayaran"),
    paymentStatus: z.string().nonempty("Wajib pilih status pembayaran"),
    orderStatus: z.string().nonempty("Wajib pilih status pesanan"),
});
export type PrintSummaryType = z.infer<typeof printSummarySchema>;
export type PrintSummaryKey = keyof PrintSummaryType;