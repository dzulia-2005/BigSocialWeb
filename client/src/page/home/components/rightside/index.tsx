import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import image from "../../../../assets/defaultprofileimg.webp"


const Rightside:React.FC = () => {
  return (
    <aside className='md:w-1/3 space-y-8 '>
    <div className="rounded-xl  bg-[#EAFF96]  fixed">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="text-[20px] font-semibold leading-none tracking-tight">actives</div>
            </div>
            <div className="p-6 pt-0">
                <ul className="space-y-4">
                    <li>
                    <div className="flex items-center">
                        <span >
                            <Avatar >
                                <AvatarImage className="rounded-full h-10 w-10" src={image}/>
                            </Avatar>
                        </span>
                        <div className="ml-4">
                            <div className="p-0" >Alice Johnson</div>
                        </div>
                    </div>
                    </li>
                <li>
                    <div className="flex items-center">
                    <span >
                         <Avatar >
                            <AvatarImage className="rounded-full h-10 w-10" src={image}/>
                         </Avatar>
                    </span>
                    <div className="ml-4">
                        <div className="p-0" >Bob Smith</div>
                    </div>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                    <span >
                    <Avatar >
                        <AvatarImage className="rounded-full h-10 w-10" src={image}/>
                     </Avatar>
                    </span>
                    <div className="ml-4">
                        <div className="p-0" >Carol Williams</div>
                    </div>
                    </div>
                </li>
                </ul>
            </div>
        </div>
</aside>
  )
}

export default Rightside