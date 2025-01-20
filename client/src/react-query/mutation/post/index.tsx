import { useMutation } from "@tanstack/react-query"
import { createPost, createPostImg, delete_post, like_post, unlike_post, updatePost } from "../../../api/post"

export const useCreatePostImg = () => {
    return useMutation({
        mutationKey:["create-postwith-img"],
        mutationFn:createPostImg
    })
}

export const useCreatePost = () => {
    return useMutation({
        mutationKey:["create-post"],
        mutationFn:createPost
    })
}

export const useDeletePost = () => {
    return useMutation({
        mutationKey:["delete-post"],
        mutationFn:delete_post,
    })
}

export const useLikePost = () => {
    return useMutation({
        mutationKey:["like-post"],
        mutationFn:like_post
    })
}

export const useUnlikePost = () => {
    return useMutation({
        mutationKey:["unlike-post"],
        mutationFn:unlike_post
    })
}

export const useUpdatePost = () => {
    return useMutation({
        mutationKey:["update-post"],
        mutationFn:updatePost
    })
}