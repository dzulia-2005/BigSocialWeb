/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import image from '../../../../assets/defaultprofileimg.webp';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useGetUserPost } from '../../../../react-query/query/post'
import { queryClient } from '../../../../main'
import { useDeletePost, useLikePost, useUnlikePost } from '../../../../react-query/mutation/post'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../context/auth/hooks/useAuthContext';
import { useGetUser } from '../../../../react-query/query/user';
import PostSkeleton from '../../../../components/skeletons/postskeleton';
import { useTranslation } from 'react-i18next';




const UserPostFeed = () => {
    const { userId } = useParams<{ userId: string }>();
    const { user } = useAuthContext();
    const { data: userData,isLoading: isUserLoading } = useGetUser(userId ?? "");
    const { data, isLoading: isPostsLoading }: { data: any; isLoading:any } = useGetUserPost(userId || "");
    const { mutate: likePost } = useLikePost();
    const { mutate: deletePost } = useDeletePost();
    const { mutate: unlikePost } = useUnlikePost();
    const {t}=useTranslation()
    
  
    const likedPosts = useMemo(() => {
      if (data?.posts) {
        return new Set(
          data.posts
            .filter((post: any) => post.likes.includes(user?._id))
            .map((post: any) => post._id)
        );
      }
      return new Set();
    }, [data, user?._id]);
  

    if (isUserLoading || isPostsLoading) {
      return (
        <div>
          {Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      );
    }

    const handleLikeToggle = (postId: string) => {
      const isLiked = likedPosts.has(postId);
      const mutation = isLiked ? unlikePost : likePost;
  
      mutation(
        { userId: user?._id, postId },
        {
          onSuccess: () => {
            if (user?._id) {
              queryClient.invalidateQueries<any>(['user-posts', user._id]);
            }
          },
          onError: (error) => {
            console.error(`Error ${isLiked ? 'unliking' : 'liking'} post:`, error);
          },
        }
      );
    };
  
    const handleDeletePost = (postId: string) => {
      deletePost(
        { postId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries<any>(['user-posts', user?._id ]);
          },
          onError: (error) => {
            console.error('Error deleting post:', error);
          },
        }
      );
    };
  
    if (!user) return <div>Loading user...</div>;
    if (!data) return <div>Loading posts...</div>;
  
    return (
      <>
        {Array.isArray(data.posts) && data.posts.length > 0 ? (
          data.posts.map((post: any) => (
            <div className="rounded-xl shadow bg-[#EAFF96]" key={post._id}>
              <div className="flex items-center justify-between pr-6">
                <div className="pl-6 flex items-center pt-6">
                  <Avatar>
                    <AvatarImage
                      className="rounded-full h-10 w-10"
                      src={post.user?.profilePicture || image}
                    />
                  </Avatar>
                  <div className="ml-4">{post.user?.username}</div>
                </div>
                {userData?._id === user._id && (
                  <FontAwesomeIcon
                    icon={faDeleteLeft}
                    className="relative top-3 w-7 h-7 cursor-pointer"
                    onClick={() => handleDeletePost(post._id)}
                  />
                )}
              </div>
              <div className="pl-6">
                <p className="py-2">{post.caption}</p>
              </div>
              <div className="mx-6">
                <img
                  src={post.image?.[0] || image}
                  alt="Post"
                  className="w-full h-auto"
                />
              </div>
              <div className="flex mx-6 justify-between mb-4 mt-3">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleLikeToggle(post._id)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={likedPosts.has(post._id) ? 'text-red-500' : 'text-gray-500'}
                  />
                  <div>{post.likes.length} {t("profilepage.likes")}</div>
                </div>
                <NavLink to={`/comment/${post._id}`} className="flex items-center">
                  <FontAwesomeIcon icon={faComment} />
                  <div>{post.comment.length} {t("profilepage.comments")}</div>
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <div>{t("profilepage.NoPosts")}</div>
        )}
      </>
    );
  };
  
  export default UserPostFeed;
  