/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import image from "../../../assets/defaultprofileimg.webp";
import { useGetAllComment } from "../../../react-query/query/comment";

const Comments: React.FC<{ postId: string }> = ({ postId }) => {
  const { data }:{data:any} = useGetAllComment(postId);

  const comments = data?.comments || [];

  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment:any) => {
          console.log(comment); 
          return (
            <div key={comment._id} className="py-4 border-t border-[#393636]">
              <div className="flex items-center px-6 py-2">
                <Avatar>
                  <AvatarImage
                    className="rounded-full h-10 w-10"
                    src={comment?.user.profilePicture || image}
                  />
                </Avatar>
                <div className="ml-4">
                  <div className="p-0">{comment.user?._doc.username || "Unknown"}</div>
                </div>
              </div>
              <p className="pl-6 pt-2">{comment.text}</p>
            </div>
          );
        })
      ) : (
        <div className="text-center">No comments found.</div>
      )}
    </>
  );
};

export default Comments;