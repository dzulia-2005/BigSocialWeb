import { useMutation } from "@tanstack/react-query"
import { createComment } from "../../../api/comment"

export const useCreateComment = () => {
    return useMutation({
        mutationKey:["create-comment"],
        mutationFn:createComment
    })
}
