import { DELIVERY_OPTION_ITEMS, DELIVERY_OPTION_LABELS, PAYMENT_METHOD_ITEMS, PAYMENT_METHOD_LABELS } from "@/constants/category";

export const ORDER_FORM_ITEMS = [
    {
        label: "Opsi Pengiriman",
        type: "dropdown",
        name: "deliveryOption",
        options: DELIVERY_OPTION_ITEMS,
        optionLabel: DELIVERY_OPTION_LABELS,
    },
    {
        label: "Alamat Pengiriman",
        type: "text",
        name: "deliveryAddress",
    },
    {
        label: "Tanggal Produk Jadi",
        type: "date",
        name: "readyDate",
    },
    {
        label: "Metode Pembayaran",
        type: "dropdown",
        name: "paymentMethod",
        options: PAYMENT_METHOD_ITEMS,
        optionLabel: PAYMENT_METHOD_LABELS,
    },
];
