const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    post : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true
    },


    text : {
        type:String,
        required:true,
        trim:true
    },


    likes : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],


    replies:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },

        text : {
            type:String,
            required:true,
            trim:true
        },

        createAt : {
            type:Date,
            default:Date.now
        }
    }],

    createAt : {
        type:Date,
        default:Date.now
    }
})

const comment = mongoose.model("comment",commentSchema)
module.exports = comment