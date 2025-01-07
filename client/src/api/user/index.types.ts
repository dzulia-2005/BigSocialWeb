export type getUserResponse = {
    _id: string;
    username: string;
    email: string;
    fullname: string;
    profilePicture: string;
    posts: string[]; 
    followers: string[]; 
    following: string[];
}

export type followUser = {
    payload:{
        _id:string
    }
}

export type unfollowUser = {
    payload:{
        _id:string
    }
}

export type searchUser = {
    users: [
        {
            _id: string
            username:string
            email: string
            password: string
            profilePicture: string
            posts: [],
            followers: [],
            following: [],
            blocklist: [],
            createdAt: string
            updatedAt: string
            __v: number
        }
    ]
}

export type UpdateProfilePicType = {
    payload: {
      profilePicture: File;
      _id: string;
    };
  };
  
  export type UpdateCoverPicType = {
    payload: {
      coverpicture: File;
      _id: string;
    };
  };
  