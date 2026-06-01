import { Router } from "express";
import { usersController } from "./users.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
import { verifyRole } from "../../middlewares/verifyRole.js";

export const usersRoutes = Router();

usersRoutes.get("/", verifyJwt, verifyRole("admin"), usersController.getAllUsers)
usersRoutes.patch("/profile", verifyJwt, usersController.updateProfile)
usersRoutes.put("/role/:id", verifyJwt, verifyRole("admin"), usersController.replaceRole)
usersRoutes.delete("/:id", verifyJwt, verifyRole("admin"), usersController.deleteUser)