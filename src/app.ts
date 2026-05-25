// src/app.ts

import express, { Request, Response } from "express";
import cors from "cors";
import { initDB } from "./config/db.js";
// import { todoRoutes } from "./modules/todo/todo.routes.js";

const app = express();

// Middlewares
app.use(cors({
    origin: ["http://localhost:3000", "others-allowed-origins.com"],
    credentials: true,
}));
app.use(express.json());

initDB()


// app.use("/todos", todoRoutes)

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello Express!");
});

app.use((req: Request, res: Response) => {
    res.status(404).send({
        error: "Route Not Found",
        path: req.path
    })
})

export default app