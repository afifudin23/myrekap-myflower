import { z } from "zod";

export const reportOrderSchema = z.object({
    fromDate: z.date({
        required_error: "Tanggal mulai wajib diisi",
        invalid_type_error: "Format tanggal tidak valid",
    }),
    toDate: z.date({
        required_error: "Tanggal selesai wajib diisi",
        invalid_type_error: "Format tanggal tidak valid",
    }),
    customerCategory: z.enum(["ALL", "UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"], {
        required_error: "Wajib pilih kategori customer",
        invalid_type_error: "Kategori customer tidak valid",
    }),
    paymentMethod: z.enum(["ALL", "CASH", "BANK_TRANSFER"], {
        required_error: "Wajib pilih metode pembayaran",
        invalid_type_error: "Metode pembayaran tidak valid",
    }),
    paymentStatus: z.enum(["ALL", "PENDING", "UNPAID", "PAID", "CANCELED", "EXPIRED", "REFUNDED", "DENIED"], {
        required_error: "Wajib pilih status pembayaran",
        invalid_type_error: "Status pembayaran tidak valid",
    }),
    orderStatus: z.enum(["ALL", "IN_PROCESS", "DELIVERY", "CANCELED", "COMPLETED"], {
        required_error: "Wajib pilih status pesanan",
        invalid_type_error: "Status pesanan tidak valid",
    }),
});
export type ReportOrderType = z.infer<typeof reportOrderSchema>;
export type ReportOrderKey = keyof ReportOrderType;
