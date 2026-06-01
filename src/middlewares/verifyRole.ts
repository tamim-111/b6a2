// src/middlewares/verifyRole.ts

import { Request, Response, NextFunction } from "express";

export const verifyRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required role: ${roles.join(", ")}`,
            });
        }

        next();
    };
};