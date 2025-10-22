import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { clerkClient, getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";
// get user
export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username)
    return res.status(400).json({
      message: "username is required",
    });

  const user = await User.findOne({ username });

  if (!user)
    return res.status(404).json({
      message: "no user has been found",
    });

  return res.status(200).json(user);
});

// update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, {
    new: true,
  });

  if (!user) return res.status(404).json({ message: "no user has been found" });

  return res.status(200).json({ user });
});

// Sync user to the database after authentication

export const syncUserToDB = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  // checking for existing user in the database
  const userExists = await User.findOne({ clerkId: userId });
  if (userExists) {
    return res.status(200).json({
      user: userExists,
      message: "user already in the database",
    });
  }

  // create new user from clerk data
  const clerkUser = await clerkClient.users.getUser(userId);
  const newUserData = {
    clerkId: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
    profilePicture: clerkUser.imageUrl || "",
  };
  const user = await User.create(newUserData);

  return res.status(200).json({
    user,
    message: "user has been created successfully",
  });
});

// get me
export const getAuthenticatedUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerkId: userId });
  if (!user)
    return res.status(404).json({
      message: "no user has been found",
    });

  return res.status(200).json({
    user,
  });
});

// follow user
export const followUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { targetUserId } = req.params;

  if (userId === targetUserId) {
    return res.status(400).json({
      message: "you can not follow yourself",
    });
  }

  // const currentUser = await User.findOne({ clerkId: userId });
  // const targetUser = await User.findOneById({ targetUserId });
  const currentUser = await User.findOne({ clerkId: userId });
  const targetUser = await User.findOne({ clerkId: targetUserId });

  if (!currentUser || !targetUser)
    return res.status(404).json({
      error: "user not found",
    });
  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUser._id, {
      $pull: {
        followers: userId,
      },
    });
  } else {
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { following: targetUserId },
    });
    await User.findByIdAndUpdate(targetUser._id, {
      $push: { followers: userId },
    });
    await Notification.create({
      from: currentUser._id,
      to: targetUserId,
      type: "follow",
    });
  }

  return res.status(200).json({
    message: isFollowing
      ? "user unfollowed successfully"
      : " user followed successfully",
  });
});
