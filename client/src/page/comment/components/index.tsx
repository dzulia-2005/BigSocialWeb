import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import image from "../../../assets/defaultprofileimg.webp"
import { useGetAllComment } from "../../../react-query/query/comment";



const Comments:React.FC<{ postId?: string }> = ({ postId }) => {
    
      const { data } = useGetAllComment(postId);

  return (
   <>
   {data?.map((comment) => (
        <div>
        <div key={comment._id} className='py-4 border-t border-gray-300'>
            <div className="flex items-center px-6 py-">
               <Avatar>
                  <AvatarImage className="rounded-full h-10 w-10" src={comment.user?.profilePicture ||image} />
                </Avatar>
                <div className="ml-4">
                  <div className="p-0">{comment.user?.username }</div>
                </div>
            </div>
            <p className='pl-6 pt-2'>{comment.text}</p>
        </div>
   </div>
   ))}
   </>
  )
}

export default Comments