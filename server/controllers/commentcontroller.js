const Comment = require("../models/comment");
const Post = require("../models/post.js");
const User = require("../models/user");
const {CustomError} = require("../middlewares/errors.js");

const CreateCommentController = async(req,res,next) => {
    const {postId,userId,text} = req.body;

    try {
        
        const post = await Post.findById(postId);
        if (!post) {
            throw new CustomError("post not found",404);
        }
        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("user not found");
        }

        const newComment = new Comment({
            user:userId,
            post:postId,
            text
        })

        await newComment.save();
        post.comment.push(newComment._id);
        await post.save();

        res.status(201).json({message:"comment added to the post",comment:newComment});

    } catch (error) {
        next(error);
    }

}

const populateUserDetails = async(comments) => {
    for(const comment of comments){
        await comment.populate("user","username fullname profilepicture")
        if (comment.replies.length>0) {
            await comment.populate("replies.user","username fullname profilepicture")
        }
    }   
}


const getCommentsByPostController = async(req,res,next) => {
    const {postId} = req.params;

    try {
        const post = await Post.findById(postId);
        if(!post){
            throw new CustomError("comment not found",404)
        }

        let comments = await Comment.find({post:postId});

        await populateUserDetails(comments);

        res.status(200).json({comments});


    } catch (error) {
        next(error);
    }
}

const DeleteCommentController = async(req,res,next) => {
    const {commentId} = req.params;

    try {
        const comment = await Comment.findById(commentId);
        if(!comment){
            throw new CustomError("comment not found",404);
        }

        await Post.findOneAndUpdate(
            {comments:commentId},
            {$pull:{comments:commentId}},
            {new:true}
        )

        await comment.deleteOne();
        res.status(200).json({message:"comment has been deleted"});

    } catch (error) {
        next(error);
    }
}

module.exports = {CreateCommentController,getCommentsByPostController,DeleteCommentController}