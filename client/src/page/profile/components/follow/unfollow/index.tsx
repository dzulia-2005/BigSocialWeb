/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
// import { useFollowUser, useUnfollowUser } from '../../../../../react-query/mutation/user/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../../../../../context/auth/hooks/useAuthContext';
import { Button } from "../../../../../components/ui/button"
import { FollowUser, UnfollowUser } from '../../../../../api/user';


interface UserData {
    _id: string;
    followers: string[];
    following: string[];
  }
  
  interface FollowandUnfollowButtonProps {
    userData?: UserData ;
    userId: string | undefined ;
  }


  const FollowandUnfollowButton: React.FC<FollowandUnfollowButtonProps> = ({ userData, userId }) => {

  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const followMutation = useMutation({
    mutationKey: ["follow-user", userId],
    mutationFn: () =>
      FollowUser({
        userId: userId || "",
        _id: user?._id || "",
      }),
  });

  const unfollowMutation = useMutation({
    mutationKey: ["unfollow-user", userId],
    mutationFn: () =>
      UnfollowUser({
        userId: userId || "",
        _id: user?._id || "",
      }),
  });

  const isFollowing = useMemo(() => {
    return userData?.followers?.includes(user?._id || "");
  }, [user?._id, userData?.followers]);

  const handleFollowToggle = () => {
    if (!user?._id) return;

    if (isFollowing) {
      unfollowMutation.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries<any>(["unfollow-user", userId]);
        },
        onError: (error) => {
          console.error("Error unfollowing user:", error);
        },
      });
    } else {
      followMutation.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries<any>(["follow-user", userId]);
        },
        onError: (error) => {
          console.error("Error following user:", error);
        },
      });
    }
  };

  
  
    return user?._id !== userData?._id ? (
      <div className="flex justify-center my-2">
        <Button
          className={`${
            isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-[#3b82f6] hover:bg-[#3b82f6]"
          }`}
          onClick={handleFollowToggle}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>
    ) : null;
  };

  
  export default FollowandUnfollowButton;