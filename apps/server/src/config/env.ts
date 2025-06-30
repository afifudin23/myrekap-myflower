import { envSchema } from "@/schemas";
import dotenv from "dotenv";

dotenv.config();

const env = envSchema.parse(process.env);
export default env;
