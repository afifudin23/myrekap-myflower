export const generateInvoiceNumber = () => {
    const now = new Date();

    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const HH = String(now.getHours()).padStart(2, "0");
    const MM = String(now.getMinutes()).padStart(2, "0");
    const SS = String(now.getSeconds()).padStart(2, "0");

    return `INV-${yy}${mm}${dd}-${HH}${MM}${SS}`;
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
