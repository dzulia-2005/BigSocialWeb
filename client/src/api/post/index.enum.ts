export enum POST_ENDPOINTS {
    create_post = "/post/create",
    create_post_with_img = "/post/create/:userId",
    getAllPost = "/post/all/:userId",
    getUserPost = "/post/userposts/:userId",
    deletepost = "/post/delete/:postId",
    likePost = "/post/unlike/:postId",
    unlikePost = "/post//unlike/:postId"
}