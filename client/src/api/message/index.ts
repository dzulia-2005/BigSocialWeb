import { httpClient } from ".."
import { MESSAGE_ENDPOINT } from "./index.enum"
import { createMessageType, getMessageType } from "./index.type";

export const createMessage = ({payload}:createMessageType) => {
    return httpClient.post(MESSAGE_ENDPOINT.createMessage,payload).then((res)=>res.data);
}

export const getMessage = () => {
    return httpClient.get<getMessageType>(MESSAGE_ENDPOINT.getMessage).then((res)=>res.data);
}

export const deleteMessage = () => {
    return httpClient.delete(MESSAGE_ENDPOINT.delete).then((res)=>res.data);
}