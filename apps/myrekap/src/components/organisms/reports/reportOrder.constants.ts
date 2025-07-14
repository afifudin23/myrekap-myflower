import {
    CUSTOMER_CATEGORY_ITEMS,
    ORDER_STATUS_ITEMS,
    PAYMENT_METHOD_ITEMS,
    PAYMENT_STATUS_ITEMS,
} from "@/constants/category";

export const REPORT_ORDER_FORM_ITEMS = [
    {
        label: "Kategori Customer",
        name: "customerCategory",
        options: CUSTOMER_CATEGORY_ITEMS,
    },
    {
        label: "Metode Pembayaran",
        name: "paymentMethod",
        options: PAYMENT_METHOD_ITEMS,
    },
    {
        label: "Status Pembayaran",
        name: "paymentStatus",
        options: PAYMENT_STATUS_ITEMS,
    },
    {
        label: "Status Pesanan",
        name: "orderStatus",
        options: ORDER_STATUS_ITEMS,
    },
];

export const defaultValueCetakRekap = {
    flowerCategory: "Semua",
    customerCategory: "Semua",
    paymentMethod: "Semua",
    paymentStatus: "Semua",
    orderStatus: "Semua",
};
