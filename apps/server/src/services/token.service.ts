import { prisma } from "../config";
import { addMinutes } from "date-fns";
import crypto from "crypto";

interface GenerateTokenProps {
    userId: string;
    type: "VERIFY_EMAIL" | "RESET_PASSWORD";
    expiresInMinutes?: number;
}

export const generateToken = async ({ userId, type, expiresInMinutes = 30 }: GenerateTokenProps) => {
    // check if the token already exists
    const existingToken = await prisma.userToken.findFirst({
        where: { userId, type, isUsed: false, expiresAt: { gt: new Date() } },
    });
    if (existingToken) return existingToken.token;

    // delete old tokens and generate new tokend
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = addMinutes(new Date(), expiresInMinutes);

    await prisma.userToken.deleteMany({ where: { userId, type, isUsed: false } });
    await prisma.userToken.create({
        data: {
            userId,
            token,
            type,
            expiresAt,
        },
    });
    return token;
};
