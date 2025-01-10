/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext';
import { useGetUserPost } from '../../../react-query/query/post';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import image from 'antd/es/image';
import LeftSide from '../../../components/base/leftside';
import { Input } from '../../../components/ui/input';
import { useCreateComment } from '../../../react-query/mutation/comment';
import Comments from '../components';
import { queryClient } from '../../../main';

const CommentRoute: React.FC = () => {
  const { user } = useAuthContext();
  const { data }: { data: any } = useGetUserPost(user?._id || "");

    const [commentText, setCommentText] = useState("");
    const { mutate: createComment } = useCreateComment()
    
    const handleAddComment = (postId: string) => {
      if (!user?._id || !commentText.trim()) {
        console.error("Comment text is empty or user is not logged in.");
        return;
      }
    
      const payload = {
        userId: user._id,
        postId: postId,
        text: commentText,
      };
    
      createComment(payload, {
        onSuccess: () => {
          console.log("Comment successfully created!");
          setCommentText("");
          if (user?._id) {
            queryClient.invalidateQueries(['create-comment', user._id], { exact: true });
          }             
        },
        onError: (error) => {
          console.error("Failed to add comment:", error);
        },
        onSettled: () => {
          console.log("Mutation process completed.");
        },
      });
    };

  return (
    <div className='mx-auto flex flex-col md:flex-row gap-9'>
      <LeftSide/>
      <section className='md:w-3/4 space-y-8 flex flex-col'> 
        {data && Array.isArray(data.posts) && data.posts.map((post: any) => (
          <div className="rounded-xl shadow bg-[#EAFF96]" key={post._id}>
            <div className="flex items-center justify-between pr-6 relative">
              <div className="pl-6 flex items-center pt-6">
                <Avatar>
                  <AvatarImage 
                    className="rounded-full h-10 w-10" 
                    src={post.user?.profilePicture || image} 
                  />
                </Avatar>
                <div className="ml-4">
                  <div className="p-0">{post.user?.username}</div>
                </div>
              </div>
            </div>
            <div className="pl-6">
              <p className="py-2">{post.caption}</p>
            </div>
            <div className="mx-6">
              <img 
                src={post.image.length > 0 ? post.image[0] : image} 
                alt="Post" 
                className="w-full h-auto" 
              />
            </div>

            {/* Add comment */}
            <div className="flex items-center px-6 py-4">
              <Avatar>
                <AvatarImage 
                  className="rounded-full h-10 w-10" 
                  src={post.user?.profilePicture || image} 
                />
              </Avatar>
              <div className="ml-4">
                <div className="p-0">You</div>
              </div>
            </div>
            <div className='pl-6'>
              <Input
                placeholder="Create new comment"
                className="w-[70%] bg-[#4F4F4F] border-none text-[#ffff] focus:outline-none mb-2"
                name='text'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                className="text-[#EAFF96] bg-[#151515] rounded-xl h-6 w-40 text-xs mb-2" 
                onClick={() => handleAddComment(post._id)}
              >
                Add
              </button>
            </div>
            <Comments postId={post._id}/>
          </div>
        ))}
      </section>
      <aside className='md:w-1/3 space-y-8'></aside>
    </div>
  );
};

export default CommentRoute;
