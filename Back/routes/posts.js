const express = require("express");
const checkAuth = require("../middleware/check-auth");

const checkAllowed = require("../middleware/check-allowed");

const extractFile = require("../middleware/file");
const PostController = require("../controllers/posts");

const router = express.Router();


router.post(
    "", checkAuth,
    extractFile,
    PostController.createPost
);

router.put(
    "/:id",
    checkAuth,
    extractFile,
    PostController.updatePost
);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPostById);

router.delete("/:id", checkAuth, PostController.deletePost);

router.post("/like/:id", checkAllowed, checkAuth, PostController.postLike);

module.exports = router;
