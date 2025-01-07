import React, { PropsWithChildren } from 'react'

const Maincontainer:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <main className=' px-7 py-24 flex-grow bg-[#151515]'>
        {children}
    </main>
  )
}

export default Maincontainer