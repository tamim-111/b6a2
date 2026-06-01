import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { createBookingSchema, updateBookingSchema } from "./bookings.validations.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
import { bookingsController } from "./bookings.controller.js";
import { verifyRole } from "../../middlewares/verifyRole.js";

const bookingsRoutes = Router()

bookingsRoutes.post("/", validate(createBookingSchema), verifyJwt, verifyRole("customer", "admin"), bookingsController.createBooking);
bookingsRoutes.get("/", verifyJwt, bookingsController.getBookings);
bookingsRoutes.put("/:bookingId", validate(updateBookingSchema), verifyJwt, verifyRole("customer", "admin"), bookingsController.updateBookingStatus);