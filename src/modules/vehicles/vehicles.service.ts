import { pool } from "../../config/db.js";
import { createVehicleInput, updateVehicleInput } from "./vehicles.types.js";

export const vehiclesService = {
    async createVehicle(payload: createVehicleInput) {
        const { vehicle_name, type, registration_number, daily_rent_price } = payload
        const result = await pool.query(`
            INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [vehicle_name, type, registration_number, daily_rent_price]
        );
        return result.rows[0];
    },

    async getAllVehicles() {
        const result = await pool.query(`SELECT * FROM vehicles`);
        return result.rows;
    },

    async getVehicleById(id: number) {
        const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
        return result.rows[0];
    },

    async updateVehicle(id: number, payload: updateVehicleInput) {
        const { vehicle_name, type, registration_number, daily_rent_price } = payload
        const result = await pool.query(`
            UPDATE vehicles
            SET 
                vehicle_name = COALESCE($1, vehicle_name),
                type = COALESCE($2, type),
                registration_number = COALESCE($3, registration_number),
                daily_rent_price = COALESCE($4, daily_rent_price)
            WHERE id = $5
            RETURNING *
        `, [vehicle_name, type, registration_number, daily_rent_price, id]
        );
        return result.rows[0];
    },

    async deleteVehicle(id: number) {

        const vehicle = await pool.query("SELECT id FROM vehicles WHERE id = $1", [id]);

        if (!vehicle.rows[0]) {
            throw new Error("Vehicle_not_found");
        }

        const booking = await pool.query(
            `SELECT id FROM bookings 
            WHERE vehicle_id = $1 AND status = 'active'`,
            [id]
        );

        if (booking.rows[0]) {
            throw new Error("Vehicle_has_active_bookings");
        }

        const result = await pool.query(`DELETE FROM vehicles WHERE id = $1 RETURNING *`, [id]);
        return result.rows[0];
    }
}