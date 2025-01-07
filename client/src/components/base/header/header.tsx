import { faBars, faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import React from 'react'
import { Input } from '../../ui/input'
import { NavLink } from 'react-router-dom'

const Header:React.FC = () => {
    const [position, setPosition] = React.useState("bottom")
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
                    <NavLink to={'/profile'}><DropdownMenuRadioItem className='text-[#ffff]' value="bottom">Profile</DropdownMenuRadioItem></NavLink>
                    <DropdownMenuRadioItem className='text-[#ffff]' value="right">notification</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem className='text-[#ffff]' value="right">chat</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
            </DropdownMenu>
            <div className='flex items-center bg-[#4F4F4F] lg:absolute right-[44%] rounded-md'>
                <div><FontAwesomeIcon icon={faMagnifyingGlassPlus} className='text-[#ffff] pl-1 rounded-sm' /></div>
                 <Input placeholder="username" className=' border-none text-[#ffff] focus:outline-none'/>
            </div>
        </ul>
    </nav>
</header>
  )
}

export default Header