const formatters = {
    // parse = frontend -> backend
    // format = backend -> frontend

    formatCapital(data: string) {
        return data
            .toLowerCase() // change to lowercase
            .replace(/_/g, " ") // change underscore to space
            .replace(/\b\w/g, (char) => char.toUpperCase()); // cpitalize each word
    },
    formatCustomerNameReceipt(data: string) {
        const words = data.trim().split(/\s+/);
        const first = words.slice(0, 2).join(" ");
        const twoInitial = words.length > 2 ? words[2].charAt(0).toUpperCase() + "." : "";
        return twoInitial ? `${first} ${twoInitial}` : first;
    },
    parseCapital(data: string) {
        return data.toUpperCase().replace(/[ /-]/g, "_"); // Replace spaces and slashes with underscores
    },
    formatRupiah: (data: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(data);
    },

    isoDateToStringDateTime: (isoDate: any) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    },
    // stringToDate: (dateString: string) => {
    //     const [datePart, timePart] = dateString.split(" ");
    //     const [day, month, year] = datePart.split("-").map(Number);
    //     const [hour, minute] = timePart.split(":").map(Number);

    //     return new Date(year, month - 1, day, hour, minute);
    // },
    dateToString: (isoDate: any) => {
        const date = new Date(isoDate);
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        return date.toLocaleString("en-GB", options).replace(",", " at");
    },
    
    isoDateToStringDate: (isoDate: any) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    },
    simplyfyEmail: (email: string) => {
        const [username, domain] = email.split("@");
        const shortUsername = username.length > 6 ? `${username.slice(0, 6)}***` : username;
        return `${shortUsername}@${domain}`;
    },
    formatInputOrderSummary(data: any) {
        return {
            id: data.id,
            customerName: this.formatCapital(data.customerName),
            flowerCategory: this.formatCapital(data.flowerCategory),
            quantity: Number(data.quantity),
            greetingMessage: data.greetingMessage,
            deliveryDate: new Date(data.deliveryDate),
            deliveryAddress: data.deliveryAddress,
            customerCategory: this.formatCapital(data.customerCategory),
            price: Number(data.price),
            shippingCost: Number(data.shippingCost),
            isPaid: Boolean(data.isPaid),
            paymentMethod: data.paymentMethod ? this.formatCapital(data.paymentMethod) : "Pending",
            paymentProof: data.paymentProof === "null" ? null : data.paymentProof,
        };
    },
    parseInputOrderSummary(data: any) {
        return {
            customerName: this.formatCapital(data.customerName),
            flowerCategory: this.parseCapital(data.flowerCategory),
            quantity: Number(data.quantity),
            greetingMessage: data.greetingMessage,
            deliveryDate: new Date(data.deliveryDate),
            deliveryAddress: data.deliveryAddress,
            customerCategory: this.parseCapital(data.customerCategory),
            price: Number(data.price),
            shippingCost: Number(data.shippingCost),
            isPaid: Boolean(data.isPaid),
            paymentMethod: data.paymentMethod ? this.parseCapital(data.paymentMethod) : "Pending",
            paymentProof: data.paymentProof === "null" ? null : data.paymentProof,
        };
    },

    formatDataOrderSummary(data: any) {
        return {
            id: data.id,
            orderCode: data.orderCode,
            customerName: this.formatCapital(data.customerName),
            quantity: data.quantity,
            greetingMessage: data.greetingMessage,
            deliveryDate: this.isoDateToStringDateTime(data.deliveryDate),
            deliveryAddress: data.deliveryAddress,
            customerCategory: this.formatCapital(data.customerCategory),
            price: this.formatRupiah(data.totalPrice),
            shippingCost: this.formatRupiah(data.shippingCost),
            isPaid: data.isPaid,
            paymentMethod: data.paymentMethod ? this.formatCapital(data.paymentMethod) : "Pending",
            paymentProof: data.paymentProof,
            paymentStatus: data.paymentStatus,
            previousPaymentStatus: data.previousPaymentStatus,
            orderStatus: this.formatCapital(data.orderStatus),
            orderDate: this.dateToString(data.orderDate),
            finishedProduct: data.finishedProduct,
        };
    },
    formatDataOrderSummaryForPrint(data: any) {
        return {
            id: data.id,
            invoiceNumber: data.invoiceNumber,
            customerName: this.formatCustomerNameReceipt(data.customerName),
            flowerCategory: this.formatCapital(data.flowerCategory),
            quantity: data.quantity,
            greetingMessage: data.greetingMessage,
            deliveryDate: this.isoDateToStringDate(data.deliveryDate),
            deliveryAddress: data.deliveryAddress,
            customerCategory: this.formatCapital(data.customerCategory),
            price: this.formatRupiah(data.price),
            shippingCost: this.formatRupiah(data.shippingCost),
            total: data.price + data.shippingCost,
            isPaid: data.isPaid,
            paymentMethod: data.paymentMethod ? this.formatCapital(data.paymentMethod) : "Pending",
            paymentProof: data.paymentProof,
            paymentStatus: this.formatCapital(data.paymentStatus),
            orderStatus: this.formatCapital(data.orderStatus),
            orderDate: this.isoDateToStringDate(data.orderDate),
            finishedProduct: data.finishedProduct,
        };
    },
};
export default formatters;
