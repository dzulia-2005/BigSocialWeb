const express = require("express");
const router = express.Router();
const {CreateCommentController,getCommentsByPostController,DeleteCommentController} = require("../controllers/commentcontroller");

//create comment
router.post("/create",CreateCommentController);

//get all post comments
router.get("/post/:postId",getCommentsByPostController);

//delete comment
router.get("/delete/:commentId",DeleteCommentController);


module.exports = router;