const asyncHandler = require("express-async-handler");  
const Post = require("../models/Posts/Posts");
const Category = require("../models/Category/Category");

const PostController = {
  createPost: asyncHandler(async (req, res) => {
    const postBody = req.body;

    const postCreated = await Post.create({ ...postBody, image: req.file , author: req.user});
    const categoryFound = await Category.findById(postBody.category);
    if (!categoryFound) throw new Error("Category not found");
    categoryFound.posts.push(postCreated?._id);
    await categoryFound.save();

    res.send({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  }),
  getAllPosts: asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("category"); // it will return ctegory object with posts array
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
