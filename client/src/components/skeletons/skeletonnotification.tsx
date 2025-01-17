
const SkeletonNotification = () => {
  return (
    <div className=" rounded-xl shadow bg-[#EAFF96] h-16 pt-2 pl-3.5 animate-pulse flex flex-col justify-center">
      <div className="bg-gray-200 w-3/4 h-4 mb-2 rounded"></div>
      <div className="bg-gray-200 w-1/2 h-4 rounded"></div>
    </div>
  );
};

export default SkeletonNotification;
