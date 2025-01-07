const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    caption : {
        type:String,
        trim:true
    },

    image : [{
        type:String,
        required: false
    }],

    likes : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],

    comment : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
},{timestamps:true})

const post = mongoose.model("post",postSchema);
module.exports = post;
