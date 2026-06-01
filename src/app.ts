// src/app.ts

import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import initDB from "./config/db.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routs.js";


const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

initDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/vehicles", vehiclesRoutes);

app.get("/", (_req, res: Response) => {
    return res.status(200).send({
        success: true,
        message: "Server is running",
    });
});

app.use((req: Request, res: Response) => {
    return res.status(404).send({
        success: false,
        message: "Route Not Found",
        path: req.path,
    });
});

export default app;