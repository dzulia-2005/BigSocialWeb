import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import image from "../../../assets/defaultprofileimg.webp"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Input } from '../../ui/input';

const Sharecomp:React.FC = () => {
  return (
                        <div className="rounded-xl  shadow bg-[#EAFF96]">
                            <div className="p-1 flex items-center justify-around pt-6">
                                <div>
                                    <Avatar >
                                        <AvatarImage className="rounded-full h-10 w-10" src={image}/>
                                    </Avatar>
                                </div>
                                    <Input placeholder="Create new post" className='w-[70%] bg-[#4F4F4F] border-none text-[#ffff] focus:outline-none' />
                                    <FontAwesomeIcon className='w-7 h-7' icon={faImage} />

                            </div>
                            <div className="flex items-center p-6 ">
                                <div className="flex space-x-2">
                                    <button className=" text-[#EAFF96] bg-[#151515] rounded-xl h-6 w-40 text-xs">Add</button>
                                </div>
                            </div>
                        </div>
  )
}

export default Sharecomp