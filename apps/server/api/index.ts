import app from "../src/app";
import "module-alias/register";
import { prisma } from "@/config";
import seedSuperadmin from "@/seeds/seed-superadmin";

(async () => {
    await prisma.$connect();
    await seedSuperadmin();
})();

export default app;
