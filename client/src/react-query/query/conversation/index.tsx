import { useQuery } from "@tanstack/react-query"
import { getConversationOfUser, getFindTwoUsersConversation } from "../../../api/conversation"

export const useGetConversationOfUser = () => {
    return useQuery({
        queryKey:["GetConversation-OfUser"],
        queryFn:getConversationOfUser
    })
}

export const useGetFindTwoUsersConversation = () => {
    return useQuery({
        queryKey:["GetFindTwo-UsersConversation"],
        queryFn:getFindTwoUsersConversation
    })
}

