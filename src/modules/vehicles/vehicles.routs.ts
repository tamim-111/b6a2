import { Router } from "express";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { vehiclesController } from "./vehicles.controllers.js";
import { validate } from "../../middlewares/validate.js";
import { createVehicleSchema, updateVehicleSchema } from "./vehicles.validations.js";

export const vehiclesRoutes = Router()

vehiclesRoutes.post("/", validate(createVehicleSchema), verifyJwt, verifyRole("admin"), vehiclesController.createVehicle)
vehiclesRoutes.get("/", verifyJwt, vehiclesController.getAllVehicles)
vehiclesRoutes.get("/:id", verifyJwt, vehiclesController.getVehicleById)
vehiclesRoutes.patch("/:id", validate(updateVehicleSchema), verifyJwt, verifyRole("admin"), vehiclesController.updateVehicle)
vehiclesRoutes.delete("/:id", verifyJwt, verifyRole("admin"), vehiclesController.deleteVehicle)