import { NextFunction, Request, Response } from "express";
import { userService } from "@/services";
import { userSchema } from "@/schemas";

export const getAllAdmins = async (_req: Request, res: Response) => {
    const data = await userService.findAllAdmins();
    res.status(200).json({
        message: data.length ? "User retrieved successfully" : "No user available",
        data,
    });
};

export const getAllCustomers = async (_req: Request, res: Response) => {
    const data = await userService.findAllCustomers();
    res.status(200).json({
        message: data.length ? "User retrieved successfully" : "No user available",
        data,
    });
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await userService.findById(req.params.id);
        res.status(200).json({
            messege: "User retrieved successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    userSchema.createAdmin.parse(req.body);
    try {
        const data = await userService.createAdmin(req.body);
        res.status(201).json({
            message: "User created successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    userSchema.createCustomer.parse(req.body);
    try {
        const data = await userService.createCustomer(req.body);
        res.status(201).json({
            message: "User created successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    userSchema.update.parse(req.body);
    try {
        const data = await userService.update(req.params.id, req.body);
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
        const data = await userService.remove(req.params.id);
        res.status(200).json({
            message: "User deleted successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};
