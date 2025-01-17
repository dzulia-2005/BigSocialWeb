import React from 'react';
import Skeleton from 'react-loading-skeleton';

const NewPostSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl shadow bg-[#EAFF96]">
      <div className="p-1 flex items-center justify-around pt-6 space-x-4">
        <Skeleton circle={true} width={40} height={40} />
        <Skeleton width="70%" height={40} />
        <Skeleton width={30} height={30} />
      </div>
      <div className="flex items-center p-6">
        <div className="flex space-x-2 w-full">
          <Skeleton width={100} height={30} />
        </div>
      </div>
    </div>
  );
};

export default NewPostSkeleton;
