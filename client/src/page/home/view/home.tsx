/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import Rightside from '../components/rightside';
import LeftSide from '../../../components/base/leftside/index';
import Sharecomp from '../../../components/base/sharecomponent/index';
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarImage } from '../../../components/ui/avatar';
import image from '../../../assets/defaultprofileimg.webp';
import { useGetAllPost } from '../../../react-query/query/post';
import { useLikePost, useUnlikePost } from '../../../react-query/mutation/post';
import { queryClient } from '../../../main';
import { NavLink } from 'react-router-dom';



const Home:React.FC = () => {
  const { user } = useAuthContext();
  const { data:allpost }: { data: any } = useGetAllPost(user?._id ?? "");
  const { mutate: likePost } = useLikePost(); 
  const { mutate: unlike_post } = useUnlikePost();

  
  const likedPosts = useMemo(() => {
      if (allpost && Array.isArray(allpost.posts)) {
          return new Set(
            allpost.posts
                  .filter((post: any) => post.likes.includes(user?._id))
                  .map((post: any) => post._id)
          );
      }
      return new Set();
  }, [allpost, user?._id]);

  const handleLikeToggle = (postId: string) => {
      const isLiked = likedPosts.has(postId);

      if (isLiked) {
          unlike_post({ userId: user?._id, postId }, {
              onSuccess: () => {
                if (user?._id) {
                  queryClient.invalidateQueries<any>(['get-allpost', user._id]);
                }              },
              onError: (error) => {
                  console.error('Error unliking post:', error);
              },
          });
      } else {
          likePost({ userId: user?._id, postId }, {
              onSuccess: () => {
                if (user?._id) {
                  queryClient.invalidateQueries<any>(['get-allpost', user._id]);
                }              },
              onError: (error) => {
                  console.error('Error liking post:', error);
              },
          });
      }
  };

  return (
    
  <>
    <div  className='mx-auto flex flex-col md:flex-row gap-9 lg:justify-evenly'>
            <LeftSide/>
            <section className='md:w-3/4 space-y-8 flex flex-col'>
                <Sharecomp/>
                {allpost && Array.isArray(allpost.posts) && allpost.posts.map((post:any) => (
                  <div className="rounded-xl shadow bg-[#EAFF96]" key={post._id}>
                    <NavLink 
                        to={`/profile/${post.user?._id}`} 
                        className="pl-6 flex items-center pt-6"
                        replace
                        >
                      <Avatar>
                        <AvatarImage className="rounded-full h-10 w-10" src={ post.user?.profilePicture || image} />
                      </Avatar>
                      <div className="ml-4">
                        <div className="p-0">{post.user?.username}</div>
                      </div>
                    </NavLink>
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
                      <NavLink to={`/comment/${post?._id}`} className="flex items-center">
                        <FontAwesomeIcon icon={faComment} />
                        <div>{post.comment.length} comments</div>
                      </NavLink>
                    </div>
                    
                  </div>
                  ))}
            </section>
            <Rightside />
    </div>
  </>
  )
}

export default Home