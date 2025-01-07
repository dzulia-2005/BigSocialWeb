const express = require("express");
const {
    getUserController,
    updateUserController,
    followUserController,
    unfollowUserController,
    deleteUserController,
    searchUserController,
    uploadProfilePictureController,
    uploadCoverPictureController
} = require("../controllers/usercontroller");
const upload = require("../middlewares/upload")
const router = express.Router();
const {verifyToken} = require('../middlewares/verifyToken')



//get user
router.get("/:userId",getUserController);

//update user
router.put("/update/:userId",updateUserController);

//follow user
router.post("/follow/:userId",followUserController);

//unfollow user
router.post("/unfollow/:userId",unfollowUserController);

//delete user
router.delete("/delete/:userId",deleteUserController)

//search user
router.get("/search/:query",searchUserController)

//update profile picture
router.put("/update-profile-picture/:userId",upload.single("profilepicture"),uploadProfilePictureController)

//update cover picture
router.put("/update-cover-picture/:userId",upload.single("coverpicture"),uploadCoverPictureController)

module.exports = router;

