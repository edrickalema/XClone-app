import express, { response } from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { connectToDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import notificationRouter from "./routes/notification.route.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
// initializing the express app
const app = express();

// middlewares

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use(arcjetMiddleware);
// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use((err, req, res, next) => {
  console.log("unhandled error:", err);
  res.status(500).json({
    message: err.message || "Internal server error",
  });
  next();
});
// App start point
const PORT = ENV.PORT || 5001;

const startServer = async () => {
  try {
    await connectToDB();

    if (ENV.NODE_ENV !== "production") {
      app.listen(
        (PORT,
        () => {
          console.log(`App is running on the port ${PORT}`);
        })
      );
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default app;

startServer();
