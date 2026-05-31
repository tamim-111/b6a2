// src/middlewares/validate.ts

import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {

    const validation = schema.safeParse(req.body);

    if (!validation.success) {

        const errors = validation.error.issues.map(issue => ({
            field: issue.path.join("."),
            message: issue.message,
        }));

        return res.status(400).send({
            success: false,
            message: "Validation failed",
            errors,
        });
    }

    req.body = validation.data;

    next();
};