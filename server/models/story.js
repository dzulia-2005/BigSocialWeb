const mongoose = require("mongoose");

const storyschema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    text : {
        type:String,
        required:true,
        trim:true
    },

    image : {
        type:String,
        required:false,
    }
})

const story = mongoose.model("stroy", storyschema)
module.exports = story;
