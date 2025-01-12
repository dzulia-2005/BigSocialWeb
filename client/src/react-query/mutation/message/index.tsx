import { useMutation } from "@tanstack/react-query"
import { createMessage, deleteMessage } from "../../../api/message"

export const useCreateMessage = () => {
    return useMutation({
        mutationKey:["Create-Message"],
        mutationFn:createMessage
    })
} 

export const useDeleteMessage = () => {
    return useMutation({
        mutationKey:["Delete-Message"],
        mutationFn:deleteMessage
    })
}