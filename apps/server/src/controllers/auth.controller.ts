import { NextFunction, Request, Response } from "express";
import { authService } from "@/services";
import { authSchema } from "@/schemas";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = authSchema.loginUserSchema.parse(req.body);
    try {
        const { data, token } = await authService.loginUser(username, password);
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
};

export const registerCustomer = async (req: Request, res: Response, next: NextFunction) => {
    authSchema.registerCustomer.parse(req.body);
    try {
        const data = await authService.registerCustomer(req.body);
        res.status(201).json({
            message: "User Customer registered successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

export const verify = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Verification successful" });
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (_req: Request, res: Response, next: NextFunction) => {
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
};
