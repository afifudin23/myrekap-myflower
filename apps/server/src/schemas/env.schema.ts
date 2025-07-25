import { object, string } from "zod";

export const envSchema = object({
    PORT: string().transform((val) => parseInt(val, 10)),
    CLIENT_ORIGINS: string(),
    DATABASE_URL: string(),
    SHADOW_DATABASE_URL: string().optional( ),
    JWT_SECRET: string().min(20),
    SUPERADMIN_FULL_NAME: string(),
    SUPERADMIN_USERNAME: string().max(15),
    SUPERADMIN_EMAIL: string().email(),
    SUPERADMIN_PHONE_NUMBER: string().min(10),
    SUPERADMIN_PASSWORD: string().min(5),
    CLOUDINARY_CLOUD_NAME: string(),
    CLOUDINARY_API_KEY: string(),
    CLOUDINARY_API_SECRET: string(),
    MIDTRANS_CLIENT_KEY: string(),
    MIDTRANS_SERVER_KEY: string(),
    WHATSAPP_NUMBER: string().min(10),
    CALLMEBOT_API_KEY: string(),
});
