const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const { LIMIT_PER_PAGE } = require("../../utils/constants");

const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const startIndex = (Number(page) - 1) * LIMIT_PER_PAGE;
    const total = await Post.countDocuments({});
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT_PER_PAGE)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      totalPage: Math.ceil(total / LIMIT_PER_PAGE),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  try {
    const { keyword } = req.query;
    const title = new RegExp(keyword, "i");
    const message = new RegExp(keyword, "i");
    const author = new RegExp(keyword, "i");
    const searchResults = await Post.find({
      $or: [{ title }, { message }, { author }],
    });
    if (searchResults) {
      res.status(200).json(searchResults);
    } else {
      res
        .status(404)
        .json({ message: "Can not find any posts with your keyword!!!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new Post({ ...post, authorId: req.userId });
    await newPost.save();
    const newComment = new Comment({ comments: [], postId: newPost._id });
    await newComment.save();
    const newLike = new Like({ likes: [], postId: newPost._id });
    await newLike.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const existedpost = await Post.findById(id);
    if (req.userId !== existedpost.authorId) {
      res
        .status(203)
        .json({ message: "Don't have permission to update this post" });
    } else {
      const post = req.body;
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: `No post with id: ${id}` });
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { ...post, _id: id },
        { new: true }
      );
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: `No post with id: ${id}` });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const existedpost = await Post.findById(id);
    if (req.userId !== existedpost.authorId) {
      res
        .status(203)
        .json({ message: "Don't have permission to delete this post" });
    } else {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: `No post with id: ${id}` });

      const deletedPost = await Post.findByIdAndRemove(id);
      await Comment.deleteOne({ postId: id });
      await Like.deleteOne({ postId: id });
      if (deletedPost) {
        res.status(200).json({ message: "Post deleted successfully." });
      } else {
        res.status(404).json({ message: `No post with id: ${id}` });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthenticated!!!" });
    }
    const likeRecord = await Like.findOne({ postId: id });
    if (likeRecord) {
      const isLikedByThisUser = likeRecord.likes.some(
        (like) => like.userId === String(req.userId)
      );
      const updatedLike = await Like.findOneAndUpdate(
        { postId: id },
        {
          $set: {
            likes: isLikedByThisUser
              ? likeRecord.likes.filter(
                  (like) => like.userId !== String(req.userId)
                )
              : [...likeRecord.likes, { ...req.body, userId: req.userId }],
          },
        },
        { new: true }
      );
      res.status(200).json(updatedLike);
    } else {
      res.status(404).json({ message: `No post with id: ${id}` });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getLikesPost = async (req, res) => {
  try {
    const { id } = req.params;
    const likes = await Like.findOne({ postId: id });
    if (likes) {
      res.status(200).json(likes);
    } else {
      res.status(404).json({ message: `No post with id: ${id}` });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body && id) {
      const commentRecord = await Comment.findOne({ postId: id });
      const updatedComment = await Comment.findOneAndUpdate(
        { postId: id },
        {
          $set: {
            comments: [...commentRecord.comments, req.body],
          },
        },
        { new: true }
      );
      res.status(200).json(updatedComment);
    } else {
      res
        .status(404)
        .json({ message: `No comment content or no post with id: ${id}` });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCommentsPost = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findOne({ postId: id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
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
};
