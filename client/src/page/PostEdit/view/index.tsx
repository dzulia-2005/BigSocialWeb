/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import image from 'antd/es/image';
import LeftSide from '../../../components/base/leftside';
import { Input } from '../../../components/ui/input';
import { useGetOnePost } from '../../../react-query/query/post';
import { useParams } from 'react-router-dom';
import Postcommentskeleton from '../../../components/skeletons/postcommentskeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useUpdatePost } from '../../../react-query/mutation/post';



const EditPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>(); 
  const { data ,isLoading}: { data: any ,isLoading:any} = useGetOnePost(postId || ""); 
  const {mutate:updatePost} = useUpdatePost();

  const [caption,setCaption]= useState<string>("");
  const [imageFile,setImageFile] = useState<File | null>(null);
  
  const handleCaptionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  }

  const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
        setImageFile(e.target.files[0]);
    }
  }

  const handleUpdatePost = () => {
    if (postId && (caption || imageFile)) {
      const formData = new FormData();
      formData.append("postId", postId);
      if (caption) formData.append("caption", caption);
      if (imageFile) {
        formData.append("image", imageFile);
        console.log("Image file added:", imageFile.name); 
      } else {
        console.log("No image file provided");
      }
  
      updatePost(
        { payload: formData },
        {
          onSuccess: () => {
            alert("Post updated successfully");
          },
          onError: (error) => {
            console.error("Error updating post:", error);
            alert("Error updating post.");
          },
        }
      );
    }
  };
  

  if (isLoading) {
    return <Postcommentskeleton/>
  }

  return (
    <div className='mx-auto flex flex-col md:flex-row gap-9'>
      <LeftSide />
      <section className='md:w-3/4 space-y-8 flex flex-col'>
         {data && (
             <div className="rounded-xl shadow bg-[#EAFF96]" key={data._id}>
               <div className="flex items-center justify-between pr-6 relative">
                 <div className="pl-6 flex items-center pt-6">
                   <Avatar>
                     <AvatarImage
                       className="rounded-full h-10 w-10"
                       src={data.user?.profilePicture || image}
                     />
                   </Avatar>
                   <div className="ml-4">
                     <div className="p-0">{data.user?.username}</div>
                   </div>
                 </div>
               </div>
               <div className="pl-6 flex items-center justify-around">
                 <Input
                      placeholder="edit caption"
                      className="w-[70%] bg-[#4F4F4F] border-none text-[#ffff] focus:outline-none my-2"
                      value={caption}
                      onChange={handleCaptionChange}
                      name='text'
                    />
                    <label htmlFor="image-upload">
                         <FontAwesomeIcon className="w-7 h-7 cursor-pointer" icon={faImage} />
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleChangeImage}
                        style={{ display: 'none' }}
                    />
               </div>
               <div className="mx-6">
                 <img
                   src={data.image.length > 0 ? data.image[0] : null}
                   className="w-full h-auto"
                 />
               </div>

               <div className='pl-6 pt-5'>
                 <button
                   onClick={handleUpdatePost}
                   className="text-[#EAFF96] bg-[#151515] rounded-xl h-6 w-40 text-xs mb-2"
                 >
                   Edit
                 </button>
               </div>
             </div>
           )}
      </section>
      <aside className='md:w-1/3 space-y-8'></aside>
    </div>
  );
};

export default EditPost;