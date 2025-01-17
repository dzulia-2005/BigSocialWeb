import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ConversationListSkeleton = () => {
  return (
    <div className="w-[30%] border-r border-[#ccc] hidden md:flex flex-col p-4 bg-[#EAFF96]">
      <div className="overflow-y-auto max-h-full space-y-4">
        <div className="flex items-center py-4 px-2 border-t border-[#ccc] cursor-default">
          <Skeleton circle={true} height={40} width={40} />
          <div className="ml-4">
            <Skeleton width={100} height={20} />
            <Skeleton width={80} height={16} className="mt-2" />
          </div>
        </div>
        <div className="flex items-center py-4 px-2 border-t border-[#ccc] cursor-default">
          <Skeleton circle={true} height={40} width={40} />
          <div className="ml-4">
            <Skeleton width={100} height={20} />
            <Skeleton width={80} height={16} className="mt-2" />
          </div>
        </div>
        <div className="flex items-center py-4 px-2 border-t border-[#ccc] cursor-default">
          <Skeleton circle={true} height={40} width={40} />
          <div className="ml-4">
            <Skeleton width={100} height={20} />
            <Skeleton width={80} height={16} className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationListSkeleton;
