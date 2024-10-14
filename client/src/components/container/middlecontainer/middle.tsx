import React, { PropsWithChildren } from 'react'

const Middle:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='w-[50%] h-full mt-[20px] mb-[20px]'>{children}</div>
  )
}

export default Middle