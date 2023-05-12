const express = require("express");

const LikesController = require("../controllers/likes");
const middleWareCheckAllowed = require("../middleware/check-allowed");

const router = express.Router();


router.post("", middleWareCheckAllowed, LikesController.likePost);

// router.get("", UserController.createUser);


module.exports = router;