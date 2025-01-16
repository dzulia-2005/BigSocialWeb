/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSearchUser } from "../../react-query/query/user";
import { useCreateNewConversation } from "../../react-query/mutation/conversation";
import { useAuthContext } from "../../context/auth/hooks/useAuthContext";

const SearchInput = () => {
  const { user } = useAuthContext(); 
  const userId = user?._id;

  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useSearchUser(searchQuery);

  console.log(data?.users[0]?._id,"this is cdscs");

  const { mutate: createConversation } = useCreateNewConversation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleUserClick = (secondUserId: string | undefined) => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }
    if (!secondUserId) {
      console.error("Selected user ID is undefined.");
      return;
    }

    createConversation({
      payload: {
        firstUser: userId, 
        secondUser: secondUserId
      },
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      
      <div className="relative w-80">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        
        {isLoading && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <p className="px-4 py-2">Loading...</p>
          </div>
        )}

        
        {!isLoading && data && data.users.length > 0 && (
          <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {data.users.map((user: any) => (
              <li
                key={user._id}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center space-x-3"
                onClick={() => handleUserClick(user._id)} 
              >
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        )}

        
        {!isLoading && data && data.users.length === 0 && searchQuery && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <p className="px-4 py-2">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
