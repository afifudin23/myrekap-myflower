import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, InternalException } from "@/exceptions";
import cloudinary, { uploadFile } from "@/utils/cloudinary.util";

export const addFinishedProduct = async (orderSummaryId: string, finishedProduct: any) => {
    try {
        const existingFinishedProduct = await prisma.finishedProduct.findUnique({ where: { orderSummaryId } });

        if (existingFinishedProduct) {
            await prisma.finishedProduct.delete({ where: { orderSummaryId } });
            cloudinary.uploader.destroy(existingFinishedProduct.publicId);
        }
        if (!finishedProduct) {
            throw new BadRequestException("Finished product not found", ErrorCode.FINISHED_PRODUCT_NOT_FOUND);
        }
        const result = await uploadFile(finishedProduct, "myrekap-app/produk-selesai");
        const data = await prisma.finishedProduct.create({
            data: {
                fileName: finishedProduct.originalname,
                size: finishedProduct.size,
                orderSummaryId,
                secureUrl: result.secure_url,
                publicId: result.public_id,
            },
        });
        return data;
    } catch (error) {
        throw new InternalException("Failed to add finished product", ErrorCode.FINISHED_PRODUCT_ADD_FAILED, error);
    }
};
