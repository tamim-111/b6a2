import z from "zod";

export const createVehicleSchema = z.object({
    vehicle_name: z.string().max(255),
    type: z.enum(['suv', 'sedan', 'sports', 'electric']),
    registration_number: z.string().max(50),
    daily_rent_price: z.number().int().positive(),
})

export const updateVehicleSchema = createVehicleSchema.partial();