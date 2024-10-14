import React, { PropsWithChildren } from 'react'
import Container from '../../components/container/container'
import Header from '../../components/header/header'
import Mainsection from '../../components/container/section/mainsection'
import Leftcomponent from '../../components/leftsidecomponent/leftcomponent'
import Rightcomponent from '../../components/rightsidecomponent/rightcomponent'
import { Outlet } from 'react-router-dom'
import Middle from '../../components/container/middlecontainer/middle'

const Layout:React.FC<PropsWithChildren> = () => {
  return (
   <>
     <Container>
        <Header/>
             <Mainsection>
                <Leftcomponent/> 
                        <Middle>
                          <Outlet/>  
                        </Middle>
                <Rightcomponent/>
             </Mainsection>
    </Container>
   </>
  )
}

export default Layout