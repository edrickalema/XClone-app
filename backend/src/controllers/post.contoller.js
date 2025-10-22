import asyncHandler from "express-async-handler";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary.js";

// get posts
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });

  if (!posts) {
    return res.status(400).json({
      message: "no posts created yet",
    });
  }

  return res.status(200).json({ posts });
});

// create posts
export const createPosts = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;

  if (!content && !imageFile) {
    return res
      .status(400)
      .json({ message: "post must have either image or text" });
  }

  const user = await User.findOne({ clerkId: userId });

  if (!user) return res.status(404).json({ message: "User not found" });

  let imageUrl = "";

  if (imageFile) {
    try {
      const base64Image = `data:${
        imageFile.mimetype
      };base64,${imageFile.buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "social_media_posts",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          {
            format: "auto",
          },
        ],
      });

      imageUrl = uploadResponse.secure_url;
    } catch (error) {
      console.log(`cloudinary error: ${error}`);
      return res.status(400).json({ message: "Failed to upload image" });
    }
  }

  const post = await Post.create({
    user: user._id,
    content: content || "",
    image: imageUrl,
  });

  return res.status(200).json({ post });
});

// get single post
export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId)
    .populate("user", "username lastName firstName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });

  if (!post)
    return res.status(404).json({
      message: "no post has been found",
    });

  return res.status(200).json({
    post,
  });
});

// get user posts
export const getUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user)
    return res.status(404).json({
      message: "no user has been found",
    });

  const posts = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "user",
      select: "username firstName lastName profilePicture",
    });

  return res.status(200).json({
    posts,
  });
});

export const likePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findOne(postId);

  if (!post || !user)
    return res.status(404).json({
      message: "user or post not found",
    });

  const isLiked = post.likes.includes(user._id);

  if (isLiked) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: user._id },
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      $push: {
        likes: user._id,
      },
    });

    if (post.user.toString() !== user._id.toString()) {
      await Notification.create({
        from: user._id,
        tod: post.user,
        type: "like",
        post: postId,
      });
    }
  }

  return res.status(200).json({
    message: isLiked ? "Post liked successfully" : "Post unliked successfully",
  });
});

// Delete post

export const deletePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const { postId } = req.params;

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findOne(postId);

  if (!user || !post)
    return res.status(404).json({ message: "no user or pos found" });

  if (post.user.toString() !== user._id.toString()) {
    return res.status(403).json({
      message: "you can only delete your own posts",
    });
  }

  // delete comments
  await Comment.deleteMany({ post: postId });

  // delete the posts
  await Post.findByIdAndDelete(postId);

  return res.status(200).json({
    message: "post deleted successfully",
  });
});
