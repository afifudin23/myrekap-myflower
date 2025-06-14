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
            const hashPin = await argon2.hash(env.PIN_SUPERADMIN);
            await prisma.user.create({
                data: {
                    username: env.USERNAME_SUPERADMIN,
                    email: env.EMAIL_SUPERADMIN,
                    pin: hashPin,
                    role: "SUPERADMIN",
                },
            });
        }
    } catch (_error) {
        console.error("❌ Failed to create superadmin, try again");
    }
}

export default seedSuperadmin;
