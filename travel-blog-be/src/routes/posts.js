const express = require("express");
const {
  getPosts,
  getPost,
  searchPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  commentPost,
  getLikesPost,
  getCommentsPost,
} = require("../app/controllers/posts");
const { validateToken } = require("../utils/funtions");
const router = express.Router();

router.get("/search", searchPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/likes/:id", getLikesPost);
router.get("/comments/:id", getCommentsPost);
router.post("/", validateToken, createPost);
router.patch("/:id", validateToken, updatePost);
router.delete("/:id", validateToken, deletePost);
router.patch("/:id/like-post", validateToken, likePost);
router.post("/:id/comment-post", validateToken, commentPost);

module.exports = router;
