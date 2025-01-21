import React, { PropsWithChildren } from 'react'

const Maincontainer:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <main className=' px-7 py-24 flex-grow bg-white dark:bg-[#151515] text-[#000]'>
        {children}
    </main>
  )
}

export default Maincontainer