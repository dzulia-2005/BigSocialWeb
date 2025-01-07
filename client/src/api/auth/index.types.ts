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
    _id: string;
    username: string;
    email: string;
    fullname: string;
    profilePicture: string;
    coverpicture:string;
    posts: string[]; 
    followers: string[]; 
    following: string[];
}

export type refreshPayload = {
   payload:{
        refreshToken : string;
   }
}