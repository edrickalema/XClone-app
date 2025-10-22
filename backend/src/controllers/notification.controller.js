import asyncHandler from "express-async-handler";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";

// delete notifications
export const deleteNotifications = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { id } = req.params;

  const user = await User.findOne({ clerkId: userId });

  if (!user)
    return res.status(404).json({ message: "user has not been found" });

  const notification = await Notification.findByIdAndDelete({
    _id: id,
    to: user._id,
  });

  if (!notification) {
    return res.status(404).json({ message: "notifaction has not been found" });
  }

  res.status(200).json({
    message: "notification has been deleted",
  });
});

// get user notifications
export const getNotifications = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerkId: userId });

  if (!user) return res.status(404).json({ message: "user not found" });

  const notifications = await Notification.find({ to: user._id })
    .sort({
      createdAt: -1,
    })
    .populate("from", "username firstName lastName profilePicture")
    .populate("post", "content image")
    .populate("comment", "content");

  return res.status(200).json({
    notifications,
  });
});
