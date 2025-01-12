const Conversation = require("../models/conversation");
const CustomError = require("../middlewares/errors");
const Message = require("../models/message");

const createNewConversationController = async (req, res, next) => {
    try {
      if (req.body.firstUser === req.body.secondUser) {
        throw new CustomError("Sender and receiver can't be the same", 400);
      }
  
      const newConversation = new Conversation({
        participants: [req.body.firstUser, req.body.secondUser],
      });
  
      const savedConversation = await newConversation.save();
  
      const populatedConversation = await Conversation.findById(savedConversation._id)
        .populate({
          path: "participants",
          select: "username email profilePicture",
        });
  
      res.status(201).json(populatedConversation);
    } catch (error) {
      next(error);
    }
  };

  const getConversationOFuserController = async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        participants: { $in: [req.params.userId] },
      }).populate({
        path: "participants", 
        select: "username email profilePicture", 
      });
  
      res.status(200).json(conversations);
    } catch (error) {
      next(error);
    }
  };

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