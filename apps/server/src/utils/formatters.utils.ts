import crypto from "crypto";

export function generateOrderCode(): string {
    const randomPrefix = crypto.randomBytes(1).toString("hex").toUpperCase(); // 2 chars
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase();

    return `ORD-${randomPrefix}${timestamp}-${randomSuffix}`;
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

    return { paymentMethod: paymentMethod.toUpperCase(), paymentProvider };
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

export const formatRupiah = (data: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(data);
};

export const generatedTextLink = (
    customerName: string,
    flowerCategory: string,
    total: number,
    deliveryAddress: string,
    deliveryDate: string
) => {
    return encodeURIComponent(`💐 Halo Mas Afif, Ada Pesanan Baru! 📦
Nama: ${formatCapital(customerName)}
Kategori Bunga: ${formatCapital(flowerCategory)}
Total: ${formatRupiah(total)}
Alamat: ${formatCapital(deliveryAddress)}
Dikirim: ${isoDateToStringDateTime(deliveryDate)} WIB`);
};
