import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // 🔴 ADD THIS DEBUG LINE HERE:
        console.log("DEBUG ENVIRONMENT CHECK -> MONGODB_URI IS:", process.env.MONGODB_URI);

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MONGO DB connection error ${error}`);
        process.exit(1);
    }
};

export default connectDB;