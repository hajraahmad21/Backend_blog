const express = require("express");

const postRouter = express.Router();

const PostController = require("../../controllers/postController");

postRouter.post("/create", PostController.createPost);

postRouter.get("", PostController.getAllPosts);

postRouter.put("/:id", PostController.updatePost);

postRouter.get("/:id", PostController.getPost);

postRouter.delete("/:id", PostController.deletePost);

module.exports = postRouter;
