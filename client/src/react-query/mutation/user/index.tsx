import { useMutation } from "@tanstack/react-query"
import { FollowUser, UnfollowUser, UpdateCoverProfPic, UpdateProfilePic } from "../../../api/user"

export const useFollowUser = () => {
    return useMutation({
        mutationKey:["follow-user"],
        mutationFn:FollowUser
    })
}

export const useUnfollowUser = () => {
    return useMutation({
        mutationKey:["unfollow-user"],
        mutationFn:UnfollowUser
    })
}

export const useUpdateProfilePic = () => {
    return useMutation({
        mutationKey:["updateprofpic"],
        mutationFn:UpdateProfilePic
    })
}

export const useUpdateCoverProfPic = () => {
    return useMutation({
        mutationKey:["updateprofcoverpic"],
        mutationFn:UpdateCoverProfPic
    })
}