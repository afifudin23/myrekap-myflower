export function backgorundCardColor(paymentStatus: string) {
    if (paymentStatus === "Lunas") {
        return "bg-[#DEF092]";
    } else if (paymentStatus === "Belum Lunas") {
        return "bg-[#EAC196]";
    } else if (paymentStatus === "Batal") {
        return "bg-[#E68DB2]";
    }
}

export function badgeColorPaymentStatus(paymentStatus: string) {
    if (paymentStatus === "Lunas") {
        return "bg-[#13D51B]";
    } else if (paymentStatus === "Belum Lunas") {
        return "bg-[#F9A825]";
    } else if (paymentStatus === "Batal") {
        return "bg-[#F75151]";
    }
}

export function badgeColorOrderStatus(orderStatus: string) {
    if (orderStatus === "Terkirim") {
        return "bg-[#24CAFF]";
    } else if (orderStatus === "In Process") {
        return "bg-[#707070]";
    } else if (orderStatus === "Dibatalkan") {
        return "bg-[#984141]";
    }
}
