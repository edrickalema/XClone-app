import mongoose from "mongoose";
import { ENV } from "./env.js";



export const connectToDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("CONNECTED TO THE DATABASE AT SUCCESS ✔");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
