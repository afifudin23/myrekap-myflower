import argon2 from "argon2";
import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@/exceptions";
import * as jwt from "jsonwebtoken";
import { env } from "@/config";

export const loginUser = async (body: any) => {
    // check if the user exists
    const user = await prisma.user.findUnique({
        where: { username: body.username },
    });
    if (!user) throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);

    // check if the password is correct
    const isPasswordValid = await argon2.verify(user.password, body.password);
    if (!isPasswordValid) throw new UnauthorizedException("Invalid Password", ErrorCode.INVALID_PASSWORD);

    // generate token
    const { password, ...data } = user;
    const token = jwt.sign({ id: user.id }, env.JWT_SECRET);
    return { data, token };
};

export const registerCustomer = async (body: any) => {
    if (body.password !== body.confPassword) {
        throw new BadRequestException("Password confirmation does not match", ErrorCode.PASSWORD_MISMATCH);
    }
    // check if the username or email is already taken
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ username: body.username }, { email: body.email }] },
        select: { id: true },
    });
    if (existingUser) {
        throw new BadRequestException("The username or email is already taken", ErrorCode.USER_ALREADY_EXISTS);
    }

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
    const { password, ...data } = user;
    return data;
};
