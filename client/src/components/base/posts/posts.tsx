import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import image from '../../../assets/defaultprofileimg.webp';
import React from 'react';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';



const Posts: React.FC = () => {
 



  return (
    <div className="rounded-xl shadow bg-[#EAFF96]">
      <div className="pl-6 flex items-center pt-6">
        <Avatar>
          <AvatarImage className="rounded-full h-10 w-10" src={image} />
        </Avatar>
        <div className="ml-4">
          <div className="p-0"></div>
        </div>
      </div>
      <div className="pl-6">
        <p className="py-2">post</p>
      </div>
      <div className="mx-6">
        <img src={image} alt="Post" />
      </div>
      <div className="flex mx-6 justify-between mb-4 mt-3">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faHeart} />
          <div> likes</div>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faComment} />
          <div>20 comments</div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
