const express = require("express");
const postRouter = express.Router();
const PostController = require("../../controllers/postController");
const upload = require("../../utils/fileUpload");

postRouter.post("/create", upload.single("image"), PostController.createPost);

postRouter.get("", PostController.getAllPosts);

postRouter.put("/:id", PostController.updatePost);

postRouter.get("/:id", PostController.getPost);

postRouter.delete("/:id", PostController.deletePost);

module.exports = postRouter;
