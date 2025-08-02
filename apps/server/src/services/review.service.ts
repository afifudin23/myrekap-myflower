import { prisma } from "@/config";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@/exceptions";

export const findAll = async (productId: string) => {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);

    return await prisma.review.findMany({ where: { productId }, include: { user: true } });
};

export const create = async (productId: string, userId: string, data: any) => {
    // check if product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);

    // check if review already exists
    const existingReview = await prisma.review.findUnique({ where: { userId_productId: { userId, productId } } });
    if (existingReview)
        throw new BadRequestException("Review already exists for this product", ErrorCode.REVIEW_ALREADY_EXISTS);

    // create review
    return await prisma.review.create({ data: { productId, userId, ...data }, include: { user: true } });
};

export const update = async (reviewId: string, userId: string, productId: string, data: any) => {
    // check if product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);

    // check if review exists
    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException("Review product not found", ErrorCode.REVIEW_PRODUCT_NOT_FOUND);

    // check if user is the owner of the review
    if (review.userId !== userId) throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);

    return await prisma.review.update({ where: { id: reviewId , userId }, data, include: { user: true } });
};

export const remove = async (reviewId: string, userId: string, productId: string) => {
    // check if product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);

    // check if review exists
    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException("Review product not found", ErrorCode.REVIEW_PRODUCT_NOT_FOUND);

    // check if user is the owner of the review
    if (review.userId !== userId) throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);

    await prisma.review.delete({ where: { id: reviewId, userId }, include: { user: true } });
};
