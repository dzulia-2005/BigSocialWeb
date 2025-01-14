import { httpClient } from ".."
import { MESSAGE_ENDPOINT } from "./index.enum"
import { createMessageType, getMessageType } from "./index.type";

export const createMessage = async({payload}:createMessageType) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await httpClient.post(
            MESSAGE_ENDPOINT.createMessage,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "X-Refresh-Token": refreshToken,
                }
            }
        )

        return response.data


    } catch (error) {
        console.error("create Message Error",error)
        throw error
    }
}

export const getMessage = async({conversationId}:{conversationId:string}):Promise<getMessageType[] | undefined> => {
    if (!conversationId) {
        console.error("conversationId is missing");
        return [];
     }
   try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        console.log(conversationId,":conversationId");

        const response = await httpClient.get<getMessageType[]>(
            `/message/${conversationId}`,
            
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "X-Refresh-Token": refreshToken,
                }
            }
        )

        return response.data || []
   } catch (error) {
    console.error("getmessage error",error)
    
   }
}

export const deleteMessage = () => {
    return httpClient.delete(MESSAGE_ENDPOINT.delete).then((res)=>res.data);
}