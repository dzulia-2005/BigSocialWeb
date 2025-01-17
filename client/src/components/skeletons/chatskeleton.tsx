import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ChatSkeleton = () => {
  return (
    <div className="w-full flex flex-col justify-between p-6">
      <div className="overflow-y-auto max-h-[500px] space-y-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex gap-4 items-start">
            <Skeleton circle={true} height={40} width={40} />
            <div className="w-auto max-w-[70%] rounded-md bg-[#EAFF96] p-4">
              <Skeleton width="100%" height={20} />
              <Skeleton width="80%" height={16} className="mt-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4 border-t border-[#ccc] pt-4">
        <div className="flex-grow">
          <Skeleton width="100%" height={40} />
        </div>
        <Skeleton width={80} height={40} />
      </div>
    </div>
  );
};

export default ChatSkeleton;
