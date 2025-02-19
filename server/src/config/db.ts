import mongoose from "mongoose";
import config from ".";

const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connect to MongoDB");
  } catch (error) {
    console.log("Unable to connect to MongoDB", error);
    process.exit(0);
  }
};

export default connectDB;
