const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {createpostController,
       createpostwithimageController,
       updatePostController,
       getAllPostController,
       getUserPostController,
       deletePostController,
       likePostController,
       unlikePostController,
       getOnePostController
    } = require("../controllers/postcontroller")

//create post
router.post("/create",createpostController);

//create post with image
router.post("/create/:userId",upload.array("images",5),createpostwithimageController);

//update post
router.put("/update/:postId", upload.array('image'),updatePostController);

//get all posts
router.get("/all/:userId",getAllPostController);

//get one post 
router.get("/getonepost/:postId",getOnePostController)

//get user posts
router.get("/userposts/:userId",getUserPostController);

//delete post
router.delete("/delete/:postId",deletePostController);

//like post
router.post("/like/:postId",likePostController);

//unlike post 
router.post("/unlike/:postId",unlikePostController);

module.exports = router;