import { useQuery } from "@tanstack/react-query"
import { get_AllPost, get_UserPost } from "../../../api/post"
import { getallpostType, getuserpostsType } from "../../../api/post/index.type"

export const useGetUserPost = (userId: string) => {
    return useQuery<getuserpostsType[]>({
        queryKey:["get-user-post",userId],
        queryFn:() => get_UserPost({ userId }),
        
    })
}

export const useGetAllPost = (userId:string) => {
    return useQuery<getallpostType[]>({
        queryKey:["get-allpost",userId],
        queryFn:()=> get_AllPost({userId})
    })
}