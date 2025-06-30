import argon2 from "argon2";
import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, NotFoundException } from "@/exceptions";

export const getAllUsers = async () => {
    const user = await prisma.user.findMany();
    // supaya password tidak di tampilkan
    const data = user.map(({ password, ...data }) => data);
    return data;
};

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id,
            },
        });
        const { password, ...data } = user;
        return data;
    } catch (_error) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }
};

export const createUser = async (requestBody: any) => {
    const { username, email, password, confPassword, role } = requestBody;

    if (password !== confPassword) {
        throw new BadRequestException("Password confirmation does not match", ErrorCode.PASSWORD_MISMATCH);
    }
    // check if the username or email is already taken
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    username,
                },
                {
                    email,
                },
            ],
        },
        select: {
            id: true,
        },
    });
    if (existingUser) {
        throw new BadRequestException("The username or email is already taken", ErrorCode.USER_ALREADY_EXISTS);
    }
    const users = await getAllUsers();

    // check if the first user is a superadmin
    if (users.length === 0) {
        if (role !== "SUPERADMIN") {
            throw new BadRequestException("First user must be a superadmin", ErrorCode.FIRST_USER_MUST_BE_SUPERADMIN);
        }
    }

    const hashPin = await argon2.hash(password);
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashPin,
            role,
        },
    });
    const { password: _remove, ...data } = user;
    return data;
};

export const updateUser = async (id: string, requestBody: any) => {
    const { username, email, password, confPassword } = requestBody;

    // check if the user exists
    const findUser = await prisma.user.findUnique({ where: { id } });
    if (!findUser) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    // check if the username or email is already taken
    const existingUser = await prisma.user.findFirst({
        where: {
            AND: { OR: [{ username }, { email }], NOT: { id } },
        },
        select: {
            id: true,
        },
    });
    if (existingUser) {
        throw new BadRequestException("The username or email is already taken", ErrorCode.USER_ALREADY_EXISTS);
    }
    if (password) {
        if (password !== confPassword) {
            throw new BadRequestException("Password confirmation does not match", ErrorCode.PASSWORD_MISMATCH);
        }
        const hashPin = await argon2.hash(password);
        requestBody.password = hashPin;
        requestBody.confPassword = undefined;
    }
    const user = await prisma.user.update({
        where: { id },
        data: requestBody,
    });
    const { password: _remove, ...data } = user;
    return data;
};

export const deleteUser = async (id: string) => {
    // check if the user exists
    const findUser = await prisma.user.findFirst({
        where: {
            id,
        },
    });
    if (!findUser) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });
    const { password, ...data } = user;
    return data;
};
