import { useQuery } from "@tanstack/react-query"
import { getMessage } from "../../../api/message"
import { getMessageType } from "../../../api/message/index.type"

export const useGetMessage = (conversationId:string) => {
    return useQuery<getMessageType | undefined>({
        queryKey:["get-message",conversationId],
        queryFn:()=>getMessage({conversationId})
    })
}