export type getUserResponse = {
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
            _id: string;
            username: string;
            email: string;
            password: string;
            profilePicture: string;
            posts: string[];
            followers: string[];
            following: string[];
            blocklist: string[];
            createdAt: string;
            updatedAt: string;
            __v: number;
            coverpicture: string;
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
  

  export type GetAllFollowers = {
    _id: string;
    username:  string;
    email:  string;
    createdAt:  string;
  }
  