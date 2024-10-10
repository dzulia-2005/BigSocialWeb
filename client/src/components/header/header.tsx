import React from 'react'

const Header:React.FC = () => {
  return (
    <>
    <header className='w-full h-[60px] bg-[#105AE9] fixed z-[100]'>
            <nav>
              <ul className='flex items-center justify-between'>
                <div>
                  <img className='absolute left-[2%]  w-[60px] ' src="../../../public/logomain.png"/>
                </div>
                <div className='absolute h-full right-[46%] top-[11px] translate-x-1/2"'>
                  <input type="text" className='bg-[#4F4F4F] rounded-xl w-[169%] h-[40px] text-[#ffff] focus:outline-none text-base' placeholder='   Search'/>
                </div>
              </ul>
            </nav>
      </header>
    </>
  )
}

export default Header