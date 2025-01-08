export type LoginPayload = {
    payload: {
        email:string;
        password:string;
    }
}

export type SignUpPayload = {
    payload :{
        username:string;
        email:string;
        password:string
    }
}

export type meResponse = {
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

export type refreshPayload = {
   payload:{
        refreshToken : string;
   }
}