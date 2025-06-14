import argon2 from "argon2";
import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { NotFoundException, UnauthorizedException } from "@/exceptions";
import * as jwt from "jsonwebtoken";
import env from "@/config/env";

const authService = {
    async loginUser(username: string, pin: string) {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!user) {
            throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
        }
        const isPinValid = await argon2.verify(user.pin, pin);
        if (!isPinValid) {
            throw new UnauthorizedException("Invalid PIN", ErrorCode.INVALID_PIN);
        }
        const data = { username: user.username, role: user.role };
        const token = jwt.sign({ id: user.id }, env.JWT_TOKEN);
        return { data ,token };
    },
};

export default authService;
