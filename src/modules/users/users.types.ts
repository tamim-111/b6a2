import z from "zod";
import { updateProfileSchema, updateRoleSchema } from "./users.validations.js";


export type updateProfileInput = z.infer<typeof updateProfileSchema>;

export type updateRoleInput = z.infer<typeof updateRoleSchema>;