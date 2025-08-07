import formatters from "@/utils/formatters";

export const filterSearch = (
    {
        orderCode,
        customerName,
        totalPrice,
        deliveryAddress,
    }: { orderCode: string; customerName: string; totalPrice: number; deliveryAddress: string },
    searchTerm: string
) => {
    const keyword = searchTerm.toLowerCase();
    return (
        orderCode.toLowerCase().includes(keyword) ||
        customerName.toLowerCase().includes(keyword) ||
        totalPrice.toString().toLowerCase().includes(keyword) ||
        deliveryAddress?.toLowerCase().includes(keyword)
    );
};

export const filterCustomerCategory = ({ customerCategory }: { customerCategory: string }, customer: string) =>
    customer === "Customer" || customerCategory === formatters.parseCapital(customer);

export const filterFlowerCategory = ({ flowerCategory }: { flowerCategory: string }, flower: string) =>
    flower === "Bunga" || flowerCategory === formatters.parseCapital(flower);

export const filterPaymentStatus = ({ paymentStatus }: { paymentStatus: string }, payment: string) =>
    payment === "Pembayaran" || paymentStatus === formatters.parseCapital(payment);
export const filterOrderStatus = ({ orderStatus }: { orderStatus: string }, order: string) =>
    order === "Pesanan" || orderStatus === formatters.parseCapital(order);
