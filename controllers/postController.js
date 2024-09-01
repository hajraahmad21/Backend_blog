const asyncHandler = require("express-async-handler");
const Post = require("../models/Posts/Posts");

const PostController = {
  createPost: asyncHandler(async (req, res) => {
    const postBody = req.body;
    const { title } = req.body;
    const postFound = await Post.findOne({ title });
    if (postFound) throw new Error("Post already exists");
    const postCreated = await Post.create(postBody);

    res.send({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  }),
  getAllPosts: asyncHandler(async (req, res) => {
    const posts = await Post.find({});
    res.send({
      status: "success",
      message: "Posts fetched successfully",
      posts,
    });
  }),
  updatePost: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const postFound = Post.findById(id);
    if (!postFound) throw new Error("Post not found");
    const postUpdated = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({
      status: "success",
      message: "Post updated successfully",
      postUpdated,
    });
  }),
  getPost: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");
    res.send({
      status: "success",
      message: "Post fetched successfully",
      post,
    });
  }),
  deletePost: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const postFound = await Post.findById(id);

    if (!postFound) {
      console.log("not found");
      throw new Error("Post not found");
    }
    const postDeleted = await Post.findByIdAndDelete(id);
    res.send({
      status: "success",
      message: "Post deleted successfully",
      postDeleted,
    });
  }),
};
module.exports = PostController;
