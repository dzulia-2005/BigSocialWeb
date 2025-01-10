/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import LeftSide from '../../../components/base/leftside'
import Profileeditcomp from '../components/profileEditcomp/profileeditcomp'
import Sharecomp from '../../../components/base/sharecomponent'
import Rightside from '../../home/components/rightside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import image from '../../../assets/defaultprofileimg.webp';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useGetUserPost } from '../../../react-query/query/post'
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext'
import { queryClient } from '../../../main'
import { useDeletePost, useLikePost, useUnlikePost } from '../../../react-query/mutation/post'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'

const Profile:React.FC = () => {
  const { user } = useAuthContext();
  const { data }:{data:any} = useGetUserPost(user?._id || "");
  const { mutate: likePost } = useLikePost(); 
  const {mutate:delete_post} = useDeletePost();
  const { mutate: unlike_post } = useUnlikePost();


  const likedPosts = useMemo(() => {
    if (data && Array.isArray(data.posts)) {
        return new Set(
            data.posts
                .filter((post: any) => post.likes.includes(user?._id))
                .map((post: any) => post._id)
        );
    }
    return new Set();
}, [data, user?._id]);

const handleLikeToggle = (postId: string) => {
    const isLiked = likedPosts.has(postId);
    if (isLiked) {
        unlike_post({ userId: user?._id, postId }, {
            onSuccess: () => {
              if (user?._id) {
                queryClient.invalidateQueries(['get-allpost', user._id], { exact: true })
              }              },
            onError: (error) => {
                console.error('Error unliking post:', error);
            },
        });
    } else {
        likePost({ userId: user?._id, postId }, {
            onSuccess: () => {
              if (user?._id) {
                queryClient.invalidateQueries(['get-allpost', user._id], { exact: true })
              }              },
            onError: (error) => {
                console.error('Error liking post:', error);
            },
        });
    }
};
  if (!user) {
    return <div>Loading...</div>; 
  }

  const handleDeletePost = (postId: string) => {
    delete_post(
      {postId},
      {
        onSuccess:()=>{
          if (user?._id) {
            queryClient.invalidateQueries(['delete-post', user._id], { exact: true })
          }     
        },
        onError: (error) => {
          console.error('Error deleting post:', error);
        },
      }
    )
  }
  
  return (
    <div className='mx-auto flex flex-col md:flex-row gap-9 '>
                <LeftSide/>
                <section className='md:w-3/4 space-y-8 flex flex-col'> 
                    <Profileeditcomp/>
                    <Sharecomp/>  
                    {data && Array.isArray(data.posts) && data.posts.map((post:any) => (
                      <div className="rounded-xl shadow bg-[#EAFF96]" key={post._id}>
                       <div className='flex items-center justify-between pr-6 relative'>
                          <div className="pl-6 flex items-center pt-6">
                              <Avatar>
                                <AvatarImage className="rounded-full h-10 w-10" src={post.user?.profilePicture || image} />
                              </Avatar>
                              <div className="ml-4">
                                <div className="p-0">{post.user?.username}</div>
                              </div>
                         </div>
                         <FontAwesomeIcon icon={faDeleteLeft} className='relative top-3 w-7 h-7' onClick={() => handleDeletePost(post._id)}  />
                       </div>        
                        <div className="pl-6">
                          <p className="py-2">{post.caption}</p>
                        </div>
                        <div className="mx-6">
                          <img 
                            src={post.image.length > 0 ? post.image[0] : image} 
                            alt="Post" 
                            className="w-full h-auto" 
                          />
                        </div>
                        <div className="flex mx-6 justify-between mb-4 mt-3">
                        <div className="flex items-center" onClick={()=>handleLikeToggle(post._id)}>
                          <FontAwesomeIcon 
                          icon={faHeart} 
                          className={likedPosts.has(post._id) ? 'text-red-500' : 'text-gray-500'} 
                          />
                          <div>{post.likes.length} likes</div>
                        </div>
                          <NavLink to={`/comment/${user._id}`} className="flex items-center" >
                            <FontAwesomeIcon icon={faComment} />
                            <div>{post.comment.length} comments</div>
                          </NavLink>
                        </div>
                      </div>
                    ))}
                  </section> 
                <Rightside/>
        </div>
  )
}

export default Profile