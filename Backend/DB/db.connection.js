import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_ATLAS);
        console.log(`DB connected succesfull`);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

export default connectDB;