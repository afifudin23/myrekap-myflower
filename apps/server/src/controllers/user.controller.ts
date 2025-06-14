import { NextFunction, Request, Response } from "express";
import { createNewUserSchema, updatedUserSchema } from "@/schemas/user.schema";
import userService from "@/services/user.service";

const userController = {
    async getAllUsers(_req: Request, res: Response) {
        const data = await userService.getAllUsers();
        res.status(200).json({
            message: data.length ? "User retrieved successfully" : "No user available",
            data,
        });
    },
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getUserById(req.params.id);
            res.status(200).json({
                messege: "User retrieved successfully",
                data,
            });
        } catch (error) {
            return next(error);
        }
    },

    async createNewUser(req: Request, res: Response, next: NextFunction) {
        createNewUserSchema.parse(req.body);
        try {
            const data = await userService.createUser(req.body);
            res.status(201).json({
                message: "User created successfully",
                data,
            });
        } catch (error) {
            return next(error);
        }
    },
    async updateUser(req: Request, res: Response, next: NextFunction) {
        updatedUserSchema.parse(req.body);
        try {
            const data = await userService.updateUser(req.params.id, req.body);
            res.status(200).json({
                message: "User updated successfully",
                data,
            });
        } catch (error) {
            return next(error);
        }
    },
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.deleteUser(req.params.id);
            res.status(200).json({
                message: "User deleted successfully",
                data,
            });
        } catch (error) {
            return next(error);
        }
    },
};

export default userController;
