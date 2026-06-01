import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service.js";

export const vehiclesController = {
    async createVehicle(req: Request, res: Response) {
        try {
            const result = await vehiclesService.createVehicle(req.body);

            return res.status(201).send({
                success: true,
                message: "Vehicle created successfully",
                data: result,
            });
        }
        catch (error) {
            console.log(error);

            return res.status(500).send({
                success: false,
                message: "Vehicle creation failed",
            });
        }
    },

    async getAllVehicles(req: Request, res: Response) {
        try {
            const result = await vehiclesService.getAllVehicles();

            return res.status(200).send({
                success: true,
                message: "Vehicles retrieved successfully",
                data: result,
            });
        }
        catch (error) {
            console.log(error);

            return res.status(500).send({
                success: false,
                message: "Failed to retrieve vehicles",
            });
        }
    },

    async getVehicleById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await vehiclesService.getVehicleById(id);

            return res.status(200).send({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result,
            });
        }
        catch (error) {
            console.log(error);

            return res.status(500).send({
                success: false,
                message: "Failed to retrieve vehicle",
            });
        }
    },

    async updateVehicle(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await vehiclesService.updateVehicle(id, req.body);

            return res.status(200).send({
                success: true,
                message: "Vehicle updated successfully",
                data: result,
            });
        }
        catch (error) {
            console.log(error);

            return res.status(500).send({
                success: false,
                message: "Failed to update vehicle",
            });
        }
    },

    async deleteVehicle(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const result = await vehiclesService.deleteVehicle(id);

            return res.status(200).send({
                success: true,
                message: "Vehicle deleted successfully",
                data: result,
            });
        }
        catch (error: any) {
            console.log(error);

            if (error.message === "Vehicle_not_found") {
                return res.status(404).send({
                    success: false,
                    message: "Vehicle not found",
                });
            }

            if (error.message === "Vehicle_has_active_bookings") {
                return res.status(400).send({
                    success: false,
                    message: "Vehicle has active bookings and cannot be deleted",
                });
            }


            return res.status(500).send({
                success: false,
                message: "Failed to delete vehicle",
            });
        }
    },

}