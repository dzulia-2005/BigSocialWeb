import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSignOut } from '../../../react-query/query/auth'
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext'
import Headersearchinput from '../../ui/headersearchinput'

const Header:React.FC = () => {
    const { user } = useAuthContext();
    const [position, setPosition] = useState("bottom")
    const navigate = useNavigate();
    const { refetch: handleLogOut } = useSignOut();


    const handleLogoutClick = async () => {
      try {
        const { data } = await handleLogOut(); 
        console.log('User logged out successfully:', data);
        navigate('/');
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Failed to log out. Please try again.');
      }
    };
  return (
    <header className='w-full h-16 bg-[#151515] border-b border-[#585858]-500 fixed z-10'>
    <nav className='py-4 px-7' >
        <ul className='flex items-center justify-between'>   
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <FontAwesomeIcon className=' w-7 h-7 text-[#858585]' icon={faBars} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#151515] border-[#585858] ml-3 mt-5 "> 
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <NavLink to={"/home"}> <DropdownMenuRadioItem className='text-[#ffff]' value="top">home</DropdownMenuRadioItem></NavLink>
                    <NavLink to={`/profile/${user?._id}`}><DropdownMenuRadioItem className='text-[#ffff]' value="bottom">Profile</DropdownMenuRadioItem></NavLink>
                    <NavLink to={"/notification"}><DropdownMenuRadioItem className='text-[#ffff]' value="right">notification</DropdownMenuRadioItem></NavLink>
                    <NavLink to={"/chat"}><DropdownMenuRadioItem className='text-[#ffff]' value="right">chat</DropdownMenuRadioItem></NavLink>
                    <DropdownMenuRadioItem className='text-[#ffff]' value="right" onClick={handleLogoutClick}>LogOut</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative w-full max-w-[50%] sm:max-w-[40%] md:max-w-[35%] lg:max-w-[30%] mx-auto">
              <Headersearchinput/>
            </div>
        </ul>
    </nav>
</header>
  )
}

export default Header