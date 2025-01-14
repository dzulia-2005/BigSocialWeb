const mongoose = require("mongoose");

const conversationschema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }],
})

const conversation = mongoose.model("conversation",conversationschema);
module.exports = conversation;