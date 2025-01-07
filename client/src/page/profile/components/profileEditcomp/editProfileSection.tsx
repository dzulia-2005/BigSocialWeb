import { useUpdateProfilePic, useUpdateCoverProfPic } from "../../../../react-query/mutation/user";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, } from "react";
import { useAuthContext } from "../../../../context/auth/hooks/useAuthContext";

type EditProfileSectionProps = {
  setProfilePictureUrl: (url: string) => void;
  setCoverPictureUrl:(url:string) => void;
};

const EditProfileSection:React.FC<EditProfileSectionProps> = ({
  setProfilePictureUrl,
  setCoverPictureUrl
}) => {
  const { user } = useAuthContext();
  const { mutate: updateProfilePic } = useUpdateProfilePic();
  const { mutate: updateCoverPic } = useUpdateCoverProfPic();
  const accessToken = localStorage.getItem("accessToken");

  
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "profilePicture" | "coverpicture"
  ) => {
    const file = e.target.files?.[0];
  
    if (!file || !accessToken || !user?._id) {
      console.error("Missing required information: file, accessToken, or user ID.");
      return;
    }
  
    if (type === "profilePicture") {
      updateProfilePic(
        {
          payload: {
            profilePicture: file,
            _id: user._id,
          },
        },
        {
          onSuccess: (data) => {
            const newProfilePictureUrl = `${data.User.profilePicture}?timestamp=${new Date().getTime()}`;
            setProfilePictureUrl(newProfilePictureUrl);

            
          },
        }
      );
    } else if (type === "coverpicture") {
      updateCoverPic(
        {
          payload: {
            coverpicture: file,
            _id: user._id,
          },
        },
        {
          onSuccess: (data) => {
            const newCoverPictureUrl = `${data.User.coverpicture}?timestamp=${new Date().getTime()}`;
            setCoverPictureUrl(newCoverPictureUrl); 
          },
        }
      );
    }
  };
  
  

  return (
    <div className="mt-4 px-6 pb-6">
      <h3 className="text-lg font-bold">Edit Profile</h3>
      <div className="mt-2">
        {/* Change Profile Picture */}
        <label htmlFor="profilePicture" className="flex items-center gap-2 font-bold cursor-pointer">
          <FontAwesomeIcon className="w-7 h-7" icon={faImage} />
          <div>Change Profile Picture</div>
        </label>
        <input
          id="profilePicture"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "profilePicture")}
        />

        {/* Change Cover Picture */}
        <label htmlFor="coverPicture" className="flex items-center gap-2 font-bold cursor-pointer">
          <FontAwesomeIcon className="w-7 h-7" icon={faImage} />
          <div>Change Cover Picture</div>
        </label>
        <input
          id="coverPicture"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "coverpicture")}
        />
      </div>
    </div>
  );
};

export default EditProfileSection;