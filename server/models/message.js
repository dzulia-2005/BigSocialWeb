const mongoose = require("mongoose");

const messageschema = new mongoose.Schema({
    conversationId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"conversation",
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
      },
    sender : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    text : {
        type : String,
        required : true
    },

},{timestamps:true});

const message = mongoose.model("message", messageschema)
module.exports = message;