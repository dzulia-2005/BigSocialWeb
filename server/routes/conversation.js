const express = require("express");
const router = express.Router();
const {
    createNewConversationController,
    getConversationOFuserController,
    getTwoUserConversationController,
    deleteConversationController
} = require("../controllers/conversationcontroller");

//new Conversation
router.post("/create",createNewConversationController);

//get conversation of user
router.get("/:userId",getConversationOFuserController);

//find two users conversation
router.get("/:firstUserId/:secondUserId",getTwoUserConversationController);

//delete conversation
router.delete("/delete/:conversationId",deleteConversationController);

module.exports =router;

