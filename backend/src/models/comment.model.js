import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 280,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
    validate: {
      validator: function (arr) {
        return arr.length === new Set(arr.map((id) => id.toString())).size;
      },
      message: "Duplicate likes are not allowed",
    },
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
