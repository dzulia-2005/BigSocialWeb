export enum MESSAGE_ENDPOINT {
    createMessage = "/message/create",
    getMessage = "/message/:conversationId",
    delete = "/message/:messageId"
}