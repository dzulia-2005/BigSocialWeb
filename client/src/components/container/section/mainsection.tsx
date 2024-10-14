import React, { PropsWithChildren } from 'react'

const Mainsection:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <section className='w-[100%]'>
            <div className=' w-full h-full pt-[9%] pl-[3%] pr-[3%] flex'>
                {children}
            </div>
     </section>           
  )
}

export default Mainsection