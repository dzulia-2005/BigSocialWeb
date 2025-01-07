const Message = require("../models/message");

const createMessageConversation = async(req,res,next) => {
    const newMessage = new Message(req.body);

    try {

        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);

    } catch (error) {
        next(error);
    }
}

const getMessagesController = async(req,res,next) => {
    try {

        const message = await Message.find({
            conversationId:req.params.conversationId
        })

        res.status(200).json(message);

    } catch (error) {
        next(error);
    }
}

const deleteMessageConversation = async(req,res,next) => {
    try {
        await Message.findByIdAndDelete(req.params.messageId)
        res.status(200).json({message:"message delete successfully"});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createMessageConversation,
    getMessagesController,
    deleteMessageConversation
}