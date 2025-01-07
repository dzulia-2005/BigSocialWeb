import React from 'react'
import LeftSide from '../../../components/base/leftside'
import Profileeditcomp from '../components/profileEditcomp/profileeditcomp'
import Sharecomp from '../../../components/base/sharecomponent'
import Rightside from '../../home/components/rightside'
import Posts from '../../../components/base/posts/posts'


const Profile:React.FC = () => {
  return (
    <div className='mx-auto flex flex-col md:flex-row gap-9 '>
                <LeftSide/>
                <section className='md:w-3/4 space-y-8 flex flex-col'> 
                    <Profileeditcomp/>
                    <Sharecomp/>
                    <Posts/>
                </section> 
                <Rightside/>
        </div>
  )
}

export default Profile