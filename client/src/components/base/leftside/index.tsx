import { faRocketchat } from '@fortawesome/free-brands-svg-icons'
import { faBell, faHouse, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSignOut } from '../../../react-query/query/auth'

const LeftSide:React.FC = () => {

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
    <aside className=" md:w-1/6 space-y-8 hidden  md:block">
    <div className="flex flex-col mt-[8rem]">
        <div className="flex flex-col gap-[8rem] fixed">
            <ul className="flex flex-col gap-5 ">
                <NavLink to="/home"><div><FontAwesomeIcon icon={faHouse} className="h-7 w-7 text-[#858585]" /></div></NavLink>
                <NavLink to="/profile"><div><FontAwesomeIcon icon={faUser} className="h-7 w-7 text-[#858585]" /></div></NavLink>
                <div><FontAwesomeIcon icon={faBell} className="h-7 w-7 text-[#858585]" /></div>
                <div><FontAwesomeIcon icon={faRocketchat} className="h-7 w-7 text-[#858585]" /></div>
            </ul>
            <ul onClick={handleLogoutClick}>
                <div>
                    <FontAwesomeIcon icon={faRightFromBracket} className="h-7 w-7 text-[#858585]" />
                </div>
            </ul>
        </div>
    </div>
</aside>
  )
}

export default LeftSide