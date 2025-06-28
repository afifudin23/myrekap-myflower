import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { InternalException, NotFoundException } from "@/exceptions";
import { CreateProductType } from "@/schemas/product.schema";
import cloudinary, { uploadFile } from "@/utils/cloudinary.util";

type UploadResultsType = {
    fileName: string;
    size: number;
    secureUrl: string;
    publicId: string;
};

export const create = async (body: CreateProductType, files: Express.Multer.File[]) => {
    let uploadResults: UploadResultsType[] = [];
    try {
        uploadResults = await Promise.all(
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

        return await prisma.product.create({
            data: {
                ...body,
                images: { create: uploadResults.map((result) => result) },
            },
            include: {
                images: true,
            },
        });
    } catch (error) {
        // Rollback upload images
        await Promise.all(
            uploadResults.map(async (result) => {
                try {
                    await cloudinary.uploader.destroy(result.publicId);
                } catch (error) {
                    console.error("❌ Failed to delete image:", result.publicId, error);
                }
            })
        );
        throw new InternalException("Failed to create product", ErrorCode.PRODUCT_CREATE_FAILED, error);
    }
};

export const findAll = async () => {
    return await prisma.product.findMany({ include: { images: true } });
};
export const findById = async (id: string) => {
    return await prisma.product.findUnique({ where: { id }, include: { images: true } });
};
export const update = async (id: string, body: any, files: Express.Multer.File[]) => {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);

    let uploadResults: UploadResultsType[] = [];
    try {
        // Upload new files
        if (files && files.length > 0) {
            uploadResults = await Promise.all(
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
        }
        
        // Delete old files
        if (body.publicIdsToDelete) {
            await Promise.all(
                body.publicIdsToDelete.map(async (publicId: string) => {
                    try {
                        await cloudinary.uploader.destroy(publicId);
                    } catch (error) {
                        console.error("❌ Failed to delete image:", publicId, error);
                    }
                })
            );
            await prisma.productImage.deleteMany({ where: { publicId: { in: body.publicIdsToDelete } } });
        }
        
        // Update product
        const { publicIdsToDelete, ...cleanBody } = body;
        return await prisma.product.update({
            where: { id },
            data: {
                ...cleanBody,
                images: { create: uploadResults.map((result) => result) },
            },
            include: { images: true },
        });
    } catch (error) {
        // Rollback upload images
        await Promise.all(
            uploadResults.map(async (result) => {
                try {
                    await cloudinary.uploader.destroy(result.publicId);
                } catch (error) {
                    console.error("❌ Failed to delete image:", result.publicId, error);
                }
            })
        );
        throw new InternalException("Failed to update product", ErrorCode.PRODUCT_UPDATE_FAILED, error);
    }
};
export const remove = async (id: string) => {
    return await prisma.product.delete({ where: { id } });
};
