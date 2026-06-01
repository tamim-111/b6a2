import bcrypt from "bcryptjs"
import { pool } from "../../config/db.js"
import { updateProfileInput, updateRoleInput } from "./users.types.js"

export const usersService = {
    async getAllUsers() {
        const result = await pool.query("SELECT id, name, email, phone, role FROM users")
        return result.rows
    },

    async updateProfile(id: number, payload: updateProfileInput) {
        const { name, image, email, phone, password } = payload

        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined

        const result = await pool.query(`
            UPDATE users
            SET 
                name = COALESCE($1, name),
                image = COALESCE($2, image),
                email = COALESCE($3, email),
                phone = COALESCE($4, phone),
                password = COALESCE($5, password)
            WHERE id = $6
            RETURNING id, name, email, phone, role
        `, [name, image, email, phone, hashedPassword, id])

        return result.rows[0]
    },

    async replaceRole(id: number, role: updateRoleInput) {
        const result = await pool.query(`
            UPDATE users
            SET 
                role = $1
            WHERE id = $2
            RETURNING id, name, email, phone, role
        `, [role, id])

        return result.rows[0]
    },

    async deleteUser(id: number) {

        const user = await pool.query("SELECT id FROM users WHERE id = $1", [id]);

        if (!user.rows[0]) {
            throw new Error("User_not_found")
        }

        const booking = await pool.query(
            `SELECT id FROM bookings 
            WHERE customer_id = $1 AND status = 'active'`,
            [id]
        );

        if (booking.rows[0]) {
            throw new Error("User_has_active_bookings")
        }


        const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING id`, [id])

        return result.rows[0]

    }
}