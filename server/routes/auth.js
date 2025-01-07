const express = require("express");
const router = express.Router();
const {
    registerController,
    loginControllers,
    logoutControllers,
    refetchuserControllers,
    refreshTokenController
}=require("../controllers/authcontroller")


//register
router.post("/register",registerController);

//login
router.post("/login",loginControllers);

//logout
router.get("/logout",logoutControllers);

//fetch current user
router.get("/refetch",refetchuserControllers);

//refreshT0ken route
router.post("/refresh",refreshTokenController)


module.exports = router