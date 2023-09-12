const express = require("express");
const postRouter = express.Router();

const postController = require("../controllers/post.controller.js");

postRouter.post("/", postController.addPost);
postRouter.get("/all", postController.getAllPost);
postRouter.get("/", postController.getPost);
postRouter.put("/", postController.updatePost);
postRouter.delete("/", postController.deletePost);

module.exports = postRouter;
