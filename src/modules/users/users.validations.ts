import z from "zod";

export const updateProfileSchema = z.object({
    name: z.string().min(1).optional(),
    image: z.url().optional(),
    email: z.email().optional(),
    phone: z.string().min(1).optional(),
    password: z.string().min(6).optional(),
})

export const updateRoleSchema = z.object({
    role: z.enum(["admin", "customer"]),
})