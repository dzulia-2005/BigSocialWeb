import { useQuery } from "@tanstack/react-query"
import { getAllComment } from "../../../api/comment"
import { getAllCommentType } from "../../../api/comment/index.type"

export const useGetAllComment = (postId: string | undefined) => {
    return useQuery<getAllCommentType[]>({
        queryKey:["getallcomment",postId],
        queryFn:()=>getAllComment(postId),
    })
}