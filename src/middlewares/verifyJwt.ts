// src/middlewares/verifyJwt.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import envConfig from "../config/env.js";

type JwtPayload = {
    id: number;
};

export const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token missing",
            });
        }

        const decoded = jwt.verify(token, envConfig.jwtAccessSecret!) as JwtPayload

        // PostgreSQL query instead of MongoDB collection
        const result = await pool.query(
            `SELECT id, name, email, phone, role FROM users WHERE id = $1`, [decoded.id]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Authentication failed",
        });
    }
};