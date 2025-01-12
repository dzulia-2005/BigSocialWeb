import { httpClient } from ".."
import { CONVERSATION_ENDPOINT } from "./index.enum"
import { createConversationType, getConversationOfUserResponse, getFindTwoUsersConversationResponse } from "./index.type";

export const createNewConversation = ({payload}:createConversationType) => {
    return httpClient.post(CONVERSATION_ENDPOINT.createNewConversation,payload).then((res)=>res.data);
}

export const getConversationOfUser = () => {
    return httpClient.get<getConversationOfUserResponse>(CONVERSATION_ENDPOINT.getConversationOfUser).then((res)=>res.data);
}

export const getFindTwoUsersConversation = () => {
    return httpClient.get<getFindTwoUsersConversationResponse>(CONVERSATION_ENDPOINT.findTwoUsersConversation).then((res)=>res.data);
}

export const deleteConversation = () => {
    return httpClient.delete(CONVERSATION_ENDPOINT.deleteConversation).then((res)=>res.data);
}

