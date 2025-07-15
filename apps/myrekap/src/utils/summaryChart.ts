export function daysInMonth(monthYear: Date) {
    const year = monthYear.getFullYear();
    const month = monthYear.getMonth() + 1; // getMonth() 0-11, jadi +1

    return new Date(year, month, 0).getDate();
}

export function getSummaryPerDay(orders: any[]) {
    const salesPerDay = Array(31).fill(0); // index 0 = tgl 1
    const revenuePerDay = Array(31).fill(0);

    orders.forEach((order) => {
        const totalQuantity = order.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
        const date = new Date(order.orderDate);
        const day = date.getDate(); // tanggal 1–31

        // index array mulai dari 0
        const index = day - 1;

        salesPerDay[index] += totalQuantity;
        revenuePerDay[index] += order.totalPrice * order.quantity + order.shippingCost;
    });

    return { salesPerDay, revenuePerDay };
}
