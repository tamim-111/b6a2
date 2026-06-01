// src/modules/auth/auth.routes.ts

import { Router } from "express";
import { authController } from "./auth.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
import { validate } from "../../middlewares/validate.js";
import { signInSchema, signUpSchema } from "./auth.validations.js";

export const authRoutes = Router();

authRoutes.post("/signup", validate(signUpSchema), authController.signUpUser)
authRoutes.post("/signin", validate(signInSchema), authController.signInUser)
authRoutes.post("/signout", authController.signOutUser)
authRoutes.get("/me", verifyJwt, authController.me)