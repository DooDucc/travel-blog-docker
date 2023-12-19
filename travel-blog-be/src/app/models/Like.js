const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    postId: String,
    likes: {
      type: [Object],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
