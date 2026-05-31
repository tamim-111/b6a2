// src/modules/auth/auth.validations.ts

import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
    image: z.url(),
    email: z.email("Invalid Email").transform((val) => val.toLowerCase()),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().max(14, "Phone number is to long"),
    role: z.enum(["admin", "customer"]).optional().default("customer")
});

export const signInSchema = z.object({
    email: z.email("Invalid Email").transform((val) => val.toLowerCase()),
    password: z.string().min(6, "Password must be at least 6 characters"),
})