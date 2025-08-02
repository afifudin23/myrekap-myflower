import { TYPE_STOCK_REPORT_ITEMS, TYPE_STOCK_REPORT_LABELS } from "@/constants/category";

export const PRODUCT_FORM_ITEMS = [
    {
        label: "Nama Produk",
        type: "text",
        name: "name",
    },
    {
        label: "Harga",
        type: "money",
        name: "price",
    },
    {
        label: "Deskripsi Produk",
        type: "text",
        name: "description",
    },
    {
        label: "Gambar Produk",
        type: "file",
        name: "images",
    },
];

export const PRODUCT_STOCK_FORM_FIELDS = [
    {
        label: "Nama Produk",
        type: "text",
        name: "name",
        disabled: true,
    },
    {
        label: "Tipe Perubahan Stok",
        type: "dropdown",
        name: "type",
        options: TYPE_STOCK_REPORT_ITEMS.filter((item) => item.label !== "General"),
        optionLabel: TYPE_STOCK_REPORT_LABELS,
    },
    {
        label: "Jumlah Stok",
        type: "text",
        name: "quantity",
    },
    {
        label: "Note",
        type: "text",
        name: "note",
    },
];
