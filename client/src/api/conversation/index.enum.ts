export enum CONVERSATION_ENDPOINT {
    createNewConversation = "/conversation/create",
    getConversationOfUser = "/conversation/:userId",
    findTwoUsersConversation = "/conversation/:firstUserId/:secondUserId",
    deleteConversation = "/conversation/delete/:conversationId"
}