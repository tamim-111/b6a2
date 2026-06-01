import { pool } from "../../config/db.js";
import { createBookingInput, updateBookingInput } from "./bookings.types.js";

export const vehiclesService = {
    async createBooking(payload: createBookingInput) {
        const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

        // Validates vehicle availability
        const vehicle = await pool.query("SELECT * FROM vehicles WHERE id = $1", [vehicle_id]);

        if (!vehicle.rows[0]) {
            throw new Error("Vehicle_not_found");
        }

        if (vehicle.rows[0].availability_status !== "available") {
            throw new Error("Vehicle_not_available");
        }

        // Calculate total price (daily rate × duration)
        const daily_rent_price = vehicle.rows[0].daily_rent_price;
        const rent_duration = Math.ceil((rent_end_date.getTime() - rent_start_date.getTime()) / (1000 * 60 * 60 * 24));
        const calculated_total_price = daily_rent_price * rent_duration;

        // Create booking
        const result = await pool.query(`
            INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [customer_id, vehicle_id, rent_start_date, rent_end_date, calculated_total_price]);

        if (!result.rows[0]) {
            throw new Error("Failed_to_create_booking");
        }

        // Update vehicle status to "booked"
        await pool.query("UPDATE vehicles SET availability_status = 'booked' WHERE id = $1", [vehicle_id]);

        return result.rows[0];
    },

    async getBookings(role: "customer" | "admin", userId: number) {
        if (role === "customer") {
            const result = await pool.query("SELECT * FROM bookings WHERE customer_id = $1", [userId]);
            return result.rows;
        } else if (role === "admin") {
            const result = await pool.query("SELECT * FROM bookings");
            return result.rows;
        }
    },

    async updateBookingStatus(bookingId: number, payload: updateBookingInput, role: "customer" | "admin", userId: number) {
        // customer can cancel a booking before rent start date, admin can mark it as returned

        const booking = await pool.query("SELECT * FROM bookings WHERE id = $1", [bookingId]);

        if (!booking.rows[0]) {
            throw new Error("Booking_not_found");
        }

        if (role === "customer") {
            if (booking.rows[0].customer_id !== userId) {
                throw new Error("Unauthorized");
            }

            const rentStartDate = new Date(booking.rows[0].rent_start_date);
            if (rentStartDate > new Date()) {
                const result = await pool.query("UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *", [bookingId]);
                if (!result.rows[0]) {
                    throw new Error("Failed_to_cancel_booking");
                }
                return result.rows[0];
            } else {
                throw new Error("Cannot_cancel_booking");
            }
        } else if (role === "admin") {
            if (payload.status === "returned") {
                const result = await pool.query("UPDATE bookings SET status = 'returned' WHERE id = $1 RETURNING *", [bookingId]);
                if (!result.rows[0]) {
                    throw new Error("Failed_to_mark_as_returned");
                }
                return result.rows[0];
            } else {
                throw new Error("Invalid_status");
            }
        }
    }
}