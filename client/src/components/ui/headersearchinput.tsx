/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useSearchUser } from "../../react-query/query/user";
import { useAuthContext } from "../../context/auth/hooks/useAuthContext";
import { NavLink } from "react-router-dom";
import Image from "../../assets/profileimg.jpg"

const Headersearchinput = () => {
    const { user } = useAuthContext();
    const [searchQuery, setSearchQuery] = useState("");
    const { data, isLoading } = useSearchUser(searchQuery);
    const filteredUsers = data?.users.filter((searchedUser: any) => searchedUser.username !== user?.username);
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setIsOpen(true); 
      };

    const handleOutsideClick = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false); 
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

      const inputRef = useRef<HTMLInputElement>(null);
    

  return (
    <div ref={inputRef} >
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!isLoading && isOpen && filteredUsers && filteredUsers.length > 0 && (
            <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {filteredUsers.map((user: any) => (
                <NavLink to={`/profile/${user?._id}`}>
                   <li
                     key={user._id}
                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center space-x-3"
                   >
                     <img
                       src={user.profilePicture ? `https://${user.profilePicture}` : Image}
                       alt={user.username}
                       className="w-8 h-8 rounded-full"
                       onError={(e) => (e.currentTarget.src = Image)}
                     />
                     <span>{user.username}</span>
                   </li>
                </NavLink>
              ))}
            </ul>
          )}
      </div>
   
  )
}

export default Headersearchinput