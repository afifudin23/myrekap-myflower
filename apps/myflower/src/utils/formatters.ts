export const isoDateToStringDateTime = (isoDate: any) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export const formatCapital = (data: string = "") => {
    if (data === "POLISI_MILITER") {
        return data
            .toLowerCase() // change to lowercase
            .replace(/_/g, " ") // change underscore to space
            .replace(/\b\w/g, (char) => char.toUpperCase()); // cpitalize each word
    }
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

export const formatCustomerNameReceipt = (data: string) => {
    const words = data.trim().split(/\s+/);
    const first = words.slice(0, 2).join(" ");
    const twoInitial = words.length > 2 ? words[2].charAt(0).toUpperCase() + "." : "";
    return twoInitial ? `${first} ${twoInitial}` : first;
};

export const generatedTextLink = (order: any) => {
    return encodeURIComponent(`💐 Halo Mas Afif, Ada Pesanan Baru! 📦
Nama: ${formatCapital(order.customerName)}
Total: ${formatRupiah(order.totalPrice + order.shippingCost)}
Opsi Pengiriman: ${formatCapital(order.deliveryOption)}
Alamat: ${order.deliveryAddress ? formatCapital(order.deliveryAddress) : "-"}
Deadline: ${isoDateToStringDateTime(order.readyDate)} WIB
Items:
${order.items
    .map((item: any, index: number) => `${index + 1}. ${formatCapital(item.product?.name)} x${item.quantity}`)
    .join("\n")}
`);
};
