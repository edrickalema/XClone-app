import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like", "comment"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

notificationSchema.pre("validate", function (next) {
  if (this.type === "follow" && (this.post || this.comment)) {
    return next(
      new Error(
        "Follow notifications should not have post or comment references"
      )
    );
  }
  if (this.type === "like" && !this.post) {
    return next(new Error("Like notifications must have a post reference"));
  }
  if (this.type === "comment" && (!this.post || !this.comment)) {
    return next(
      new Error(
        "Comment notifications must have both post and comment references"
      )
    );
  }
  next();
});
const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
