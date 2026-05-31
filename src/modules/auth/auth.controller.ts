// src/modules/auth/auth.controller.ts

import { Request, Response } from "express";
import { authService } from "./auth.service.js";

const isProduction = process.env.NODE_ENV === "production";

export const authController = {
    async signUpUser(req: Request, res: Response) {
        try {
            const result = await authService.signUpUser(req.body)
            return res.status(201).send({
                success: true,
                message: "User signUP successfully",
                data: result,
            });
        }
        catch (error: any) {
            console.log(error);

            if (error.message === "USER_EXISTS") {
                return res.status(409).send({
                    success: false,
                    message: "User already exists",
                });
            }

            return res.status(500).send({
                success: false,
                message: "SignUp failed",
            });
        }
    },

    async signInUser(req: Request, res: Response) {
        try {
            const { user, token } = await authService.signInUser(req.body);

            res.cookie("token", token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).send({
                success: true,
                message: "SignIn successful",
                data: user,
            });
        } catch (error: any) {
            if (error.message === "INVALID_CREDENTIALS") {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            return res.status(500).json({
                success: false,
                message: "SignIn failed",
            });
        }
    },

    async signOutUser(_req: Request, res: Response) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
            });

            return res.status(200).json({
                success: true,
                message: "SignOut out successfully",
            });
        } catch {
            return res.status(500).json({
                success: false,
                message: "SignOut failed",
            });
        }
    },

    async me(req: Request, res: Response) {
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: req.user,
        });
    }
}