import { Router } from "express";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { vehiclesController } from "./vehicles.controllers.js";

export const vehiclesRoutes = Router()

vehiclesRoutes.post("/", verifyJwt, verifyRole("admin"), vehiclesController.createVehicle)
vehiclesRoutes.get("/", verifyJwt, vehiclesController.getAllVehicles)
vehiclesRoutes.get("/:id", verifyJwt, vehiclesController.getVehicleById)
vehiclesRoutes.patch("/:id", verifyJwt, verifyRole("admin"), vehiclesController.updateVehicle)
vehiclesRoutes.delete("/:id", verifyJwt, verifyRole("admin"), vehiclesController.deleteVehicle)