import express from "express";
import {
  createPosts,
  getPost,
  getPosts,
  getUserPosts,
  likePost,
  deletePost,
} from "../controllers/post.contoller.js";
import upload from "../middleware/upload.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const postRouter = express.Router();

// public routes
postRouter.get("/", getPosts);
postRouter.get("/:postId", getPost);
postRouter.get("/:username", getUserPosts);

// privateRoute
postRouter.post("/", protectRoute, upload.single("image"), createPosts);
postRouter.post("/:postId/like", protectRoute, likePost);
postRouter.delete("/:postId", protectRoute, deletePost);
export default postRouter;
