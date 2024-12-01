const asyncHandler = require("express-async-handler");
const Post = require("../models/Posts/Posts");
const Category = require("../models/Category/Category");
const User = require("../models/User/User");

const PostController = {
  createPost: asyncHandler(async (req, res) => {
    const postBody = req.body;

    const postCreated = await Post.create({
      ...postBody,
      image: req.file,
      author: req.user,
    });
    const categoryFound = await Category.findById(postBody.category);
    const user = await User.findById(req.user);
    if (!categoryFound) throw new Error("Category not found");
    if (!user) throw new Error("User not found");
    categoryFound.posts.push(postCreated?._id);
    user.posts.push(postCreated?._id);
    await categoryFound.save();
    await user.save();

    res.send({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  }),
  getAllPosts: asyncHandler(async (req, res) => {
    const { category, description, page = 1, limit = 10 } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (description) filter.description = { $regex: description, $options: "i" }; // where { $regex: title, $options: "i" }; is mongoDB query to get posts by title but case insensitive
    const posts = await Post.find(filter)
      .populate("category") // it will return ctegory object with posts array 
      .sort({ createdAt: -1 }) //and sort function will sort and return  new posts before
      .skip((page - 1) * limit) //and sort function will sort and return  new posts before
      .limit(limit);  // and limit will show how many we want to show per request
    const totalPosts = await Post.find(filter).countDocuments(filter);
    res.send({
      status: "success",
      message: "Posts fetched successfully",
      posts,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalPosts / limit),
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
