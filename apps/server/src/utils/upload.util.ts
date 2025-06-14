import multer from "multer";
const storage = multer.memoryStorage();
const fileFilter = (_req: any, file: any, cb: (error: Error | null, acceptFile: boolean) => void) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, PNG, and JPG images are allowed"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;