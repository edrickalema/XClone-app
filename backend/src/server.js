import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { connectToDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import userRouter from "./routes/user.route.js";

// initializing the express app
const app = express();

// middlewares
app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/users", userRouter);

// App start point
const PORT = ENV.PORT || 5001;

app.listen(
  (PORT,
  () => {
    connectToDB();
    console.log(`App is running on the port ${PORT}`);
  })
);
