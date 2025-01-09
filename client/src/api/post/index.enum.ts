export enum POST_ENDPOINTS {
    create_post = "/post/create",
    create_post_with_img = "/post/create/:userId",
    getAllPost = "/post/all/:userId",
    deletepost = "/post/delete/:postId",
    likePost = "/post/like/:postId",
    unlikePost = "/post//unlike/:postId"
}