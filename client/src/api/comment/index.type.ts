export type createCommentType = {
    payload: {
        userId:string ;
        postId:string;
        text:string;
    }
}


export type getAllCommentType = {
        user: {
            _id: string;
            username: string;
            profilePicture: string;
        },
        post: string;
        text: string;
        likes: [],
        _id: string;
        replies: [],
        createAt:string;
}