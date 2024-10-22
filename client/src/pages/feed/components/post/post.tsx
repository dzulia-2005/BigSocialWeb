import React, { PropsWithChildren, useState } from 'react'
import { User } from '../../../../data-dummy';


interface PostProps {
    post: {
      id: number;
      desc: string;
      img: string;
      date: string;
      like: number;
      comment: number;
      userid: number;
    };
  }


const Post:React.FC<PropsWithChildren<PostProps>> = ({post}) => {
    const [like,setLike]=useState(post.like)
    const [islike,setIslike]=useState(false)

    const likehandler = () => {
            setLike(islike ? like - 1 : like + 1)
            setIslike(!islike)
            console.log("clicked")
    }

  return (
    <div className='flex justify-center w-[100%] h-auto mt-[20px] mb-[20px]'>
                           <div className='bg-[#4F4F4F] w-[90%] h-auto rounded-[10px] p-[3%] pl-[6%]  '>
                               <div className='flex items-center gap-[2%]'>
                                  <div className='w-[40px] h-[40px] bg-[#D9D9D9] rounded-full '>
                                    <img className='rounded-full' src={User.filter((u)=>u.id === post?.id)[0].profilepicture} alt="" />
                                  </div>
                                  <div className='text-[#fff]'>{User.filter((u)=>u.id === post?.id)[0].username}</div>
                               </div>
                               <div>
                                  <div className='text-[#ffff]'>{post.desc}</div>
                                  <img className='w-[85%]' src={post.img} />
                               </div>
                               <div className='flex items-center m-0 mr-[15%] justify-between mt-[3%] '>
                                  <div onClick={likehandler} className='flex items-center gap-[1%] w-[92px]'>
                                    <div><svg  width="15" height="15" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.69609 18.775L12.9311 29.3188C13.3559 29.7563 13.9166 30 14.5 30C15.0834 30 15.6441 29.7563 16.0689 29.3188L26.3039 18.775C28.0258 17.0063 29 14.525 29 11.9312V11.5688C29 7.2 26.1396 3.475 22.2371 2.75625C19.6543 2.28125 17.0262 3.2125 15.1797 5.25L14.5 6L13.8203 5.25C11.9738 3.2125 9.3457 2.28125 6.76289 2.75625C2.86035 3.475 0 7.2 0 11.5688V11.9312C0 14.525 0.974219 17.0063 2.69609 18.775Z" fill="white"/></svg></div>
                                    <div  className='text-[#ffff]'>{like} likes</div>
                                  </div>
                                  <div className='flex items-center gap-[1%] text-[#ffff]'>{post.comment}
                                    <div><svg width="15" height="15" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.0017 13C29.0017 20.1813 22.5107 26 14.5017 26C12.4003 26 10.4066 25.6 8.60539 24.8813C7.93137 25.425 6.83254 26.1688 5.5298 26.7938C4.17043 27.4438 2.53352 28 0.90793 28C0.539766 28 0.21125 27.7563 0.0696484 27.3813C-0.0719531 27.0063 0.00734374 26.5813 0.262227 26.2938L0.279219 26.275C0.296211 26.2562 0.318867 26.2312 0.352852 26.1875C0.415156 26.1125 0.511445 25.9937 0.630391 25.8312C0.862617 25.5187 1.17414 25.0563 1.49133 24.4813C2.05773 23.4438 2.59582 22.0812 2.70344 20.55C1.00422 18.425 0.00167969 15.8187 0.00167969 13C0.00167969 5.81875 6.4927 0 14.5017 0C22.5107 0 29.0017 5.81875 29.0017 13Z" fill="white"/></svg></div>
                                    <div className='text-[#ffff]'>comments </div>
                                  </div>
                               </div>
                           </div>
                        </div>
  )
}

export default Post