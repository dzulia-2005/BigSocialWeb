/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import image from "../../../assets/defaultprofileimg.webp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Input } from '../../ui/input';
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext';
import { useCreatePostImg } from '../../../react-query/mutation/post';
import { queryClient } from '../../../main';

const Sharecomp: React.FC = () => {
    const { user } = useAuthContext(); 
    const [caption, setCaption] = useState<string>(''); 
    const [selectedFile, setSelectedFile] = useState<File | null>(null); 
    const {mutate:createPost } = useCreatePostImg(); 


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };


    const handlePost = () => {
        if (!caption.trim()) {
          alert("Please enter a caption for the post.");
          return;
        }
        if (!selectedFile) {
          alert("Please select an image.");
          return;
        }
        if (!user?._id) {
          alert("User not authenticated.");
          return;
        }
      
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("images", selectedFile);
      
        createPost(
          { userId: user._id, payload: formData },
          {
            onSuccess: () => {
              alert("Post created successfully!");
              queryClient.invalidateQueries<any>("create-postwith-img");
             
              setCaption("");
              setSelectedFile(null);
            },
            onError: (error) => {
              console.error("Error creating post:", error);
              alert("Failed to create post. Please try again.");
            },
          }
        );
      };


    return (
        <div className="rounded-xl shadow bg-[#EAFF96]">
            <div className="p-1 flex items-center justify-around pt-6">
                <div>
                        <Avatar>
                            <AvatarImage
                                className="rounded-full h-10 w-10"
                                src={user?.profilePicture || image}
                            />
                        </Avatar>
                </div>
                <Input
                    placeholder="Create new post"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)} 
                    className="w-[70%] bg-[#4F4F4F] border-none text-[#ffff] focus:outline-none"
                />
                <label htmlFor="image-upload">
                    <FontAwesomeIcon className="w-7 h-7 cursor-pointer" icon={faImage} />
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange} 
                    style={{ display: 'none' }}
                />
            </div>
            <div className="flex items-center p-6">
                <div className="flex space-x-2">
                    <button
                        className="text-[#EAFF96] bg-[#151515] rounded-xl h-6 w-40 text-xs"
                        onClick={handlePost} 
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sharecomp;
