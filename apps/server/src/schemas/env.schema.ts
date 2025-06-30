import { object, string } from "zod";

export const envSchema = object({
    PORT: string().transform((val) => parseInt(val, 10)),
    CLIENT_ORIGINS: string(),
    DATABASE_URL: string(),
    SHADOW_DATABASE_URL: string().optional( ),
    JWT_SECRET: string().min(20),
    SUPERADMIN_USERNAME: string().max(15),
    SUPERADMIN_EMAIL: string().email(),
    SUPERADMIN_PASSWORD: string().min(5),
    CLOUDINARY_CLOUD_NAME: string(),
    CLOUDINARY_API_KEY: string(),
    CLOUDINARY_API_SECRET: string(),
    WHATSAPP_NUMBER: string().min(10),
    CALLMEBOT_API_KEY: string(),
});
