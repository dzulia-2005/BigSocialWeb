const Conversation = require("../models/conversation");
const CustomError = require("../middlewares/errors");
const Message = require("../models/message");

const createNewConversationController = async(req,res,next) => {
    try {
        let newConversation;
        if (req.body.firstUser !== req.body.secondUser) {
            newConversation = new Conversation({
                participants:[req.body.firstUser,req.body.secondUser]
            });
        }else{
            throw new CustomError("sender and reciver can`t be same",400);
        }

        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation)
    } catch (error) {
        next(error);
    }
}

const getConversationOFuserController = async(req,res,next) => {

    try {
        const conversation = await Conversation.find({
            participants:{$in:[req.params.userId]}
        })
        res.status(200).json(conversation);

    } catch (error) {
        next(error);
    }
}

const getTwoUserConversationController = async(req,res,next) => {
    try {
        const conversation = await Conversation.find({
            participants:{$all:[req.params.firstUserId,req.params.secondUserId]},
        })
        res.status(200).json(conversation);
    } catch (error) {
        next(error);
    }
}

const deleteConversationController = async(req,res,next) => {
    const conversationId = req.params.conversationId
    try {
        await Conversation.deleteOne({_id:conversationId});
        await Message.deleteMany({conversationId:conversationId});

        res.status(200).json({message:"conversation deleted successfully"});

    } catch (error) {
        next(error);
    }
}


module.exports = {
    createNewConversationController,
    getConversationOFuserController,
    getTwoUserConversationController,
    deleteConversationController
};