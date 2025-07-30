export function bgColorOrderCard(paymentStatus: string) {
    switch (paymentStatus) {
        case "PAID":
            return "bg-[#DEF092]";

        case "PENDING":
            return "bg-[#bfc6ce]";

        case "UNPAID":
            return "bg-[#EAC196]";

        case "CANCELED":
        case "EXPIRED":
        case "FAILED":
        case "REFUNDED":
            return "bg-[#E68DB2]";
    }
}

export function badgeColorPaymentStatus(paymentStatus: string) {
    switch (paymentStatus) {
        case "PAID":
            return "bg-[#13D51B]";

        case "PENDING":
            return "bg-[#6fa2a2]";

        case "UNPAID":
            return "bg-[#F9A825]";

        case "CANCELED":
        case "EXPIRED":
        case "FAILED":
        case "REFUNDED":
            return "bg-[#F75151]";
    }
}

export function badgeColorOrderStatus(orderStatus: string) {
    switch (orderStatus) {
        case "COMPLETED":
            return "bg-[#24CAFF]";
            
        case "DELIVERY":
            return "bg-[#24315c]";

        case "IN_PROCESS":
            return "bg-[#707070]";

        case "CANCELED":
            return "bg-[#984141]";
    }
}

export function badgeColorUser(role: "SUPERADMIN" | "ADMIN" | "CUSTOMER") {
    switch (role) {
        case "SUPERADMIN":
            return "text-yellow-700 bg-yellow-200";

        case "ADMIN":
            return "text-blue-600 bg-blue-100";

        case "CUSTOMER":
            return "text-purple-600 bg-purple-200";
    }
}
