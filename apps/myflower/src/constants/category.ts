// Customer Category
export const CUSTOMER_CATEGORY_ITEMS = ["UMUM", "PEMDA", "AKADEMIK", "RUMAH_SAKIT", "POLISI_MILITER", "PERBANKAN"];
export const CUSTOMER_CATEGORY_LABELS: any = {
    UMUM: "Umum",
    PEMDA: "Instansi",
    AKADEMIK: "Akademik",
    RUMAH_SAKIT: "Rumah Sakit",
    POLISI_MILITER: "Polisi/Militer",
    PERBANKAN: "Perbankan",
};

// Delivery Option
export const DELIVERY_OPTION_ITEMS = ["DELIVERY", "PICKUP"];
export const DELIVERY_OPTION_LABELS: any = {
    DELIVERY: "Kirim ke Alamat",
    PICKUP: "Ambil di Tempat",
};

// Payment Method
export const PAYMENT_METHOD_ITEMS = ["COD", "OTHERS"];
export const PAYMENT_METHOD_LABELS: any = {
    OTHERS: "Lainnya (Transfer Bank)",
    COD: "Cash On Delivery (COD)",
    ALL: "Semua",
    BANK_TRANSFER: "TRANSFER BANK",
    CASH: "TUNAI",
    CREDIT_CARD: "KARTU KREDIT",
    QRIS: "QRIS",
    EWALLET: "E-WALLET",
    CSTORE: "CSTORE",
};

// Payment Status
export const PAYMENT_STATUS_LABELS: any = {
    ALL: "Semua",
    PAID: "Lunas",
    PENDING: "Menunggu",
    UNPAID: "Belum Lunas",
    CANCELED: "Batal",
    EXPIRED: "Expired",
    REFUNDED: "Refund",
    DENIED: "Ditolak",
};

// Order Status
export const ORDER_STATUS_LABELS: any = {
    ALL: "Semua",
    IN_PROCESS: "Diproses",
    DELIVERY: "Dalam Pengiriman",
    CANCELED: "Dibatalkan",
    COMPLETED: "Selesai",
};