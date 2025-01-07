import React from 'react'
import Rightside from '../components/rightside';
import LeftSide from '../../../components/base/leftside/index';
import Sharecomp from '../../../components/base/sharecomponent/index';
// import Posts from '../../../components/base/posts/posts';




const Home:React.FC = () => {

  

  return (
  <>
        <div className='mx-auto flex flex-col md:flex-row gap-9 lg:justify-evenly'>
                <LeftSide/>
                <section className='md:w-3/4 space-y-8 flex flex-col'>
                    <Sharecomp/>
                    {/* {posts.map((p)=>(
                      <Posts key={p._id}/>
                    ))} */}
                </section>
                <Rightside />
        </div>
     
  </>
  )
}

export default Home