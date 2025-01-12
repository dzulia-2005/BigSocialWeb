export type createConversationType = {
    payload : {
        firstUser:string;
        secondUser:string;
    }
}

export type getConversationOfUserResponse = {
    _id: string;
    participants: [
        string,
        string
    ],
}

export type getFindTwoUsersConversationResponse = {
    _id: string;
    participants: [
        string,
        string
    ],
}