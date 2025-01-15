import  Image  from '../../../../assets/defaultprofileimg.webp';
import BGImage from '../../../../assets/post.png';
import React  from 'react';
import EditProfileSection from './editProfileSection';
import { useGetUser } from '../../../../react-query/query/user';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../context/auth/hooks/useAuthContext';
import FollowandUnfollowButton from '../follow/unfollow';



const Profileeditcomp:React.FC = () => {
    const {user} = useAuthContext()
    const { userId } = useParams<{ userId: string }>();
    const { data: userData } = useGetUser(userId ?? "");
    
  return (
       <div className=" rounded-xl  shadow bg-[#EAFF96] h-[60vh] ">   
          {/* Cover Image */}
          <div className="relative">
              <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={ userData?.coverpicture || Image }
              alt="Cover"
              />
              {/* Profile Avatar */}
              <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  src={ userData?.profilePicture || BGImage}
                  alt="Profile"
              />
              </div>
          </div>

          {/* Username */}
          <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold">{userData?.username || "username"}</h2>
              <div className="mt-1 flex items-center justify-center">
              <span className="text-sm text-gray-500">{userData?.posts.length + " Post"}</span>
              <span className=" ml-2 text-sm text-gray-500">{userData?.followers.length + " Followers"}</span>
              <span className=" ml-2 text-sm text-gray-500">{userData?.following.length + " Following"}</span>
              <span className="mx-2 w-3 h-3 bg-blue-500 rounded-full"></span>
              </div>
          </div>

          <FollowandUnfollowButton userData={userData} userId={userId}/>

          {/* Edit Profile Section */}
          {user?._id === userData?._id ?  <EditProfileSection /> : null}
          
       </div>
  )
}

export default Profileeditcomp