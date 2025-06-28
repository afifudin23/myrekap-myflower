import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { InternalException } from "@/exceptions";
import { CreateProductType } from "@/schemas/product.schema";
import cloudinary, { uploadFile } from "@/utils/cloudinary.util";

export const create = async (body: CreateProductType, files: Express.Multer.File[]) => {
    let uploadedResults: { fileName: string; size: number; secureUrl: string; publicId: string }[] = [];
    try {
        uploadedResults = await Promise.all(
            files.map(async (file) => {
                const result = await uploadFile(file, `myflower-myrekap/produk/${body.name}`);
                return {
                    fileName: file.originalname,
                    size: file.size,
                    secureUrl: result.secure_url,
                    publicId: result.public_id,
                };
                
            })
        );
        const product = await prisma.product.create({
            data: {
                ...body,
                images: { create: uploadedResults.map((result) => result) },
            },
            include: {
                images: true,
            },
        });

        return product;
    } catch (error) {
        await Promise.all(
            uploadedResults.map(async (result) => {
                try {
                    await cloudinary.uploader.destroy(result.publicId);
                } catch (error) {
                    console.error("❌ Gagal rollback:", result.publicId, error);
                }
            })
        );
        throw new InternalException("Failed to create product", ErrorCode.PRODUCT_CREATE_FAILED, error);
    }
};

export const findAll = async () => {
    return "findAll";
};
export const findById = async (_id: string) => {
    return "findById";
};
export const update = async (_id: string, _data: any) => {
    return "update";
};
export const remove = async (_id: string) => {
    return "remove";
};
