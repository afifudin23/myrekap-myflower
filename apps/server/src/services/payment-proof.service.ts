import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { NotFoundException } from "@/exceptions";
import cloudinary from "@/utils/cloudinary.util";

export const deletePaymentProofByOrderSummaryId = async (orderSummaryId: string) => {
    try {
        const paymentProof = await prisma.paymentProof.findUnique({ where: { orderSummaryId } });
        if (paymentProof) {
            const data = await prisma.paymentProof.delete({ where: { orderSummaryId } });
            cloudinary.uploader.destroy(data.publicId);
            return data;
        }
        return true;
    } catch (_error) {
        throw new NotFoundException("Order summary not found", ErrorCode.ORDER_SUMMARY_NOT_FOUND);
    }
};
