import React, {  } from 'react'
import LeftSide from '../../../components/base/leftside/index';
import Sharecomp from '../../../components/base/sharecomponent/index';
import Rightside from '../../../components/base/rightsidefollowers';
import PostFeed from '../components/post';



const Home:React.FC = () => {
  
  return (
  <>
    <div  className='mx-auto flex flex-col md:flex-row gap-9 lg:justify-evenly'>
            <LeftSide/>
            <section className='md:w-3/4 space-y-8 flex flex-col'>
                <Sharecomp/>
                <PostFeed/>
            </section>
            <Rightside />
    </div>
  </>
  )
}

export default Home