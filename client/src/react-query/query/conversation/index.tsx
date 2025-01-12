import { useQuery } from "@tanstack/react-query"
import { getConversationOfUser, getFindTwoUsersConversation } from "../../../api/conversation"
import { getConversationOfUserResponse } from "../../../api/conversation/index.type"

export const useGetConversationOfUser = (userId:string) => {
    return useQuery<getConversationOfUserResponse | undefined>({
        queryKey:["GetConversation-OfUser",userId],
        queryFn:()=>getConversationOfUser({userId})
    })
}

export const useGetFindTwoUsersConversation = () => {
    return useQuery({
        queryKey:["GetFindTwo-UsersConversation"],
        queryFn:getFindTwoUsersConversation
    })
}

