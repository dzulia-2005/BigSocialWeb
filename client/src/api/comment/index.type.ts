export type createCommentType = {
    payload: {
        userId:string ;
        postId:string;
        text:string;
    }
}


export type getAllCommentType = {
    _id:string;
    user: {
        _id: string;
        username: string;
        profilePicture:string;
    },
    post: string;
    text: string;
    likes: [],
    replies: [],
    createAt:string;
    
}