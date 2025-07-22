import argon2 from "argon2";
import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, InternalException, NotFoundException, UnauthorizedException } from "@/exceptions";

export const findAllAdmins = async () => {
    const user = await prisma.user.findMany({ where: { role: { in: ["ADMIN", "SUPERADMIN"] } } });
    // supaya password tidak di tampilkan
    const data = user.map(({ password, ...data }) => data);
    return data;
};
export const findAllCustomers = async () => {
    const user = await prisma.user.findMany({ where: { role: "CUSTOMER" } });
    // supaya password tidak di tampilkan
    const data = user.map(({ password, ...data }) => data);
    return data;
};

export const findById = async (id: string) => {
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

export const create = async (requestBody: any) => {
    const { fullName, username, email, phoneNumber, password, confPassword, role = "ADMIN" } = requestBody;

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
    const users = await findAllAdmins();

    // check if the first user is a superadmin
    if (users.length === 0) {
        if (role !== "SUPERADMIN") {
            throw new BadRequestException("First user must be a superadmin", ErrorCode.FIRST_USER_MUST_BE_SUPERADMIN);
        }
    }

    const hashPassword = await argon2.hash(password);
    const user = await prisma.user.create({
        data: {
            fullName,
            username,
            email,
            phoneNumber,
            password: hashPassword,
            role,
        },
    });
    const { password: remove, ...data } = user;
    return data;
};

export const updateProfile = async (userId: string, body: any) => {
    // validation user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);

    // check if update profile with change password
    const { oldPassword, newPassword, confPassword, ...bodyWithoutPassword } = body;
    if (oldPassword || newPassword || confPassword) {
        // check if the password is correct
        const isPasswordValid = await argon2.verify(user.password, oldPassword);
        if (!isPasswordValid) throw new UnauthorizedException("Invalid Password", ErrorCode.INVALID_PASSWORD);

        const hashPassword = await argon2.hash(newPassword);
        try {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    fullName: body.fullName,
                    username: body.username,
                    email: body.email,
                    phoneNumber: body.phoneNumber,
                    password: hashPassword,
                },
            });
            const { password: remove, ...data } = updatedUser;
            return data;
        } catch (error) {
            throw new InternalException("Update profile failed", ErrorCode.INTERNAL_EXCEPTION, error);
        }
    }

    try {
        const data = await prisma.user.update({
            where: { id: userId },
            data: bodyWithoutPassword,
        });
        return data;
    } catch (error) {
        throw new InternalException("Update profile failed", ErrorCode.INTERNAL_EXCEPTION, error);
    }
};

export const update = async (id: string, requestBody: any) => {
    const { fullName, username, email, phoneNumber, password, confPassword } = requestBody;
    console.log(requestBody);

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
    if (password || confPassword) {
        if (password !== confPassword) {
            throw new BadRequestException("Password confirmation does not match", ErrorCode.PASSWORD_MISMATCH);
        }
        const hashPassword = await argon2.hash(password);
        requestBody.password = hashPassword;
        requestBody.confPassword = undefined;
        const user = await prisma.user.update({
            where: { id },
            data: requestBody,
        });
        const { password: remove, ...data } = user;
        return data;
    }
    const user = await prisma.user.update({
        where: { id },
        data: {
            fullName,
            username,
            email,
            phoneNumber,
        },
    });
    return user;
};

export const remove = async (id: string) => {
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
