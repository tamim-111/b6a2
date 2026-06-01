import z from "zod";
import { createBookingSchema, updateBookingSchema } from "./bookings.validations.js";

export type createBookingInput = z.infer<typeof createBookingSchema>;
export type updateBookingInput = z.infer<typeof updateBookingSchema>;