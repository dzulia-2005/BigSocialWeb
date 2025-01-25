/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@radix-ui/react-avatar';
import { faComment, faHeart, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useGetUserPost } from '../../../../react-query/query/post'
import { queryClient } from '../../../../main'
import { useDeletePost, useLikePost, useUnlikePost } from '../../../../react-query/mutation/post'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { useMemo} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../context/auth/hooks/useAuthContext';
import { useGetUser } from '../../../../react-query/query/user';
import PostSkeleton from '../../../../components/skeletons/postskeleton';
import { useTranslation } from 'react-i18next';
import Image from "../../../../assets/profileimg.jpg"
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


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
  
    if (!user) return <div className="flex items-center justify-center h-screen"><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>;
    if (!data) return <div className="flex items-center justify-center h-screen"><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>;
  
    return (
      <>
        {Array.isArray(data.posts) && data.posts.length > 0 ? (
          data.posts.map((post: any) => (
            <div className="rounded-xl shadow bg-[#EAFF96]" key={post._id}>
              <div className="flex items-center justify-between pr-6">
                <div className="pl-6 flex items-center pt-6">
                  <Avatar>
                    <img
                      className="rounded-full h-10 w-10"
                      src={post.user?.profilePicture ? `https://${post.user?.profilePicture}` : Image}
                      onError={(e) => (e.currentTarget.src = Image)}
                    />
                  </Avatar>
                  <div className="ml-4">{post.user?.username}</div>
                </div>

                <div className="flex items-center space-x-4">
                  {userData?._id === user._id && (
                    <NavLink to={`/editpost/${post._id}`}>
                         <FontAwesomeIcon 
                           icon={faPenToSquare} 
                           className="text-gray-700 text-xl cursor-pointer"
                          />
                     </NavLink>
                  )}
                   
                  {userData?._id === user._id && (
                    <FontAwesomeIcon
                      icon={faDeleteLeft}
                      className="w-7 h-7 cursor-pointer text-red-500"
                      onClick={() => handleDeletePost(post._id)}
                    />
                  )}
                </div>

              </div>
              <div className="pl-6">
                <p className="py-2">{post.caption}</p>
              </div>
              <div className="mx-6">
                <img
                  src={post.image.length > 0 ? `https://${post.image[0]}` : undefined}
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
                  <div className="ml-2">{post.likes.length} {t("profilepage.likes")}</div>
                </div>
                <NavLink to={`/comment/${post._id}`} className="flex items-center">
                  <FontAwesomeIcon icon={faComment} />
                  <div className="ml-2">{post.comment.length} {t("profilepage.comments")}</div>
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center'>{t("profilepage.NoPosts")}</div>
        )}
      </>
    );
  };
  
  export default UserPostFeed;
  