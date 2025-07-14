export function bgColorOrderCard(paymentStatus: string) {
    console.log(paymentStatus)
    if (paymentStatus === "PAID") {
        return "bg-[#DEF092]";
    } else if (paymentStatus === "UNPAID") {
        return "bg-[#EAC196]";
    } else if (paymentStatus === "CANCELED") {
        return "bg-[#E68DB2]";
    }
}

export function badgeColorPaymentStatus(paymentStatus: string) {
    if (paymentStatus === "PAID") {
        return "bg-[#13D51B]";
    } else if (paymentStatus === "UNPAID") {
        return "bg-[#F9A825]";
    } else if (paymentStatus === "CANCELED") {
        return "bg-[#F75151]";
    }
}

export function badgeColorOrderStatus(orderStatus: string) {
    if (orderStatus === "COMPLETED") {
        return "bg-[#24CAFF]";
    } else if (orderStatus === "IN_PROCESS") {
        return "bg-[#707070]";
    } else if (orderStatus === "CANCELED") {
        return "bg-[#984141]";
    }
}
