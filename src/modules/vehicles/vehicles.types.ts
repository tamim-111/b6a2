import z from "zod";
import { createVehicleSchema, updateVehicleSchema } from "./vehicles.validations.js";

export type createVehicleInput = z.infer<typeof createVehicleSchema>
export type updateVehicleInput = z.infer<typeof updateVehicleSchema>