import { NextFunction, Request, Response } from "express";
import { userService } from "@/services";
import { userSchema } from "@/schemas";

export const getAllUsers = async (_req: Request, res: Response) => {
    const data = await userService.getAllUsers();
    res.status(200).json({
        message: data.length ? "User retrieved successfully" : "No user available",
        data,
    });
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await userService.getUserById(req.params.id);
        res.status(200).json({
            messege: "User retrieved successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    userSchema.createUserSchema.parse(req.body);
    try {
        const data = await userService.createUser(req.body);
        res.status(201).json({
            message: "User created successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    userSchema.updatedUserSchema.parse(req.body);
    try {
        const data = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({
            message: "User updated successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await userService.deleteUser(req.params.id);
        res.status(200).json({
            message: "User deleted successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};
