import mongoose from "mongoose";
import { Env } from "./env.config";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI);
    console.log("Connected to MongoDb database !!");
  } catch (error) {
    console.log("Error connecting to database !!", error);

    process.exit(1);
  }
};

// , {
//       serverSelectionTimeoutMS: 8000,
//       socketTimeoutMS: 45000,
//       connectTimeoutMS: 10000,
//     }
