import React from 'react';
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css'; 

const PostSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg shadow-lg bg-[#EAFF96] p-6 mb-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Skeleton circle width={50} height={50} />
        <div className="ml-4 w-full">
          <Skeleton width="40%" height={20} />
          <Skeleton width="30%" height={15} className="mt-1" />
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
        <Skeleton width="100%" height="100%" />
      </div>

      {/* Content */}
      <div>
        <Skeleton width="90%" height={20} />
        <Skeleton width="80%" height={20} className="mt-2" />
        <Skeleton width="70%" height={20} className="mt-2" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <Skeleton width="25%" height={30} />
        <Skeleton width="25%" height={30} />
      </div>
    </div>
  );
};

export default PostSkeleton;
