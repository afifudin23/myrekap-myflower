import dotenv from "dotenv";
import envSchema from "@/schemas/env.schema";

dotenv.config();

const env = envSchema.parse(process.env);
export default env;
