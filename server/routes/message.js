const express = require("express");
const router = express.Router();
const {
    createMessageConversation,
    getMessagesController,
    deleteMessageConversation
} = require("../controllers/messagecontroller")

//create message
router.post("/create",createMessageConversation)

//get message
router.get("/:conversationId",getMessagesController)

//delete message
router.delete("/:messageId",deleteMessageConversation)

module.exports = router;