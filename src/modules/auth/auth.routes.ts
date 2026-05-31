// src/modules/auth/auth.routes.ts

import { Router } from "express";
import { authController } from "./auth.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";

export const authRoutes = Router();

authRoutes.post("/signup", authController.signUpUser)
authRoutes.post("/signin", authController.signInUser)
authRoutes.post("/signout", authController.signOutUser)
authRoutes.get("/me", verifyJwt, authController.me)