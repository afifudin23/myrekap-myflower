import { NextFunction, Request, Response } from "express";
import { loginUserSchema } from "@/schemas/auth.schema";
import AuthService from "@/services/auth.service";
import { AuthReq } from "@/middlewares/auth.middleware";

const authController = {
    async loginUser(req: Request, res: Response, next: NextFunction) {
        const { username, pin } = loginUserSchema.parse(req.body);
        try {
            const { data, token } = await AuthService.loginUser(username, pin);
            res.cookie("token", token, {
                httpOnly: true, // Tidak dapat diakses oleh JavaScript
                secure: true, // Hanya dikirim melalui HTTPS (penting untuk production)
                sameSite: "strict", // Tidak terkirim di request pihak ketiga
                maxAge: 60 * 60 * 24 * 1000,
                path: "/", // Hanya untuk path ini
            });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
    async verify(_req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ message: "Verification successful" });
        } catch (error) {
            next(error);
        }
    },
    async logoutUser(_req: AuthReq, res: Response, next: NextFunction) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true, // Pastikan secure diaktifkan jika menggunakan HTTPS
                sameSite: "strict",
            });
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            next(error);
        }
    },
};

export default authController;
