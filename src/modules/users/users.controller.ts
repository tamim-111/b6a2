import { Request, Response } from "express";
import { usersService } from "./users.service.js";

export const usersController = {
    async getAllUsers(_req: Request, res: Response) {
        try {
            const result = await usersService.getAllUsers()

            return res.status(200).send({
                success: true,
                message: "Users fetched successfully",
                data: result,
            });
        }
        catch (error) {
            console.log(error);

            return res.status(500).send({
                success: false,
                message: "Failed to fetch users",
            });
        }
    },

    async updateProfile(req: Request, res: Response) {
        try {

            if (!req.user?.id) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized",
                });
            }

            const id = req.user.id;

            const result = await usersService.updateProfile(id, req.body);

            if (!result) {
                return res.status(404).send({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).send({
                success: true,
                message: "User profile updated successfully",
                data: result,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Failed to update user profile",
            });
        }
    },

    async replaceRole(req: Request, res: Response) {
        try {
            const { role } = req.body;

            if (!role) {
                return res.status(400).send({
                    success: false,
                    message: "Role is required",
                });
            }

            const id = Number(req.params.id);

            const result = await usersService.replaceRole(id, role);

            if (!result) {
                return res.status(404).send({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).send({
                success: true,
                message: "User role updated successfully",
                data: result,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Failed to update user role",
            });
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const result = await usersService.deleteUser(id);

            if (!result) {
                return res.status(404).send({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).send({
                success: true,
                message: "User deleted successfully",
                data: result,
            });
        }
        catch (error: any) {
            console.log(error);

            if (error.message === "User_not_found") {
                return res.status(404).send({
                    success: false,
                    message: "User not found",
                });
            }

            if (error.message === "User_has_active_bookings") {
                return res.status(409).send({
                    success: false,
                    message: "User has active bookings",
                });
            }

            return res.status(500).send({
                success: false,
                message: "Failed to delete user",
            });
        }
    },
}