// src/modules/bookings/bookings.validations.ts

import z from "zod";

export const createBookingSchema = z.object({
    customer_id: z.number(),
    vehicle_id: z.number(),
    rent_start_date: z.coerce.date(),
    rent_end_date: z.coerce.date(),
})

export const updateBookingSchema = z.object({
    status: z.enum(['cancelled', 'returned']),
})