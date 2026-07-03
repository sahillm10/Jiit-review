import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

// Safe dynamic environment loading
if (process.env.NODE_ENV !== "production") {
    dotenv.config({
        path: "./.env",
    });
}

// Connect to MongoDB Atlas
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});