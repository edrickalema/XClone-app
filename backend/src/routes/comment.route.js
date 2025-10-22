import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.get("/post/:postId", getComments);
commentRouter.post("/post/:postId", protectRoute, createComment);
commentRouter.post("/:commentId", protectRoute, deleteComment);

export default commentRouter;
