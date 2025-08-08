import argon2 from "argon2";
import prisma from "../config/database";
import ErrorCode from "../constants/error-code";
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException } from "../exceptions";
import * as jwt from "jsonwebtoken";
import { env } from "../config";
import { mailerService } from "../services";

export const loginUser = async (body: any) => {
    // check if the user exists
    const user = await prisma.user.findUnique({
        where: { username: body.username },
    });
    if (!user) throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);

    // check if the password is correct
    const isPasswordValid = await argon2.verify(user.password, body.password);
    if (!isPasswordValid) throw new UnauthorizedException("Invalid Password", ErrorCode.INVALID_PASSWORD);

    // check if the email is verified
    if (!user.isVerified) {
        await mailerService.sendVerificationEmail(user);

        throw new ForbiddenException(
            "Account not verified. We have resent the verification link to your email.",
            ErrorCode.EMAIL_NOT_VERIFIED
        );
    }

    // generate token
    const { password, ...data } = user;
    const token = jwt.sign({ id: user.id }, env.JWT_SECRET);
    return { data, token };
};

export const registerCustomer = async (body: any) => {
    // check if the username or email is already taken
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ username: body.username }, { email: body.email }] },
        select: { id: true },
    });
    if (existingUser)
        throw new BadRequestException("The username or email is already taken", ErrorCode.USER_ALREADY_EXISTS);

    // hash password and create user
    delete body.confPassword;
    const hashPassword = await argon2.hash(body.password);
    const user = await prisma.user.create({
        data: {
            ...body,
            password: hashPassword,
            role: "CUSTOMER",
        },
    });

    // generate token and send verification email
    await mailerService.sendVerificationEmail(user);
};

export const resendVerificationEmail = async (email: string) => {
    // check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);

    // check if the email is already verified
    if (user.isVerified) throw new BadRequestException("Email already verified", ErrorCode.EMAIL_ALREADY_VERIFIED);

    // generate token and send verification email
    await mailerService.sendVerificationEmail(user);
};

export const verifyEmail = async (token: string) => {
    // check if the token is valid
    const userToken = await prisma.userToken.findFirst({
        where: { token, type: "VERIFY_EMAIL", isUsed: false, expiresAt: { gt: new Date() } },
    });
    if (!userToken) throw new BadRequestException("Invalid token", ErrorCode.INVALID_TOKEN);

    // check if the email is already verified
    const user = await prisma.user.findUnique({ where: { id: userToken.userId } });
    if (!user) throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    if (user.isVerified) throw new BadRequestException("Email already verified", ErrorCode.EMAIL_ALREADY_VERIFIED);

    // update user and delete token
    await prisma.$transaction([
        prisma.user.update({ where: { id: userToken.userId }, data: { isVerified: true } }),
        prisma.userToken.deleteMany({ where: { userId: userToken.userId, type: "VERIFY_EMAIL" } }),
    ]);
};

export const forgotPassword = async (email: string) => {
    // check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);

    // generate token and send reset password email
    await mailerService.sendResetPasswordEmail(user);
};

export const resetPassword = async (token: string, password: string) => {
    // check if the token is valid
    const userToken = await prisma.userToken.findFirst({
        where: { token, type: "RESET_PASSWORD", isUsed: false, expiresAt: { gt: new Date() } },
    });
    if (!userToken) throw new BadRequestException("Invalid token", ErrorCode.INVALID_TOKEN);

    // hash password, update user and delete token
    const hashPassword = await argon2.hash(password);
    await prisma.$transaction([
        prisma.user.update({ where: { id: userToken.userId }, data: { password: hashPassword } }),
        prisma.userToken.deleteMany({ where: { userId: userToken.userId, type: "RESET_PASSWORD" } }),
    ]);
};
