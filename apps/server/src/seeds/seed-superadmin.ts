import prisma from "@/config/database";
import env from "@/config/env";
import argon2 from "argon2";

async function seedSuperadmin() {
    try {
        const superadmin = await prisma.user.findFirst({
            where: {
                role: "SUPERADMIN",
            },
        });
        if (!superadmin) {
            const hashPassword = await argon2.hash(env.SUPERADMIN_PASSWORD);
            await prisma.user.create({
                data: {
                    fullName: env.SUPERADMIN_FULL_NAME,
                    username: env.SUPERADMIN_USERNAME,
                    email: env.SUPERADMIN_EMAIL,
                    phoneNumber: env.SUPERADMIN_PHONE_NUMBER,
                    password: hashPassword,
                    role: "SUPERADMIN",
                },
            });
        }
    } catch (_error) {
        console.error("❌ Failed to create superadmin, try again");
    }
}

export default seedSuperadmin;
