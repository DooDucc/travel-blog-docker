const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    postId: String,
    comments: {
      type: [Object],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
