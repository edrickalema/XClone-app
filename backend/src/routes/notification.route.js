import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  deleteNotifications,
  getNotifications,
} from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.get("/", protectRoute, getNotifications);
notificationRouter.delete("/:id", protectRoute, deleteNotifications);

export default notificationRouter;
