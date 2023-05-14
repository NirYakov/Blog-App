const express = require("express");

const LikesController = require("../controllers/likes");
const checkAllowed = require("../middleware/check-allowed");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


// router.post("", middleWareCheckAllowed, checkAuth, LikesController.likePost);

router.get("", checkAllowed, checkAuth, LikesController.GetAllUserLikes);

router.post("/:id", checkAllowed, checkAuth, LikesController.likePost);

// router.get("", UserController.createUser);


module.exports = router;