/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from ".."
import { USER_ENDPOINTS } from "./index.enum"
import { followUser, getUserResponse, searchUser, unfollowUser, UpdateCoverPicType, UpdateProfilePicType, } from "./index.types"


export const getUser = () => {
    return httpClient
        .get<getUserResponse>(USER_ENDPOINTS.Get_user)
        .then((res)=>res.data)
}

export const FollowUser = ({payload}:followUser) => {
    return httpClient
        .post(USER_ENDPOINTS.Follow_User,payload)
        .then((res)=>res.data)
}

export const UnfollowUser = ({payload}:unfollowUser) => {
    return httpClient
        .post(USER_ENDPOINTS.Unfollow_user,payload)
        .then((res)=>res.data)
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