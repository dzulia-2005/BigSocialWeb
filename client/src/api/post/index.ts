import { httpClient } from ".."
import { POST_ENDPOINTS } from "./index.enum"
import { createPostType,  getallpostType,  getuserpostsType,  likePostType, unlikePostType } from "./index.type"


export const createPost = async({payload}:createPostType) => {
  try {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    const response =  await httpClient.post(POST_ENDPOINTS.create_post,payload,{
      headers:{
        Authorization: `Bearer ${accessToken}`,
        "X-Refresh-Token": refreshToken,
      }
    })

    return response.data || []
  } catch (error) {
    console.error(error)
  }
}





export const createPostImg = async({
  userId,
  payload
}:{
  userId: string;
  payload: FormData;
}) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const response = await httpClient.post(`/post/create/${userId}`,payload,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Refresh-Token": refreshToken,
        }
      })
      return response.data;
    } catch (error) {
      console.error(error)
    }

}





export const get_AllPost = async({userId}:{userId:string}):Promise<getallpostType[]> => {
  try {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")

    const response = await httpClient.get(`/post/all/${userId}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Refresh-Token": refreshToken,
      }
    })

    return response.data || []
  } catch (error) {
    console.error("Error fetching all posts :" ,error)
    return []
  }
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