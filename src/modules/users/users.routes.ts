import { Router } from "express";
import { usersController } from "./users.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { validate } from "../../middlewares/validate.js";
import { updateProfileSchema, updateRoleSchema } from "./users.validations.js";

export const usersRoutes = Router();

usersRoutes.get("/", verifyJwt, verifyRole("admin"), usersController.getAllUsers)
usersRoutes.patch("/profile", validate(updateProfileSchema), verifyJwt, usersController.updateProfile)
usersRoutes.put("/role/:id", validate(updateRoleSchema), verifyJwt, verifyRole("admin"), usersController.replaceRole)
usersRoutes.delete("/:id", verifyJwt, verifyRole("admin"), usersController.deleteUser)