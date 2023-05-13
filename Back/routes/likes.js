const express = require("express");

const LikesController = require("../controllers/likes");
const middleWareCheckAllowed = require("../middleware/check-allowed");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.post("", middleWareCheckAllowed, checkAuth, LikesController.likePost);

router.get("", middleWareCheckAllowed, checkAuth, LikesController.GetAllUserLikes);

// router.get("", UserController.createUser);


module.exports = router;