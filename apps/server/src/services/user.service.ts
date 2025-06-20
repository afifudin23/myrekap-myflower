import argon2 from "argon2";
import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, NotFoundException } from "@/exceptions";

const userService = {
    async getAllUsers() {
        const user = await prisma.user.findMany();
        // supaya pin tidak di tampilkan
        const data = user.map(({ pin, ...data }) => data);
        return data;
    },
    async getUserById(id: string) {
        try {
            const user = await prisma.user.findFirstOrThrow({
                where: {
                    id,
                },
            });
            const { pin, ...data } = user;
            return data;
        } catch (_error) {
            throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
        }
    },
    async createUser(requestBody: any) {
        const { username, email, pin, confPin, role } = requestBody;

        if (pin !== confPin) {
            throw new BadRequestException("PIN confirmation does not match", ErrorCode.PIN_MISMATCH);
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
        const users = await userService.getAllUsers();

        // check if the first user is a superadmin
        if (users.length === 0) {
            if (role !== "SUPERADMIN") {
                throw new BadRequestException(
                    "First user must be a superadmin",
                    ErrorCode.FIRST_USER_MUST_BE_SUPERADMIN
                );
            }
        }

        const hashPin = await argon2.hash(pin);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                pin: hashPin,
                role,
            },
        });
        const { pin: _remove, ...data } = user;
        return data;
    },
    async updateUser(id: string, requestBody: any) {
        const { username, email, pin, confPin } = requestBody;

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
        if (pin) {
            if (pin !== confPin) {
                throw new BadRequestException("PIN confirmation does not match", ErrorCode.PIN_MISMATCH);
            }
            const hashPin = await argon2.hash(pin);
            requestBody.pin = hashPin;
            requestBody.confPin = undefined;
        }
        const user = await prisma.user.update({
            where: { id },
            data: requestBody,
        });
        const { pin: _remove, ...data } = user;
        return data;
    },

    async deleteUser(id: string) {
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
        const { pin, ...data } = user;
        return data;
    },
};

export default userService;
