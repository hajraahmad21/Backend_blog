const express = require("express");
const postRouter = express.Router();
const PostController = require("../../controllers/postController");
const upload = require("../../utils/fileUpload");
const isAuthenticated = require("../../middlewares/isAuthenticated");

postRouter.post("/create",isAuthenticated, upload.single("image"), PostController.createPost);

postRouter.get("",isAuthenticated, PostController.getAllPosts);

postRouter.put("/:id",isAuthenticated, PostController.updatePost);

postRouter.get("/:id",isAuthenticated, PostController.getPost);

postRouter.delete("/:id",isAuthenticated, PostController.deletePost);

module.exports = postRouter;
