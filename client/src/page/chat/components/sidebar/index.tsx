/* eslint-disable @typescript-eslint/no-explicit-any */
import Search from '../../../../components/ui/search';
import { useAuthContext } from '../../../../context/auth/hooks/useAuthContext';
import { useGetConversationOfUser } from '../../../../react-query/query/conversation';
import { Avatar } from '../../../../components/ui/avatar';
import SkeletonLoader from '../../../../components/skeletons/chatsidebarskeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeleteConversation } from '../../../../react-query/mutation/conversation';
import Image from "../../../../assets/profileimg.jpg"

const Sidebar = ({ onSelectUser }:{onSelectUser:any}) => {
    const { user } = useAuthContext();
    const userId = user?._id
    const { data: conversation ,isLoading} = useGetConversationOfUser(userId || "");
    
    const {mutate:deleteConversation} = useDeleteConversation();

    
    const handleConversationClick = (userId:any) => {
      onSelectUser(userId); 
    };

    if (isLoading) {
      return <SkeletonLoader/>
    }

    const handleDeleteClick = (conversationId:string) => {
      deleteConversation({conversationId})
    }
  
  return (
    <div className="w-[30%] border-r border-[#ccc] hidden md:flex flex-col p-4 bg-[#EAFF96]">
          <Search/>
          <div className="overflow-y-auto max-h-full space-y-4"> 
          {conversation?.map((c) => (
            <div
              key={c._id}
              className="flex gap-[30%] items-center py-4 px-2 border-t border-[#ccc] cursor-default"
              onClick={() =>
                handleConversationClick(
                  c.participants[0]?._id !== userId ? c.participants[0]?._id : c.participants[1]?._id
                )
              }
            >
              <div className='flex items-center'>
                 <Avatar>
                   <img
                     className="rounded-full h-10 w-10"
                     src={
                       c.participants[0]?._id !== userId
                         ? `https://${c.participants[0]?.profilePicture}`
                         : Image
                     }
                     onError={(e) => (e.currentTarget.src = Image)}
                   />
                 </Avatar>
                 <div className="ml-4">
                   <div className="font-semibold text-[#333]">
                     {c.participants[0]?._id !== userId
                       ? c.participants[0]?.username
                       : c.participants[1]?.username}
                   </div>
                 </div>

              </div>

              <div className=''>
                <FontAwesomeIcon 
                    icon={faTrash} className='text-red-600' 
                    onClick={(e)=>{
                      e.stopPropagation()
                      handleDeleteClick(c._id)
                    }}/>
              </div>
            </div>
          ))}                     
      </div>
    </div>
  )
}

export default Sidebar