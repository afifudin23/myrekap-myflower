import argon2 from "argon2";
import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { NotFoundException, UnauthorizedException } from "@/exceptions";
import * as jwt from "jsonwebtoken";
import env from "@/config/env";

const authService = {
    async loginUser(username: string, password: string) {
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
        const token = jwt.sign({ id: user.id }, env.JWT_TOKEN);
        return { data ,token };
    },
};

export default authService;
