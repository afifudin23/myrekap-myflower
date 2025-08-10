import app from "../src/app";
import "module-alias/register";
import { prisma } from "../src/config";
import seedSuperadmin from "../src/seeds/seed-superadmin";

(async () => {
    await prisma.$connect();
    await seedSuperadmin();
})();

export default app;
