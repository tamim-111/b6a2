// src/config/env.ts

import dotenv, { config } from "dotenv"

dotenv.config()

const envConfig = {
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET
}

export default envConfig