import { Request, Response } from "express";
import { vehiclesService } from "./bookings.service.js";

export const bookingsController = {
    async createBooking(req: Request, res: Response) {
        try {
            const result = await vehiclesService.createBooking(req.body);

            return res.status(201).send({
                success: true,
                message: "Booking created successfully",
                data: result
            });
        }
        catch (error: any) {
            console.error(error);

            if (error.message === "Vehicle_not_found") {
                return res.status(404).send({
                    success: false,
                    message: "Vehicle not found",
                });
            }

            if (error.message === "Vehicle_not_available") {
                return res.status(400).send({
                    success: false,
                    message: "Vehicle not available",
                });
            }

            if (error.message === "Failed_to_create_booking") {
                return res.status(500).send({
                    success: false,
                    message: "Failed to create booking",
                });
            }

            return res.status(500).send({
                success: false,
                message: "Booking creation failed",
            });

        }
    },

    async getBookings(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized",
                });
            }

            const role = req.user.role;
            const userId = req.user.id;

            const result = await vehiclesService.getBookings(role, userId);

            return res.status(200).send({
                success: true,
                message: "Bookings fetched successfully",
                data: result
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({
                success: false,
                message: "Failed to fetch bookings",
            });
        }
    },

    async updateBookingStatus(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized",
                });
            }

            const role = req.user.role;
            const userId = req.user.id;
            const bookingId = Number(req.params.bookingId);

            const result = await vehiclesService.updateBookingStatus(bookingId, req.body, role, userId);

            return res.status(200).send({
                success: true,
                message: "Booking status updated successfully",
                data: result
            });
        }
        catch (error: any) {
            console.error(error);

            if (error.message === "Booking_not_found") {
                return res.status(404).send({
                    success: false,
                    message: "Booking not found",
                });
            }

            if (error.message === "Unauthorized") {
                return res.status(403).send({
                    success: false,
                    message: "Unauthorized",
                });
            }

            if (error.message === "Cannot_cancel_booking") {
                return res.status(400).send({
                    success: false,
                    message: "Cannot cancel booking after rent start date",
                });
            }

            if (error.message === "Invalid_status") {
                return res.status(400).send({
                    success: false,
                    message: "Invalid status",
                });
            }

            if (error.message === "Failed_to_cancel_booking") {
                return res.status(500).send({
                    success: false,
                    message: "Failed to cancel booking",
                });
            }

            if (error.message === "Failed_to_mark_as_returned") {
                return res.status(500).send({
                    success: false,
                    message: "Failed to mark booking as returned",
                });
            }

            return res.status(500).send({
                success: false,
                message: "Failed to update booking status",
            });
        }
    }
}