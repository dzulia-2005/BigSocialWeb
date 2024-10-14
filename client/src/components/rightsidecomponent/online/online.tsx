import React, { PropsWithChildren } from 'react'

interface userprops {
    user:{
        id:number;
        profilepicture:string;
        username:string;
    }
}

const Online:React.FC<PropsWithChildren<userprops>> = ({user}) => {
  return (
            <li className='flex items-center gap-[5%]'>
              <img className='rounded-full w-[40px] h-[40px]' src={user.profilepicture} alt="" />
              <span className='text-[#fff]'>{user.username}</span>
            </li>
  )
}

export default Online