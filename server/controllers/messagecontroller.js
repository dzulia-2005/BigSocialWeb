const Message = require("../models/message");


const createMessageConversation = async (req, res, next) => {
    try {
      const newMessage = new Message(req.body);
      const savedMessage = await newMessage.save();
  
      const populatedMessage = await Message.findById(savedMessage._id)
        .populate('user', 'profilePicture')  
        .populate('sender', 'profilePicture'); 
  
      res.status(200).json(populatedMessage);
    } catch (error) {
      next(error);
    }
  };


  const getMessagesController = async (req, res, next) => {
    
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        .populate('user', 'profilePicture')
        .populate('sender', 'profilePicture');

       
        if (!message || message.length === 0) {
            return res.status(200).json([]); 
        }

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