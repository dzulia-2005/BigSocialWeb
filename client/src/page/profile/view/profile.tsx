/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
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



const Profile:React.FC = () => {
  const { user } = useAuthContext();
  const { data }:{data:any} = useGetUserPost(user?._id);
  
  return (
    <div className='mx-auto flex flex-col md:flex-row gap-9 '>
                <LeftSide/>
                <section className='md:w-3/4 space-y-8 flex flex-col'> 
                    <Profileeditcomp/>
                    <Sharecomp/>  
                    {data && Array.isArray(data.posts) && data.posts.map((post:any) => (
                      <div className="rounded-xl shadow bg-[#EAFF96]" key={post._id}>
                        <div className="pl-6 flex items-center pt-6">
                          <Avatar>
                            <AvatarImage className="rounded-full h-10 w-10" src={post.user?.profilePicture || image} />
                          </Avatar>
                          <div className="ml-4">
                            <div className="p-0">{post.user?.username}</div>
                          </div>
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
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faHeart} />
                            <div>{post.likes.length} likes</div>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faComment} />
                            <div>{post.comment.length} comments</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </section> 
                <Rightside/>
        </div>
  )
}

export default Profile