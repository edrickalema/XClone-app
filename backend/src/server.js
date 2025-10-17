import express from "express";
import "dotenv/config";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";
const app = express();

// middlewares
app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());

// Routes

// App start point
const PORT = process.env.PORT || 5001;
app.listen(
  (PORT,
  () => {
    console.log(`App is running on the port ${PORT}`);
  })
);
