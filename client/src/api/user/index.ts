/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from ".."
import { USER_ENDPOINTS } from "./index.enum"
import {  getUserResponse, searchUser, UpdateCoverPicType, UpdateProfilePicType, } from "./index.types"


export const getUser = async({userId}:{userId:string}):Promise<getUserResponse> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await httpClient.get(
      USER_ENDPOINTS.Get_user.replace(":userId",userId),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Refresh-Token": refreshToken,
        }
      }
    )

    return response.data || []

  } catch (error) {
    console.error("get user Error",error)
    throw error
  }
}

export const FollowUser = async({
  userId
  ,_id
}:{
  userId:string;
  _id:string;
}) => {
  try {
    const accessToken =  localStorage.getItem("accessToken");
    const refreshToken =  localStorage.getItem("refreshToken")


    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "X-Refresh-Token": refreshToken,
    }

    const response = await  httpClient.post(
      USER_ENDPOINTS.Follow_User.replace(":userId",userId),
      {_id},
      {headers}
    )

    return response.data || []
  } catch (error) {
    console.error("follow user error",error)
    throw error
  }
}

export const UnfollowUser = async({
  userId,
  _id
}:{
  userId:string;
  _id:string
}) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");


      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "X-Refresh-Token": refreshToken,
      }

      const response = await httpClient.post(
          USER_ENDPOINTS.Unfollow_user.replace(":userId",userId),
          {_id},
          {headers}
        )

      return response.data || []
    } catch (error) {
      console.error("unfollow user error",error)
      throw error
    }
}





export const SearchUser = async ({ query }: { query: string }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
  
      if (!query) {
        console.warn("Query is empty. Skipping request.");
        return [];
      }
  
      const response = await httpClient.get<searchUser[]>(
        `/user/search/${query}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Refresh-Token": refreshToken,
          },
        }
      );
  
      return response.data;
    } catch (error:any) {
      if (error.response?.status === 404) {
        console.error("No users found for the query.");
      } else {
        console.error("SearchUser Error:", error.message);
      }
  
      throw error; 
    }
  };
  


export const UpdateProfilePic = async ({ payload }: UpdateProfilePicType) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const formData = new FormData();
        formData.append("profilepicture", payload.profilePicture);
        
        const response = await httpClient.put(
            `/user/update-profile-picture/${payload._id}`, 
            formData, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,  
                    "X-Refresh-Token": refreshToken, 
                }
            }
        );

        console.log(response);
        return response.data;  
    } catch (error) {
        console.error("Error updating profile picture:", error);  
        throw error;  
    }
};

  
  export const UpdateCoverProfPic = async({ payload }: UpdateCoverPicType) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const formData = new FormData();
        formData.append("coverpicture",payload.coverpicture);

        const response = await httpClient.put(
            `/user/update-cover-picture/${payload._id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "X-Refresh-Token": refreshToken
                }
            }
        )

        console.log(response)
        return response.data

    } catch (error) {
        console.error("Error updating cover picture",error)
    }
  };