import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, InternalException } from "@/exceptions";
import { cloudinary, uploadFile } from "@/utils";

export const addFinishedProduct = async (orderId: string, finishedProduct: any) => {
    try {
        const existingFinishedProduct = await prisma.finishedProduct.findUnique({ where: { orderId } });

        if (existingFinishedProduct) {
            await prisma.finishedProduct.delete({ where: { orderId } });
            await cloudinary.uploader.destroy(existingFinishedProduct.publicId);
        }
        if (!finishedProduct) {
            throw new BadRequestException("Finished product not found", ErrorCode.FINISHED_PRODUCT_NOT_FOUND);
        }
        const result = await uploadFile(finishedProduct, "myrekap-app/produk-selesai");
        const data = await prisma.finishedProduct.create({
            data: {
                fileName: finishedProduct.originalname,
                size: finishedProduct.size,
                orderId,
                secureUrl: result.secure_url,
                publicId: result.public_id,
            },
        });
        return data;
    } catch (error) {
        throw new InternalException("Failed to add finished product", ErrorCode.FINISHED_PRODUCT_ADD_FAILED, error);
    }
};
