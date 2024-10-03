import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URL as string);
    console.log(`Database connected: ${res.connections[0].host} at port ${res.connections[0].port}`);
    
  } catch (error) {
    console.log("Error connecting to the DB", error);
    process.exit(1);
  }
}

export default connectDB;
