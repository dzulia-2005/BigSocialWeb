import { useMutation } from "@tanstack/react-query"
import { createNewConversation, deleteConversation } from "../../../api/conversation"

export const useCreateNewConversation = () => {
    return useMutation({
        mutationKey:["CreateNew-Conversation"],
        mutationFn:createNewConversation
    })
}

export const useDeleteConversation = () => {
    return useMutation({
        mutationKey:["Delete-Conversation"],
        mutationFn:deleteConversation
    })
}