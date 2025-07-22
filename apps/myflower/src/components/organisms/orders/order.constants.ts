export const ORDER_FORM_ITEMS = [
    {
        label: "Opsi Pengiriman",
        type: "dropdown",
        name: "deliveryOption",
        options: ["Delivery", "Pickup"],
    },
    {
        label: "Alamat Pengiriman",
        type: "text",
        name: "deliveryAddress",
    },
    {
        label: "Tanggal Siap",
        type: "date",
        name: "readyDate",
    },
    {
        label: "Metode Pembayaran",
        type: "dropdown",
        name: "paymentMethod",
        options: ["COD", "Others"],
    },
];
