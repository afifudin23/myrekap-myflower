import { prisma } from "@/config";
import app from "../src/app";
import "module-alias/register";
import seedSuperadmin from "@/seeds/seed-superadmin";

(async () => {
    await prisma.$connect();
    await seedSuperadmin();
})();

export default app;
