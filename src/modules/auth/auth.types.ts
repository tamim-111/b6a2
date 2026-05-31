// src/modules/auth/auth.types.ts

import z from "zod";
import { signInSchema, signUpSchema } from "./auth.validations.js";

export type signUpUserInput = z.infer<typeof signUpSchema>;

export type signinUserInput = z.infer<typeof signInSchema>;