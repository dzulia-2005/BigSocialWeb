const Post = require("../models/post");
const User = require("../models/user");
const {CustomError} = require("../middlewares/errors");

const createpostController = async(req,res,next) => {
    const {userId,caption} = req.body;

    try {
        
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("user not found",404);
        }
        const newPost = new Post({
            user:userId,
            caption
        })

        await newPost.save();
        user.posts.push(newPost._id);
        await user.save();
        res.status(201).json({message:"post created successfully",post:newPost});


    } catch (error) {
        next(error);
    }
}


const generateFileUrl = (filename) => {
    return process.env.URL+`/uploads/${filename}`
}
const createpostwithimageController = async (req, res, next) => {
    const { userId } = req.params;
    const { caption } = req.body;
    const files = req.files;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("User not found", 404);
        }

        
        const imageurl = files && files.length > 0 
            ? files.map((file) => generateFileUrl(file.filename)) 
            : [];

        const newPost = new Post({
            user: userId,
            caption,
            image: imageurl,
        });

        await newPost.save();

        user.posts.push(newPost._id);
        await user.save();
        
        const populatedPost = await newPost.populate([
            {
                path: "user",
                select: "username profilePicture",
            },
            {
                path: "comment",
                select: "text _id",
            },
        ]);

        res.status(201).json({
            message: "Post created successfully",
            post: populatedPost,
        });
    } catch (error) {
        next(error);
    }
};

const updatePostController = async (req, res, next) => {
    const { postId } = req.params;
    const { caption } = req.body;
    const images = req.files || []; 

    try {
       
        const updateToPost = await Post.findById(postId);
        if (!updateToPost) {
            throw new CustomError("Post not found", 404);
        }

        const updatedFields = {};
        
        
        if (caption) updatedFields.caption = caption;

        
        if (images.length > 0) {
            const newImages = images.map((file) => generateFileUrl(file.filename));
            updatedFields.image = newImages;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: updatedFields },
            { new: true }
        );

        res.status(201).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        next(error);
    }
};


const getAllPostController = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate("user", "profilePicture username") 
            .populate("comment"); 

        
        if (!posts || posts.length === 0) {
            return res.status(200).json({
                message: "No posts found",
                posts: [],
            });
        }

        res.status(200).json({
            message: "Posts fetched successfully",
            posts,
        });
    } catch (error) {
        next(error);
    }
};


const getUserPostController = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const posts = await Post.find({ user: userId })
            .populate("user", "profilePicture username") 
            .populate("comment"); 

        if (!posts || posts.length === 0) {
            return res.status(200).json({
                message: "No posts found for the user",
                posts: [],
            });
        }

        res.status(200).json({
            message: "User posts fetched successfully",
            posts,
        });
    } catch (error) {
        next(error);
    }
};

const deletePostController = async (req, res, next) => {
    const { postId } = req.params;

    try {
        const postToDelete = await Post.findById(postId);
        if (!postToDelete) {
            return next(new CustomError("Post not found", 404));
        }

        const user = await User.findById(postToDelete.user);
        if (!user) {
            return next(new CustomError("User not found", 404));
        }

        user.posts = user.posts.filter(
            (id) => id.toString() !== postToDelete._id.toString()
        );
        await user.save();

        await postToDelete.deleteOne();

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        next(error);
    }
};


const likePostController = async(req,res,next) => {
    const {postId} = req.params;
    const {userId} = req.body;

    try {
        const post = await Post.findById(postId);
        if(!post){
            throw new CustomError("Post not found",404);
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("user not found",404);
        }

        if (post.likes.includes(userId)){
            throw new CustomError("you have already liked this post",404);
        }

        post.likes.push(userId);
        await post.save();
        res.status(200).json({message:"post liked successfully"});
    } catch (error) {
        next(error)
    }
}


const unlikePostController = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new CustomError("Post not found", 404);
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("User not found", 404);
        }

        if (!post.likes.includes(userId)) {
            throw new CustomError("You have not liked this post yet", 400);
        }

        post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
        await post.save();

        res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
        next(error);
    }
};

const getOnePostController = async (req, res, next) => {
    try {
      const { postId } = req.params;
  
      
      const post = await Post.findById(postId)
      .populate("user", "profilePicture username") 
      .populate("comment"); 
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      next(error); 
    }
  };
  

module.exports = {
                  createpostController,
                  createpostwithimageController,
                  updatePostController,
                  getAllPostController,
                  getUserPostController,
                  deletePostController,
                  likePostController,
                  unlikePostController,
                  getOnePostController
                }