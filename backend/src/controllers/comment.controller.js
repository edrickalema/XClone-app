import asyncHandler from "express-async-handler";
import Comment from "../models/comment.model.js";
import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";

// create comments
export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.findOne({ post: postId })
    .sort({
      createdAt: -1,
    })
    .populate("user", "username lastName firstName profilePicture");

  return res.status(200).json({ comments });
});

// get comments
export const createComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({
      message: "Comments content is required",
    });
  }

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findOne({ postId });

  if (!user || !post)
    return res.status(404).json({ message: "user or post has not been found" });

  const comment = await Comment.create({
    user: user._id,
    post: postId,
    content,
  });

  await Post.findByIdAndUpdate(postId, {
    $push: {
      comments: comment._id,
    },
  });

  if (post.user.toString() !== user._id.toString()) {
    await Notification.create({
      from: user._id,
      to: post.user,
      type: "comment",
      post: postId,
      comment: comment._id,
    });
  }
  return res.status(201).json({
    comment,
  });
});

// delettIde comments
export const deleteComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { commentId } = req.params;
  const user = await User.findOne({ clerkId: userId });
  const comment = await Comment.findOne({ commentId });

  if (!user || !comment) {
    return res.status(404).json({ message: "user or comment not found" });
  }

  if (comment.user.toString() !== user._id.toString()) {
    return res.status(403).json({
      message: "you can deleted comment made by you",
    });
  }

  await Post.findByIdAndUpdate(comment.post, {
    $pull: { comments: commentId },
  });

  await Comment.findByIdAndDelete(commentId);

  return res.status(205).json({
    message: "comment has been deleted succefully",
  });
});
