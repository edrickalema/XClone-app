import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { connectToDB } from "./config/db.js";
import { ENV } from "./config/env.js";
const app = express();

// middlewares
app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());

// Routes

// App start point
const PORT = ENV.PORT || 5001;

app.listen(
  (PORT,
  () => {
    connectToDB();
    console.log(`App is running on the port ${PORT}`);
  })
);
