/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '../../../components/ui/input';
import { Avatar, AvatarImage } from '../../../components/ui/avatar';
import image from '../../../assets/profileimg.jpg';
import Sidebar from '../components/sidebar';
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext';
import { useGetMessage } from '../../../react-query/query/message/index';
import { useGetConversationOfUser } from '../../../react-query/query/conversation';
import {  useRef, useState } from 'react';
import { useCreateMessage } from '../../../react-query/mutation/message';
import { queryClient } from '../../../main';
import { useTranslation } from 'react-i18next';
import EmojiPicker from 'emoji-picker-react';


const Chat = () => {
  const { user } = useAuthContext();
  const userId = user?._id;
  const [selectedUserId, setSelectedUserId] = useState(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); 
  const { data: conversation } = useGetConversationOfUser(userId || "");
  const [newMessage, setNewMessage] = useState("");
  const { mutate: sendMessage,} = useCreateMessage(); 
  const {t}=useTranslation();
  const conversationId = conversation?.find(
    (c) =>
      c.participants[0]?._id === selectedUserId || c.participants[1]?._id === selectedUserId
  )?._id;
  const { data: Getmessage } = useGetMessage(conversationId || "" );
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);



  const handleSubmit = () => {
   
      if (!newMessage.trim()) {
        alert("Please enter a message.");
        return;
      }
  
      if (!conversationId) {
        alert("No conversation selected. Please select a conversation.");
        return;
      }
  
      if (!userId) {
        alert("User not authenticated.");
        return;
      }

  sendMessage(
    {
      payload: {
        conversationId,
        sender: userId,
        text: newMessage,
      },
    },
    {
      onSuccess: () => {
        setNewMessage(""); 
        queryClient.invalidateQueries({
          queryKey: ["get-message", conversationId],
          onSuccess: () => {
            console.log("Successfully fetched messages");
          },
          
          onError: (err: any) => {
            console.error("Error fetching messages", err);
            alert("Failed to fetch messages. Please try again.");
          }
        });
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      },
      onError: () => {
        alert("Failed to send message. Please try again.");
      },
    }
  );
};

const handleEmojiClick = (emojiObject: any) => {
  setNewMessage((prev) => prev + emojiObject.emoji);
  setShowEmojiPicker(false);
};

  return (
    <div className="rounded-xl shadow bg-[#EAFF96] h-[600px] overflow-hidden">
      <div className="flex h-full">
        <Sidebar  onSelectUser={setSelectedUserId}/>
          {selectedUserId ? (
            <div className="w-full flex flex-col justify-between p-6">
              <div className="overflow-y-auto max-h-[500px] space-y-6">
                {Getmessage && Getmessage.length > 0 ? (
                  Getmessage.map((message) => (
                    <div
                      key={message._id}
                      className={`flex gap-4 items-start ${
                        message.sender._id === userId ? "justify-end" : ""
                      }`}
                    >
                      {message.sender._id !== userId && (
                        <Avatar>
                          <img
                            className="rounded-full h-10 w-10"
                            src={message.sender.profilePicture ? `https://${message.sender.profilePicture}`: image}
                            onError={(e) => (e.currentTarget.src = image)}
                          />
                        </Avatar>
                      )}
                      <div
                        className={`w-auto max-w-[70%] rounded-md text-[#fff] p-4 ${
                          message.sender._id === userId
                            ? "bg-[#386dc5] text-right"
                            : "bg-[#039005]"
                        }`}
                      >
                      <p className="text-base">{message.text}</p>
                      </div>
                      {message.sender._id === userId && (
                        <Avatar>
                          <AvatarImage
                            className="rounded-full h-10 w-10"
                            src={message.sender.profilePicture ? `https://${message.sender.profilePicture }`: image}
                            onError={(e) => (e.currentTarget.src = image)}
                          />
                        </Avatar>
                      )}
                    </div>
                  ))
                   ) : (
                     <div className="text-center text-gray-500">{t("chat.Nomessages")}</div>
                )
              }
                <div ref={messagesEndRef} />
              </div>
              
              <div className="flex items-center gap-4 mt-4 border-t border-[#ccc] pt-4">
              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 z-10">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <button
                className="bg-[#386dc5] text-[#fff] px-4 py-2 rounded-md hover:bg-[#274a8f]"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                😊
              </button>
                <Input
                  placeholder="Type your message..."
                  className="flex-grow border-none focus:outline-none bg-[#4f4f4f] rounded-md p-4 text-[#ffff]"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <button
                  className="bg-[#386dc5] text-[#fff] px-6 py-2 rounded-md hover:bg-[#274a8f]"
                  onClick={handleSubmit}
                  disabled={!newMessage.trim() || !conversationId || !userId}
                >
                  {t("chat.Send")}
                </button>
              </div>
            </div>
          ) : (
            <span className="relative top-52 text-neutral-300 text-[40px] items-center left-8 cursor-default">
              {t("chat.startChat")}
            </span>
          )}
      </div>
    </div>
  );
};

export default Chat;
