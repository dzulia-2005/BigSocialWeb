import  Image  from '../../../../assets/defaultprofileimg.webp'
import BGImage from '../../../../assets/post.png'
import React, { useState } from 'react'
import EditProfileSection from './editProfileSection'
import { useAuthContext } from '../../../../context/auth/hooks/useAuthContext'



const Profileeditcomp:React.FC = () => {
    const { user } = useAuthContext();
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>(user?.profilePicture );
    const [coverPictureUrl,setCoverPictureUrl] = useState<string>(user?.coverpicture)

    
  return (
    <div className=" rounded-xl  shadow bg-[#EAFF96]">   
                        {/* Cover Image */}
                        <div className="relative">
                            <img
                            className="w-full h-48 object-cover rounded-t-lg"
                            src={coverPictureUrl || BGImage}
                            alt="Cover"
                            />
                            {/* Profile Avatar */}
                            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <img
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                src={profilePictureUrl || Image}
                                alt="Profile"
                            />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="mt-12 text-center">
                            <h2 className="text-xl font-semibold">{user?.username || "username"}</h2>
                            <div className="mt-1 flex items-center justify-center">
                            <span className="text-sm text-gray-500">{user?.posts.length+" Post"}</span>
                            <span className="ml-2 w-3 h-3 bg-blue-500 rounded-full"></span>
                            </div>
                        </div>

                        {/* Edit Profile Section */}
                        <EditProfileSection 
                          setProfilePictureUrl={setProfilePictureUrl}
                          setCoverPictureUrl = {setCoverPictureUrl}
                        />
                        </div>
  )
}

export default Profileeditcomp