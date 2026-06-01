// src/modules/auth/auth.service.ts

import bcrypt from "bcryptjs";
import { pool } from "../../config/db.js";
import { signinUserInput, signUpUserInput } from "./auth.types.js";
import jwt from "jsonwebtoken";
import envConfig from "../../config/env.js";

export const authService = {
    async signUpUser(payload: signUpUserInput) {
        const { name, image, email, password, phone } = payload;

        const existingUser = await pool.query(`SELECT id FROM users WHERE email = $1`, [email])

        if (existingUser.rows.length > 0) {
            throw new Error("USER_EXISTS");
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(`
            INSERT INTO users (name, image, email, password, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, image, email, phone, role`,
            [name, image, email, hashedPassword, phone]
        )

        return result.rows[0]
    },

    async signInUser(payload: signinUserInput) {
        const { email, password } = payload

        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

        const user = result.rows[0]

        if (!user) {
            throw new Error("INVALID_CREDENTIALS")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error("INVALID_CREDENTIALS")
        }

        const token = jwt.sign(
            { id: user.id },
            envConfig.jwtAccessSecret!,
            { expiresIn: "7d" }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            token,
        };

    }
}