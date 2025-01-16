import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import image from "../../../assets/defaultprofileimg.webp"
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext';
import { useGetallfollowers } from '../../../react-query/query/user';
import { NavLink } from 'react-router-dom';


const Rightside:React.FC = () => {
    const { user } = useAuthContext();
    const { data, isLoading} = useGetallfollowers(user?._id || "");
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p>Loading followers...</p>
        </div>
      );
    }

  return (
    <aside className='md:w-1/3 space-y-8 '>
    <div className="rounded-xl  bg-[#EAFF96]  fixed">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="text-[20px] font-semibold leading-none tracking-tight">Followers</div>
            </div>
            <div className="p-6 pt-0">
                <ul className="space-y-4">
                    {data?.length ? (
                        data.map((f)=>(
                            <li>
                              <NavLink to={`/profile/${f._id}`}>  
                                <div className="flex items-center">
                                    <span >
                                        <Avatar >
                                            <AvatarImage className="rounded-full h-10 w-10" src={ f.profilePicture ||image}/>
                                        </Avatar>
                                    </span>
                                    <div className="ml-4">
                                        <div className="p-0" >{f.username}</div>
                                    </div>
                                </div>
                              </NavLink>  
                        </li>
                        ))
                    ):(
                        <div>No Followers yet</div>
                    )
                    }
                </ul>
            </div>
        </div>
</aside>
  )
}

export default Rightside