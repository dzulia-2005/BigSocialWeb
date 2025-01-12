export type createConversationType = {
    payload : {
        firstUser:string;
        secondUser:string;
    }
}

export type Participant = {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
  };
  
  export type getConversationOfUserResponse = {
    _id: string;
    participants: Participant[]; // ეს არის ობიექტების მასივი, არა მხოლოდ string[]
  }[];

export type getFindTwoUsersConversationResponse = {
    _id: string;
    participants: [
        string,
        string
    ],
}