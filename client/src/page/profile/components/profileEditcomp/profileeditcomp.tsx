import  Image  from '../../../../assets/defaultprofileimg.webp';
import BGImage from '../../../../assets/post.png';
import React  from 'react';
import EditProfileSection from './editProfileSection';
import { useGetUser } from '../../../../react-query/query/user';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../context/auth/hooks/useAuthContext';
import FollowandUnfollowButton from '../follow/unfollow';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileSkeleton from '../../../../components/skeletons/profileskeleton';
import { useCreateNewConversation } from '../../../../react-query/mutation/conversation';
import { useTranslation } from 'react-i18next';




const Profileeditcomp:React.FC = () => {
    const {user} = useAuthContext()
    const { userId } = useParams<{ userId: string }>();
    const { data: userData,isLoading } = useGetUser(userId ?? "");
    const { mutate: createConversation } = useCreateNewConversation();
    const navigate = useNavigate();
    const {t}=useTranslation()
    

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    const handleUserClick = async (secondUserId: string | undefined) => {
        if (!userId) {
          console.error("User is not logged in.");
          return;
        }
        if (!secondUserId) {
          console.error("Selected user ID is undefined.");
          return;
        }
      
        try {
          const response = await createConversation({
            payload: {
              firstUser: user?._id ?? "",
              secondUser: secondUserId,
            },
          });
          navigate("/chat")
          console.log("Conversation successfully created!", response);
         
        } catch (error) {
          console.error("Failed to create conversation:", error);
        }
      };

  return (
       <div className=" rounded-xl  shadow bg-[#EAFF96] h-[60vh] ">   
          <div className="relative">
              <img
                 className="w-full h-48 object-cover rounded-t-lg"
                 src={ userData?.coverpicture || Image }
                 alt="Cover"
              />
              {user?._id !== userData?._id ? <FontAwesomeIcon onClick={()=>handleUserClick(userData?._id)} icon={faMessage} beat  className='text-[#3e7ee8] size-6 mt-1 absolute left-7 bottom-36'/> : null}
              <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                  src={ userData?.profilePicture || BGImage}
                  alt="Profile"
              />
              </div>
          </div>

          <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold">{userData?.username || t("profilepage.username")}</h2>
              <div className="mt-1 flex items-center justify-center">
              <span className="text-sm text-gray-500">{userData?.posts.length + t("profilepage.Post")}</span>
              <span className=" ml-2 text-sm text-gray-500">{userData?.followers.length + t("profilepage.Followers")}</span>
              <span className=" ml-2 text-sm text-gray-500">{userData?.following.length + t("profilepage.Following")}</span>
              <span className="mx-2 w-3 h-3 bg-blue-500 rounded-full"></span>
              </div>
          </div>

          <FollowandUnfollowButton userData={userData} userId={userId}/>

          {user?._id === userData?._id ?  <EditProfileSection /> : null}
       </div>
  )
}

export default Profileeditcomp


