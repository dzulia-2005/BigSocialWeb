const { CustomError } = require("../middlewares/errors");
const user = require("../models/user");
const post = require("../models/post");
const comment = require("../models/comment");
const story = require("../models/story");

const getUserController = async(req,res,next) => {
    const {userId} = req.params
    try {
        const User = await user.findById(userId);

        if (!User) {
            throw new CustomError("No user found!",404)
        }

        const {password,...data} = User;
        res.status(200).json(data._doc)
    } catch (error) {
        next(error)
    }
}

const updateUserController = async(req,res,next)=>{

    const {userId} = req.params;
    const updateData = req.body;
    try {
        const userToupdate = await user.findById(userId) 
        if(!userToupdate){
            throw new CustomError("user not found",404);
        }

        Object.assign(userToupdate,updateData);
        await userToupdate.save();

        res.status(200).json({message:"user updated successfully",user:userToupdate})


    } catch (error) {
        next(error)
    }
}

const followUserController = async (req, res, next) => {
    const { userId } = req.params;
    const { _id } = req.body;

    try {
        if (userId === _id) {
            throw new CustomError("You cannot follow yourself", 400);
        }

        const userToFollow = await user.findById(userId);
        const loggedInUser = await user.findById(_id);

        if (!userToFollow || !loggedInUser) {
            throw new CustomError("User not found", 404);
        }

        if (loggedInUser.following.includes(userId)) {
            throw new CustomError("Already following this user", 400);
        }

        loggedInUser.following.push(userId);
        userToFollow.followers.push(_id);

        await loggedInUser.save();
        await userToFollow.save();

        res.status(200).json({
            message: "Successfully followed user",
            userId,
            followerId: _id,
        });
    } catch (error) {
        next(error);
    }
};


const unfollowUserController = async (req, res, next) => {
    const { userId } = req.params;
    const { _id } = req.body;

    try {
        if (userId === _id) {
            throw new CustomError("You cannot unfollow yourself", 400);
        }

        const userToUnfollow = await user.findById(userId);
        const loggedInUser = await user.findById(_id);

        if (!userToUnfollow || !loggedInUser) {
            throw new CustomError("User not found", 404);
        }

        if (!loggedInUser.following.includes(userId)) {
            throw new CustomError("You are not following this user", 400);
        }

        loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userId);
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== _id);

        await loggedInUser.save();
        await userToUnfollow.save();

        res.status(200).json({
            message: "Successfully unfollowed user",
            userId,
            unfollowerId: _id,
        });
    } catch (error) {
        next(error);
    }
};




const deleteUserController = async(req,res,next) => {
    const {userId} = req.params;
    
    try {
        const UsertoDelete = await user.findById(userId);

        if(!UsertoDelete){
            throw new CustomError("User not found",404);
        }

        await post.deleteMany({user:userId});
        await post.deleteMany({"comment.user":userId});
        await post.deleteMany({"comment.replies.user":userId});
        await comment.deleteMany({user:userId});
        await story.deleteMany({user:userId});
        await post.updateMany({likes:userId},{$pull:{likes:userId}});
        await user.updateMany(
            {_id:{$in:UsertoDelete.following}},
            {$pull:{followers:userId}}
        );
        await comment.updateMany({},{$pull:{likes:userId}});
        await comment.updateMany(
            {"replies.likes":userId},
            {$pull:{"replies.likes":userId}}
        );
        await post.updateMany({},{$pull:{likes:userId}});
        
        const replyComments = await comment.find({"replies.user":userId});

        await Promise.all(
            replyComments.map(async(comments)=>{
                comments.replies = comments.replies.filter((reply)=>reply.user.toHexString() != userId);
                await comment.save();
            })
        )
        

        await UsertoDelete.deleteOne();
        res.status(200).json({message : "Everything associated with user is successfully"});


    } catch (error) {
        next(error)
    }
}


const searchUserController = async(req,res,next) => {
    const {query} = req.params;
    try {
        
        const users = await user.find({
            $or:[
                {username:{$regex:new RegExp(query,"i")}},
                {fullname:{$regex:new RegExp(query,"i")}}
            ]
        })
        res.status(200).json({users});

    } catch (error) {
        next(error);
    }
}

const generateFileUrl = (filename) => {
    return process.env.URL+`/uploads/${filename}`
}

const uploadProfilePictureController = async(req,res,next) => {
    const {userId} = req.params;
    const {filename} = req.file; 

    try {
        
        const User = await user.findByIdAndUpdate(userId,{profilePicture:generateFileUrl(filename)},{new:true});

        if(!User){
            throw new CustomError("user not found" , 404 );
        }

        res.status(200).json({message:"profile picture updated succesfully",User})

    } catch (error) {
        next(error);
    }
}

const uploadCoverPictureController = async(req,res,next) => {
    const {userId} = req.params;
    const {filename} = req.file; 
    
    try {
        
        const User = await user.findByIdAndUpdate(userId,{coverpicture:generateFileUrl(filename)},{new:true});
        if(!User){
            throw new CustomError("user not found" , 404 );
        }
        res.status(200).json({message:"cover picture updated succesfully",User})
    } catch (error) {
        next(error);
    }
}

module.exports = {getUserController,updateUserController,
                  followUserController,unfollowUserController,
                  deleteUserController,searchUserController,
                  uploadProfilePictureController,uploadCoverPictureController
                }