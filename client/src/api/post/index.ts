import { httpClient } from ".."
import { POST_ENDPOINTS } from "./index.enum"
import { createPostType,  getallpostType,  getonePostType,  getuserpostsType,} from "./index.type"


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
  payload,
  
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
  


export const delete_post = async({postId}:{postId:string}) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "X-Refresh-Token": refreshToken,
    }

    const response = await httpClient.delete(
      POST_ENDPOINTS.deletepost.replace(":postId",postId),
      {headers}
    )

    return response.data
  } catch (error) {
    console.error("error delete post",error)
    throw error
  }
}



export const like_post = async({userId,postId}:{ userId?:string;postId:string }) => {
  try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "X-Refresh-Token": refreshToken,
      }

      const response = await httpClient.post(
            POST_ENDPOINTS.likePost.replace(':postId',postId),
            {userId},
            {headers}
        )

      return response.data
  } catch (error) {
    console.error("Error liking the post:", error);
    throw error
  }
}


export const unlike_post = async({userId,postId}:{userId?:string,postId:string}) => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");

          const headers = {
            Authorization: `Bearer ${accessToken}`,
            "X-Refresh-Token": refreshToken,
          }

          const response = await httpClient.post(
            POST_ENDPOINTS.unlikePost.replace(":postId",postId),
            {userId},
            {headers}
          )

          return response.data
        } catch (error) {
          console.error("Error unlike the post",error)
          throw error
        }
        
}


export const getOnePost = async ({ postId }: { postId: string }): Promise<getonePostType[] | undefined> => {
  if (!postId) {
    console.error("Post ID is undefined");
    return undefined;
  }

  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await httpClient.get(
      POST_ENDPOINTS.getonePost.replace(":postId", postId),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Refresh-Token": refreshToken,
        },
      }
    );

    return response.data || [];
  } catch (error) {
    console.error("Error fetching post details:", error);
  }
};

export const updatePost = async ({ payload }: { payload: FormData }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await httpClient.put(
      POST_ENDPOINTS.updatePost.replace(":postId", payload.get("postId") as string),
      payload, // პირდაპირ ვიყენებთ გადაცემულ FormData ობიექტს
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Refresh-Token": refreshToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("updatePost error", error);
    throw error;
  }
};
