export type UserType = {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};
export type OrderSummaryType = {
    id: string;
    invoiceNumber: string;
    customerName: string;
    flowerCategory: string;
    quantity: number;
    greetingMessage: string;
    deliveryDate: string;
    orderDate: string;
    deliveryAddress: string;
    customerCategory: string;
    price: number;
    shippingCost: number;
    isPaid: boolean;
    paymentMethod: string;
    paymentProof: any;
    paymentStatus: string;
    previousPaymentStatus: string | null;
    orderStatus: string;
    finishedProduct: any;
};
