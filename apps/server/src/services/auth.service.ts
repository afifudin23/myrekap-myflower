import argon2 from "argon2";
import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@/exceptions";
import * as jwt from "jsonwebtoken";
import env from "@/config/env";

export const loginUser = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (!user) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid Password", ErrorCode.INVALID_PASSWORD);
    }
    const data = { username: user.username, role: user.role };
    const token = jwt.sign({ id: user.id }, env.JWT_SECRET);
    return { data, token };
};

export const registerCustomer = async (requestBody: any) => {
    const { fullName, username, email, phoneNumber, password, confPassword, role = "CUSTOMER" } = requestBody;

    if (password !== confPassword) {
        throw new BadRequestException("Password confirmation does not match", ErrorCode.PASSWORD_MISMATCH);
    }
    // check if the username or email is already taken
    const existingUser = await prisma.user.findFirst({
        where: { OR: [{ username }, { email }] },
        select: { id: true },
    });
    if (existingUser) {
        throw new BadRequestException("The username or email is already taken", ErrorCode.USER_ALREADY_EXISTS);
    }

    const hashPin = await argon2.hash(password);
    const user = await prisma.user.create({
        data: {
            fullName,
            username,
            email,
            phoneNumber,
            password: hashPin,
            role,
        },
    });
    const { password: _remove, ...data } = user;
    return data;
};