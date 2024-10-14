import React from 'react'
import Container from '../../components/container/container'
import Header from '../../components/header/header'
import Mainsection from '../../components/container/section/mainsection'
import Leftcomponent from '../../components/leftsidecomponent/leftcomponent'
import Middle from '../../components/container/middlecontainer/middle'
import Rightcomponent from '../../components/rightsidecomponent/rightcomponent'

const Notification:React.FC = () => {
  return (
    <Container >
    <Header/>
       <Mainsection>
                <Leftcomponent/>
                <Middle>
                <div className='flex justify-center w-[100%] h-auto'>
                           <div className='bg-[#4F4F4F] w-[90%] h-auto rounded-[10px] p-[3%]'>
                                <div className='text-[#fff]'>user1 sent you request</div>
                                <div className='text-[#FFF] text-[12px] pt-[1%]'>1 days ago</div>
                           </div>
                        </div>
                        
                        
                        
                   </Middle>
                   <Rightcomponent/>
       </Mainsection>
     </Container>           
  )
}

export default Notification