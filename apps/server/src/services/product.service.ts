import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, InternalException, NotFoundException } from "@/exceptions";
import { productSchema } from "@/schemas";
import { cloudinary, uploadFile } from "@/config";

type UploadResultsType = {
    fileName: string;
    size: number;
    secureUrl: string;
    publicId: string;
}[];

export const create = async (body: productSchema.CreateProductType, files: Express.Multer.File[]) => {
    const duplicateName = await prisma.product.findUnique({ where: { name: body.name } });
    if (duplicateName) {
        throw new BadRequestException("Product name already exists", ErrorCode.PRODUCT_NAME_DUPLICATE);
    }
    let uploadResults: UploadResultsType = [];
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
                await cloudinary.uploader.destroy(result.publicId).catch((error) => {
                    console.error("❌ Failed to delete image:", result.publicId, error);
                });
            })
        );
        throw new InternalException("Failed to create product", ErrorCode.PRODUCT_CREATE_FAILED, error);
    }
};

export const findAll = async () => {
    return await prisma.product.findMany({ include: { images: true } });
};
export const findById = async (id: string) => {
    try {
        return await prisma.product.findUniqueOrThrow({ where: { id }, include: { images: true } });
    } catch (_error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
    }
};
export const update = async (id: string, body: productSchema.UpdateProductType, files: Express.Multer.File[]) => {
    if (body.name) {
        const duplicateName = await prisma.product.findFirst({ where: { name: body.name, NOT: { id } } });
        if (duplicateName) {
            throw new BadRequestException("Product name already exists", ErrorCode.PRODUCT_NAME_DUPLICATE);
        }
    }
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);

    // Check if product isActive changed to false then delete all cart items
    if (existingProduct.isActive !== body.isActive && body.isActive === false) {
        await prisma.cartItem.deleteMany({ where: { productId: id } });
    }

    let uploadResults: UploadResultsType = [];
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
                    await cloudinary.uploader.destroy(publicId).catch((error) => {
                        console.error("❌ Failed to delete image:", publicId, error);
                    });
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
                await cloudinary.uploader.destroy(result.publicId).catch((error) => {
                    console.error("❌ Failed to delete image:", result.publicId, error);
                });
            })
        );
        throw new InternalException("Failed to update product", ErrorCode.PRODUCT_UPDATE_FAILED, error);
    }
};
export const remove = async (id: string) => {
    try {
        const existingProduct = await prisma.product.findUniqueOrThrow({ where: { id }, include: { images: true } });
        await Promise.all(
            existingProduct.images.map(async (image) => {
                await cloudinary.uploader.destroy(image.publicId).catch((error) => {
                    console.error("❌ Failed to delete image:", image.publicId, error);
                });
            })
        );
        return await prisma.product.delete({ where: { id }, include: { images: true } });
    } catch (_error) {
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
    }
};
