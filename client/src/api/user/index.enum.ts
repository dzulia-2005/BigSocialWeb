export enum USER_ENDPOINTS {
    Get_user = `/user/:userId`,
    Update_User = "/user/update/:userId",
    Follow_User = "/user/follow/:userId",
    Unfollow_user = "/user/unfollow/:userId",
    UpdateProfilePic = `/user/update-profile-picture/:userId`,
    UpdateCoverPic = "/user/update-cover-picture/:userId",
    getallFollower = "/user/followers/:userId"
}