import { object, string } from "zod";

const envSchema = object({
    PORT: string().transform((val) => parseInt(val, 10)),
    DATABASE_URL: string(),
    SHADOW_DATABASE_URL: string(),
    JWT_TOKEN: string().min(20),
    USERNAME_SUPERADMIN: string().max(15),
    EMAIL_SUPERADMIN: string().email(),
    PIN_SUPERADMIN: string().length(6),
    CLOUDINARY_CLOUD_NAME: string(),
    CLOUDINARY_API_KEY: string(),
    CLOUDINARY_API_SECRET: string(),
    WHATSAPP_NUMBER: string().min(10),
    CALLMEBOT_API_KEY: string(),
});

export default envSchema;
