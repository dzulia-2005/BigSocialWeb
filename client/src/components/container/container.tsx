import React, { PropsWithChildren } from 'react'

const Container:React.FC<PropsWithChildren>=({children})=> {
  return (
    <div className='bg-[#424448] h-screen flex overflow-x-hidden'>{children}</div>
  )
}

export default Container