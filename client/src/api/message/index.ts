import { httpClient } from ".."
import { MESSAGE_ENDPOINT } from "./index.enum"
import { createMessageType, getMessageType } from "./index.type";

export const createMessage = ({payload}:createMessageType) => {
    return httpClient.post(MESSAGE_ENDPOINT.createMessage,payload).then((res)=>res.data);
}

export const getMessage = async({conversationId}:{conversationId:string}) => {
   try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await httpClient.get<getMessageType>(
            MESSAGE_ENDPOINT.getMessage.replace(":conversationId",conversationId),
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "X-Refresh-Token": refreshToken,
                }
            }
        )

        return response.data
   } catch (error) {
    console.error("getmessage error",error)
   }
}

export const deleteMessage = () => {
    return httpClient.delete(MESSAGE_ENDPOINT.delete).then((res)=>res.data);
}