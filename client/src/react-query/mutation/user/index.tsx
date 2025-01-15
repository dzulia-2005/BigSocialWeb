import { useMutation } from "@tanstack/react-query"
import { FollowUser, UnfollowUser, UpdateCoverProfPic, UpdateProfilePic } from "../../../api/user"

export const useFollowUser = (userId:string, _id:string) => {
  return useMutation({
    mutationKey: ["follow-user", userId],
    mutationFn: () => FollowUser({ userId, _id }),
  });
};

export const useUnfollowUser = (userId:string, _id:string) => {
  return useMutation({
    mutationKey: ["unfollow-user", userId],
    mutationFn: () => UnfollowUser({ userId, _id }),
  });
};

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