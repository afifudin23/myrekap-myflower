import "module-alias/register";
import app from "./app";
import env from "./config/env";
import prisma from "./config/database";
import seedSuperadmin from "@/seeds/seed-superadmin";
import { logger } from "@/utils";

async function startServer() {
    try {
        await prisma.$connect();
        seedSuperadmin();
        app.listen(env.PORT, () => {
            logger.info(`Server running on port http://localhost:${env.PORT}`);
        });
    } catch (_error) {
        logger.error("❌ Failed to connect to database");
        process.exit(1); // Matikan server kalau database mati
    }
}

startServer();
