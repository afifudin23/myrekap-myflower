import { NextFunction, Request, Response } from "express";
import { authService } from "../services";
import { authSchema } from "../schemas";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const appName = req.headers["x-app-name"];
console.log(appName);
    const body = authSchema.loginUserSchema.parse(req.body);
    try {
        const { data, token } = await authService.loginUser(body);
        res.cookie(`token_${appName}`, token, {
            httpOnly: true, // Tidak dapat diakses oleh JavaScript
            // secure: true, // Hanya dikirim melalui HTTPS (penting untuk production)
            sameSite: "strict", // Tidak terkirim di request pihak ketiga
            maxAge: 60 * 60 * 24 * 1000,
            path: "/", // Hanya untuk path ini
        });
        res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
};

export const registerCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const body = authSchema.registerCustomer.parse(req.body);
    try {
        await authService.registerCustomer(body);
        res.status(201).json({ message: "Registration successful. Please check your email to verify your account." });
    } catch (error) {
        return next(error);
    }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token;
    if (!token || typeof token !== "string") {
        return res.status(400).json({ message: "Invalid or missing token" });
    }
    try {
        await authService.verifyEmail(token);
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        return next(error);
    }
};

export const resendVerificationEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = authSchema.resendVerificationEmail.parse(req.body);
    try {
        await authService.resendVerificationEmail(email);
        res.status(200).json({ message: "Resend verification email successful" });
    } catch (error) {
        return next(error);
    }
};

export const verify = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Verification successfully" });
    } catch (error) {
        return next(error);
    }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = authSchema.forgotPassword.parse(req.body);
    try {
        await authService.forgotPassword(email);
        res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        return next(error);
    }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token, password } = authSchema.resetPassword.parse(req.body);
    try {
        await authService.resetPassword(token, password);
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return next(error);
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
        return next(error);
    }
};
