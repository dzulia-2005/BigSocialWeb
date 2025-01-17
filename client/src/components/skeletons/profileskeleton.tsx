import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl shadow-lg bg-[#EAFF96] from-gray-200 to-gray-300 h-[60vh] animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="relative">
        <Skeleton height={192} className="rounded-t-xl" />
        {/* Profile Avatar Skeleton */}
        <div className="absolute top-36 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Skeleton circle width={96} height={96} className="border-4 border-white" />
        </div>
      </div>

      {/* Username and Stats Skeleton */}
      <div className="mt-16 text-center">
        <Skeleton width={120} height={24} className="mb-2" />
        <div className="flex items-center justify-center space-x-4">
          <Skeleton width={60} height={20} />
          <Skeleton width={80} height={20} />
          <Skeleton width={70} height={20} />
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-4 text-center">
        <Skeleton width={140} height={40} className="rounded-md" />
      </div>

      {/* Edit Profile Section Skeleton */}
      <div className="mt-4 px-6">
        <Skeleton height={50} className="rounded-md" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
