import crypto from "crypto";

export function generateCode(type: "order" | "product") {
    const randomPrefix = crypto.randomBytes(1).toString("hex").toUpperCase(); // 2 chars
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase();

    switch (type) {
        case "order":
            return `ORD-${randomPrefix}${timestamp}-${randomSuffix}`;

        case "product":
            return `PRD-${randomPrefix}${timestamp}-${randomSuffix}`;
            
        default:
            throw new Error("Invalid type");
    }
}

export const generatePaymentInfo = (notification: any) => {
    let paymentMethod = notification.payment_type;
    let paymentProvider;

    switch (paymentMethod) {
        case "bank_transfer":
            if (notification.permata_va_number) {
                paymentProvider = "permata";
            } else {
                paymentProvider = notification.va_numbers[0].bank;
            }
            break;
        case "echannel":
            paymentMethod = "bank_transfer"; // Echannel is a type of bank transfer
            paymentProvider = "mandiri"; // Default to Mandiri if not specified
            break;
        case "credit_card":
            paymentProvider = notification.bank || notification.card_type || "credit";
            break;
        case "cstore":
            paymentProvider = notification.store || "cstore";
            break;
        case "qris":
            paymentProvider = notification.issuer || notification.acquirer || "qris";
            break;
        case "gopay":
        case "shopeepay":
        case "dana":
        case "linkaja":
        case "ovo":
            paymentProvider = notification.payment_type; // Use the payment type as provider
            paymentMethod = "ewallet"; // Treat these as e-wallets
            break;
    }

    return { paymentMethod: paymentMethod.toUpperCase(), paymentProvider: paymentProvider.toUpperCase() };
};

export const isoDateToStringDateTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export const formatCapital = (data: string) => {
    return data
        .toLowerCase() // change to lowercase
        .replace(/_/g, " ") // change underscore to space
        .replace(/\b\w/g, (char) => char.toUpperCase()); // cpitalize each word
};
export const parseCapital = (data: string) => {
    return data.toUpperCase().replace(/[ /-]/g, "_"); // Replace spaces and slashes with underscores
};

export const formatRupiah = (data: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(data);
};

export const generatedTextLink = (data: any) => {
    return encodeURIComponent(`💐 Halo Mas Afif, Ada Pesanan Baru! 📦
Nama: ${formatCapital(data.customerName)}
Total: ${formatRupiah(data.totalPrice + data.shippingCost)}
Opsi Pengiriman: ${formatCapital(data.deliveryOption)}
Alamat: ${data.deliveryAddress ? formatCapital(data.deliveryAddress) : "-"}
Deadline: ${isoDateToStringDateTime(data.readyDate)} WIB
Items:
${data.items
    .map((item: any, index: number) => `${index + 1}. ${formatCapital(item.product?.name)} x${item.quantity}`)
    .join("\n")}
`);
};

export const formatItemsAsList = (items: any[]) => {
    return items
        .map(
            (item, i) =>
                `${i + 1}. ${item.product.name} - Qty: ${item.quantity} - Harga: ${formatRupiah(
                    item.unitPrice
                )} - Total: ${formatRupiah(item.totalPrice)}`
        )
        .join("\n");
};

export const generateItemDetails = (orderItems: any[]) => {
    return orderItems.map((item) => ({
        id: item.productId,
        name: item.product?.name,
        price: item.unitPrice,
        quantity: item.quantity,
    }));
};

export const getAppName = (role: string) => {
    switch (role) {
        case "SUPERADMIN":
        case "ADMIN":
            return "MyRekap";
        case "CUSTOMER":
            return "MyFlower";
    }
};
