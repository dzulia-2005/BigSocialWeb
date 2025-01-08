export type createPostType = {
    payload:{
        userId:string;
        caption:string;
    }
}

export type createPostwithImgType = {
    payload : {
        caption:string;
        images:string;
    }
}

export type likePostType = {
    payload: {
        userId:string;
    }
}

export type unlikePostType = {
    payload : {
        userId:string;
    }
}

export type getuserpostsType = {
        _id: string,
        user: string,
        username: string,
        email: string,
        fullname: string,
        profilePicture: string,
        posts: { 
            _id: string;
            caption: string;
            image: string[];
            likes: string[];
            comment: string[];
            createdAt: string;
            updatedAt: string;
        }[], 
        followers: string[],
        following: string[],
    
}

export type getallpostType = {
    _id: string,
    user: string,
    username: string,
    email: string,
    fullname: string,
    profilePicture: string,
    posts: { 
        _id: string;
        caption: string;
        image: string[];
        likes: string[];
        comment: string[];
        createdAt: string;
        updatedAt: string;
    }[], 
    followers: string[],
    following: string[],

}