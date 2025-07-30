import {
    CUSTOMER_CATEGORY_ITEMS,
    CUSTOMER_CATEGORY_LABELS,
    ORDER_STATUS_ITEMS,
    ORDER_STATUS_LABELS,
    PAYMENT_METHOD_ITEMS,
    PAYMENT_METHOD_LABELS,
    PAYMENT_STATUS_ITEMS,
    PAYMENT_STATUS_LABELS,
} from "@/constants/category";

export const REPORT_ORDER_FORM_ITEMS = [
    {
        label: "Kategori Customer",
        name: "customerCategory",
        options: CUSTOMER_CATEGORY_ITEMS,
        optionLabel: CUSTOMER_CATEGORY_LABELS,
    },
    {
        label: "Metode Pembayaran",
        name: "paymentMethod",
        options: PAYMENT_METHOD_ITEMS,
        optionLabel: PAYMENT_METHOD_LABELS,
    },
    {
        label: "Status Pembayaran",
        name: "paymentStatus",
        options: PAYMENT_STATUS_ITEMS,
        optionLabel: PAYMENT_STATUS_LABELS,
    },
    {
        label: "Status Pesanan",
        name: "orderStatus",
        options: ORDER_STATUS_ITEMS,
        optionLabel: ORDER_STATUS_LABELS,
    },
];

export const DEFAULT_VALUE_REPORT_ORDER = {
    fromDate: undefined,
    toDate: undefined,
    customerCategory: "ALL",
    paymentMethod: "ALL",
    paymentStatus: "ALL",
    orderStatus: "ALL",
} as const;
