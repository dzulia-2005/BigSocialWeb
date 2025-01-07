import { httpClient } from ".."
import { POST_ENDPOINTS } from "./index.enum"
import { createPostType, createPostwithImgType,  getuserpostsType,  likePostType, unlikePostType } from "./index.type"
export const createPost = ({payload}:createPostType) => {
    return httpClient
        .post(POST_ENDPOINTS.create_post,payload)
        .then((res)=>res.data)
}

export const createPostImg = ({payload}:createPostwithImgType) => {
    return httpClient
        .post(POST_ENDPOINTS.create_post_with_img,payload)
        .then((res)=>res.data)
}

export const get_AllPost = () => {
    return httpClient 
        .get(POST_ENDPOINTS.getAllPost)
        .then((res)=>res.data)
}

export const get_UserPost = async ({ userId }: { userId: string }): Promise<getuserpostsType[]> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
  
      const response = await httpClient.get(`/post/userposts/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Refresh-Token": refreshToken,
        },
      });
  
      return response.data || []; 
    } catch (error) {
      console.error("Error fetching user posts:", error);
      return []; 
    }
  };
  

export const delete_post = () => {
    return httpClient
        .delete(POST_ENDPOINTS.deletepost)
        .then((res)=>res.data)
}

export const like_post = ({payload}:likePostType) => {
    return httpClient 
        .post(POST_ENDPOINTS.likePost,payload)
        .then((res)=>res.data)
}

export const unlike_post = ({payload}:unlikePostType) => {
    return httpClient 
        .post(POST_ENDPOINTS.unlikePost,payload)
        .then((res)=>res.data)
}