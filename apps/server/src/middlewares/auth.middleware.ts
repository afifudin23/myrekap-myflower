import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "@/exceptions";
import prisma from "@/config/database";
import env from "@/config/env";
import ErrorCode from "@/constants/error-code";

export interface AuthReq extends Request {
    user: User;
}

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const userRoleSuperadmin = await prisma.user.findMany({
        where: {
            role: "SUPERADMIN",
        },
    });
    if (userRoleSuperadmin.length === 0) {
        return next();
    }

    const token = req.cookies.token;
    if (!token) {
        return next(new UnauthorizedException("Your session has expired. Please log in again", ErrorCode.UNAUTHORIZED));
    }
    const payload: any = jwt.verify(token, env.JWT_SECRET);
    const user = await prisma.user.findFirst({
        where: {
            id: payload.id,
        },
    });
    if (!user) {
        return next(new UnauthorizedException("Your session has expired. Please log in again", ErrorCode.UNAUTHORIZED));
    }
    (req as AuthReq).user = user;
    next();
};

export default authMiddleware;
