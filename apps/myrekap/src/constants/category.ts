// Customer Category
export const CUSTOMER_CATEGORY_ITEMS = [
    {
        label: "Semua",
        value: "ALL",
    },
    {
        label: "Umum",
        value: "UMUM",
    },
    {
        label: "Pemda",
        value: "PEMDA",
    },
    {
        label: "Akademik",
        value: "AKADEMIK",
    },
    {
        label: "Rumah Sakit",
        value: "RUMAH_SAKIT",
    },
    {
        label: "Polisi/Militer",
        value: "POLISI_MILITER",
    },
    {
        label: "Perbankan",
        value: "PERBANKAN",
    },
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
export const DELIVERY_OPTION_ITEMS = [
    { label: "Semua", value: "ALL" },
    { label: "Kirim ke Alamat", value: "DELIVERY" },
    { label: "Ambil di Tempat", value: "PICKUP" },
];
export const DELIVERY_OPTION_LABELS : any = {
    ALL: "Semua",
    DELIVERY: "Kirim ke Alamat",
    PICKUP: "Ambil di Tempat",
};

export const PAYMENT_METHOD_ITEMS = [
    {
        label: "Semua",
        value: "ALL",
    },
    {
        label: "Transfer Bank",
        value: "BANK_TRANSFER",
    },
    {
        label: "Tunai",
        value: "CASH",
    },
    {
        label: "Credit Card",
        value: "CREDIT_CARD",
    },
    {
        label: "Qris",
        value: "QRIS",
    },
    {
        label: "E-Wallet",
        value: "EWALLET",
    },
    {
        label: "Cstore",
        value: "CSTORE",
    },
    {
        label: "COD",
        value: "COD",
    },
];
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
export const PAYMENT_STATUS_ITEMS = [
    { label: "Semua", value: "ALL" },
    { label: "Lunas", value: "PAID" },
    { label: "Pending", value: "PENDING" },
    { label: "Belum Lunas", value: "UNPAID" },
    { label: "Batal", value: "CANCELED" },
    { label: "Expired", value: "EXPIRED" },
    { label: "Refund", value: "REFUNDED" },
    { label: "Ditolak", value: "DENIED" },
];
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
export const ORDER_STATUS_ITEMS = [
    { label: "Semua", value: "ALL" },
    { label: "Diproses", value: "IN_PROCESS" },
    { label: "Pengiriman", value: "DELIVERY" },
    { label: "Batal", value: "CANCELED" },
    { label: "Selesai", value: "COMPLETED" },
];
export const ORDER_STATUS_LABELS: any = {
    ALL: "Semua",
    IN_PROCESS: "Diproses",
    DELIVERY: "Pengiriman",
    CANCELED: "Batal",
    COMPLETED: "Selesai",
};

// Type Stock Report
export const TYPE_STOCK_REPORT_ITEMS = [
    { label: "General", value: "summary" },
    { label: "Stok Masuk", value: "stock_in" },
    { label: "Stok Keluar", value: "stock_out" },
];
export const TYPE_STOCK_REPORT_LABELS: any = {
    summary: "General",
    stock_in: "Stok Masuk",
    stock_out: "Stok Keluar",
};

export const SOURCE_LABELS: any = {
    MYREKAP: "MyRekap",
    MYFLOWER: "MyFlower",
};
