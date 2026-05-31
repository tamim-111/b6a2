// src/app.ts

import express, { Request, Response } from "express";
import cors from "cors";
import initDB from "./config/db.js";
// import { notesRoutes } from "./modules/notes/notes.route.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());

initDB();

// app.use("/notes", notesRoutes);

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