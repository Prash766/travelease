import mongoose from "mongoose";
import "dotenv/config";

// dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || '.env' });
/*
dotenv.config():

When you call dotenv.config(), it loads environment variables from the .env file by default, unless explicitly told to load from a different path. If you want to load a different .env file, such as .env.e2e, you need to pass the file path explicitly in the config method.
import 'dotenv/config':

This is a shorthand that automatically calls dotenv.config() when the file is imported, and by default, it will look for a .env file.
However, since you're using cross-env in your e2e script, it overrides the DOTENV_CONFIG_PATH environment variable. The import 'dotenv/config' respects this environment variable if it's set, allowing it to load the correct file (i.e., .env.e2e).

*/
const connectDB = async () => {
  try {
    const res = await mongoose.connect(
      `${process.env.MONGODB_URL as string}/booking`
    );
    console.log(
      `Database connected: ${res.connections[0].host} at port ${res.connections[0].port}`
    );
  } catch (error) {
    console.log("Error connecting to the DB", error);
    process.exit(1);
  }
};

export default connectDB;
