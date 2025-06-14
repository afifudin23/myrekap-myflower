import env from "@/config/env";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import type { Request } from "express";
type MulterFile = Request["file"];

if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});
export const uploadFile = async (file: MulterFile, folder: string): Promise<UploadApiResponse> => {
    return await new Promise((resolve, reject) => {
        if (!file || !file.buffer) {
            return reject(new Error("File buffer not available"));
        }

        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                public_id: `${folder}/${Date.now()}-${file.originalname}`,
                resource_type: "image",
            },
            async (error, result) => {
                if (error) {
                    console.log(error);
                    return reject(new Error(error.message));
                }
                // if (error) return reject(new Error(error.message));
                resolve(result);
            }
        );
        stream.end(file.buffer);
    });
};

export default cloudinary;
