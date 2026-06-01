// src/config/db.ts

import { Pool } from "pg";
import envConfig from "./env.js";

export const pool = new Pool({ connectionString: envConfig.databaseUrl });

export default async function initDB() {
  try {

    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE CHECK (email = LOWER(email)),
      password TEXT NOT NULL CHECK (char_length(password) >= 6),
      phone VARCHAR(14) NOT NULL, 
      role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer'))
      )`)

    // await pool.query(`
    // CREATE TABLE IF NOT EXISTS vehicles (
    //   id SERIAL PRIMARY KEY,
    //   vehicle_name VARCHAR(255) NOT NULL,  
    //   type VARCHAR(10) NOT NULL CHECK (type IN ('suv', 'sedan', 'sports', 'electric')),
    //   registration_number VARCHAR(50) NOT NULL UNIQUE,
    //   daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
    //   availability_status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (availability_status IN ('available', 'booked'))
    //   )`)

    // await pool.query(`
    // CREATE TABLE IF NOT EXISTS bookings (
    //   id SERIAL PRIMARY KEY,
    //   customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    //   vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    //   rent_start_date TIMESTAMP NOT NULL,
    //   rent_end_date   TIMESTAMP NOT NULL CHECK (rent_end_date > rent_start_date),
    //   total_price INT NOT NULL CHECK (total_price > 0),
    //   status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'returned'))
    //   )`)

    console.log("PostgreSQL connected successfully");
  }
  catch (error) {
    console.log("PostgreSQL connection failed", error);

    process.exit(1);
  }
}