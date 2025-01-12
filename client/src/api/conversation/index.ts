import { httpClient } from ".."
import { CONVERSATION_ENDPOINT } from "./index.enum"
import { createConversationType, getConversationOfUserResponse, getFindTwoUsersConversationResponse } from "./index.type";

export const createNewConversation = ({payload}:createConversationType) => {
    return httpClient.post(CONVERSATION_ENDPOINT.createNewConversation,payload).then((res)=>res.data);
}

export const getConversationOfUser = async({userId}:{userId:string}) => {
   try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken")

   const response = await httpClient.get<getConversationOfUserResponse>(CONVERSATION_ENDPOINT.getConversationOfUser.replace(":userId",userId),
    {
        headers:{
            Authorization: `Bearer ${accessToken}`,
            "X-Refresh-Token": refreshToken,
        }
    }
   );

   return response.data
   } catch (error) {
    console.error("getConversation error",error)
   }
}

export const getFindTwoUsersConversation = () => {
    return httpClient.get<getFindTwoUsersConversationResponse>(CONVERSATION_ENDPOINT.findTwoUsersConversation).then((res)=>res.data);
}

export const deleteConversation = () => {
    return httpClient.delete(CONVERSATION_ENDPOINT.deleteConversation).then((res)=>res.data);
}

