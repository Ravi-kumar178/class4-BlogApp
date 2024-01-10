const express = require("express");
const router = express.Router();

//import controller
const {postComment} = require("../controllers/commentController");
const {postCreated, getPost} = require("../controllers/postController");
const { likePost, unlikePost } = require("../controllers/likeController");


//mapping
router.post("/comments/create",postComment);
router.post("/post/create",postCreated);
router.get("/posts",getPost);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);

//export router
module.exports = router;