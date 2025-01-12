import { Input } from '../../../components/ui/input';
import { Avatar, AvatarImage } from '../../../components/ui/avatar';
import image from '../../../assets/defaultprofileimg.webp';
import Sidebar from '../components/sidebar';
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext';
import {useGetMessage} from '../../../react-query/query/message/index'



const Chat = () => {

  const {user} = useAuthContext();
  const userId = user?._id;
  const {data:Getmessage} = useGetMessage(userId || "");

  console.log(Getmessage,"this is data message");
  
  return (
    <div className="rounded-xl shadow bg-[#EAFF96] h-[600px] overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar/>

        {/* Chat Window */}
        <div className="w-full flex flex-col justify-between p-6">
          <div className="overflow-y-auto max-h-[500px] space-y-6">
            
            {/* Incoming Message */}
            <div className="flex gap-4 items-start">
              <Avatar>
                <AvatarImage
                  className="rounded-full h-10 w-10"
                  src={image}
                />
              </Avatar>
              <div className="bg-[#039005] w-auto max-w-[70%] rounded-md text-[#fff] p-4">
                <p className="text-base">
                  როგორ ხარ ნიკა? ძალიან მომენატრე, სად დაიკარგე? შეგიძლია ხვალ
                  მესტუმრო და პლეისთეიშენი ვითამაშოთ?
                </p>
              </div>
            </div>

            {/* Outgoing Message */}
            <div className="flex gap-4 items-start justify-end">
              <div className="bg-[#386dc5] w-auto max-w-[70%] rounded-md text-[#fff] p-4">
                <p className="text-base">
                  აუცილებლად! ძალიან კარგია იდეა, ნიკა!
                </p>
              </div>
              <Avatar>
                <AvatarImage
                  className="rounded-full h-10 w-10"
                  src={image}
                />
              </Avatar>
            </div>

          </div>

          
          {/* Message Input */}
          <div className="flex items-center gap-4 mt-4 border-t border-[#ccc] pt-4">
            <Input
              placeholder="Type your message..."
              className="flex-grow border-none focus:outline-none bg-[#4f4f4f] rounded-md p-4 text-[#ffff]"
            />
            <button className="bg-[#386dc5] text-[#fff] px-6 py-2 rounded-md hover:bg-[#274a8f]">
              Send
            </button>
          </div>


        </div>



      </div>
    </div>
  );
};

export default Chat;
