const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    authorId: String,
    author: String,
    tags: [String],
    thumb: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
