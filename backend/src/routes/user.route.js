import express from "express";
import {
  getUserProfile,
  updateProfile,
  syncUserToDB,
  getAuthenticatedUser,
  followUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/profile/:username", getUserProfile);

// protected
userRouter.put("/profile", protectRoute, updateProfile);
userRouter.get("/me", protectRoute, getAuthenticatedUser);
userRouter.post("/syncdb", protectRoute, syncUserToDB);
userRouter.post("/follow/:targetUserId", protectRoute, followUser);

export default userRouter;
