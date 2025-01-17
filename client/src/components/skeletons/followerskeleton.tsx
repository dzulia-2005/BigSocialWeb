import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RightsideSkeleton: React.FC = () => {
  return (
    <aside className="md:w-1/3 space-y-8">
      <div className="rounded-xl bg-[#EAFF96] fixed p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="flex flex-col space-y-1.5">
          <Skeleton width={120} height={24} />
        </div>

        {/* Followers List Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton circle width={40} height={40} />
              <Skeleton width={100} height={20} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightsideSkeleton;
