import { httpClient } from ".."
import { COMMENTS_ENDPOINT } from "./index.enum"
import { getAllCommentType } from "./index.type";




export const createComment = async(payload:{
    userId: string;
    postId: string;
    text: string;
})=> {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");


        const response = await httpClient.post(COMMENTS_ENDPOINT.createComment,payload,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Refresh-Token": refreshToken,
            }
        })

        return response.data
    } catch (error) {
        console.error("comment error ",error)
        throw error
    }        
}



export const deleteComment = () => {
    return httpClient
        .get(COMMENTS_ENDPOINT.deleteComment)
        .then((res)=>res.data)
}

export const getAllComment = async(postId?: string):Promise<getAllCommentType[]> => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await httpClient.get(
            `/comments/${postId}`,
            {
                headers : {
                    Authorization: `Bearer ${accessToken}`,
                    "X-Refresh-Token": refreshToken,
                }
            }
    )

        return response.data || []

    } catch (error) {
        console.error("Error get all comment post ",error);
        throw error
    }
}

