export type createMessageType = {
    payload: {
        conversationId:string;
        sender:string;
        text:string;
    }
}


export type getMessageType = {
   _id: string;
   conversationId: string;
   sender: {
    _id: string;
    profilePicture: string;
   },
   text: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
   profilePicture:string;
};

