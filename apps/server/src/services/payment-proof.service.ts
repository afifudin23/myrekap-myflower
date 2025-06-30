import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { NotFoundException } from "@/exceptions";
import { cloudinary } from "@/utils";

export const deletePaymentProofByOrderSummaryId = async (orderId: string) => {
    try {
        const paymentProof = await prisma.paymentProof.findUnique({ where: { orderId } });
        if (paymentProof) {
            const data = await prisma.paymentProof.delete({ where: { orderId } });
            cloudinary.uploader.destroy(data.publicId);
            return data;
        }
        return true;
    } catch (_error) {
        throw new NotFoundException("Order summary not found", ErrorCode.ORDER_SUMMARY_NOT_FOUND);
    }
};
