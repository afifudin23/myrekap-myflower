// Customer Category
export const CUSTOMER_CATEGORY_ITEMS = [
    "ALL",
    "UMUM",
    "PEMDA",
    "AKADEMIK",
    "RUMAH_SAKIT",
    "POLISI_MILITER",
    "PERBANKAN",
];
export const CUSTOMER_CATEGORY_LABELS: any = {
    ALL: "Semua",
    UMUM: "Umum",
    PEMDA: "Pemda",
    AKADEMIK: "Akademik",
    RUMAH_SAKIT: "Rumah Sakit",
    POLISI_MILITER: "Polisi/Militer",
    PERBANKAN: "Perbankan",
};

// Delivery Option
export const DELIVERY_OPTION_ITEMS = ["ALL", "DELIVERY", "PICKUP"];
export const DELIVERY_OPTION_LABELS: any = {
    ALL: "Semua",
    DELIVERY: "Kirim ke Alamat",
    PICKUP: "Ambil di Tempat",
};

export const PAYMENT_METHOD_ITEMS = ["ALL", "BANK_TRANSFER", "CASH", "CREDIT_CARD", "QRIS", "EWALLET", "CSTORE", "COD"];
export const PAYMENT_METHOD_LABELS: any = {
    ALL: "Semua",
    BANK_TRANSFER: "TRANSFER BANK",
    CASH: "TUNAI",
    CREDIT_CARD: "KARTU KREDIT",
    QRIS: "QRIS",
    EWALLET: "E-WALLET",
    CSTORE: "CSTORE",
    COD: "Cash On Delivery (COD)",
};

// Payment Status
export const PAYMENT_STATUS_ITEMS = ["ALL", "PAID", "PENDING", "UNPAID", "CANCELED", "EXPIRED", "REFUNDED", "DENIED"];
export const PAYMENT_STATUS_LABELS: any = {
    ALL: "Semua",
    PAID: "Lunas",
    PENDING: "Pending",
    UNPAID: "Belum Lunas",
    CANCELED: "Batal",
    EXPIRED: "Expired",
    REFUNDED: "Refund",
    DENIED: "Ditolak",
};

// Order Status
export const ORDER_STATUS_ITEMS = ["ALL", "IN_PROCESS", "DELIVERY", "CANCELED", "COMPLETED"];
export const ORDER_STATUS_LABELS: any = {
    ALL: "Semua",
    IN_PROCESS: "Diproses",
    DELIVERY: "Pengiriman",
    CANCELED: "Batal",
    COMPLETED: "Selesai",
};

// Type Stock Report
export const TYPE_STOCK_REPORT_ITEMS = ["summary", "stock_in", "stock_out"];
export const TYPE_STOCK_REPORT_LABELS: any = {
    summary: "General",
    stock_in: "Stok Masuk",
    stock_out: "Stok Keluar",
};

export const SOURCE_LABELS: any = {
    MYREKAP: "MyRekap",
    MYFLOWER: "MyFlower",
};
