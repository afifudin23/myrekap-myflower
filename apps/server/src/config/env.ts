import dotenv from "dotenv";
import { envSchema } from "@/schemas";

dotenv.config();
const env = envSchema.parse(process.env);
export default env;
