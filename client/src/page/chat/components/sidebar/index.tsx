import Search from '../../../../components/ui/search';
import { useAuthContext } from '../../../../context/auth/hooks/useAuthContext';
import { useGetConversationOfUser } from '../../../../react-query/query/conversation';
import { Avatar, AvatarImage } from '../../../../components/ui/avatar';




const Sidebar = () => {
    const { user } = useAuthContext();
    const userId = user?._id
    const { data: conversation } = useGetConversationOfUser(userId || "");

  return (
    <div className="w-[30%] border-r border-[#ccc] hidden md:flex flex-col p-4 bg-[#EAFF96]">
    <Search/>
  <div className="overflow-y-auto max-h-full space-y-4"> 
  {conversation?.map((c) => (
    <div
      key={c._id}
      className="flex items-center py-4 px-2 border-t border-[#ccc]"
    >
      <Avatar>
        <AvatarImage
          className="rounded-full h-10 w-10"
          src={
            c.participants[0]?._id !== userId
              ? c.participants[0]?.profilePicture
              : c.participants[1]?.profilePicture
          }
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
  ))}                     
  </div>
</div>
  )
}

export default Sidebar