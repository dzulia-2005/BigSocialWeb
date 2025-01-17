import React from 'react'
import LeftSide from '../../../components/base/leftside'
import Profileeditcomp from '../components/profileEditcomp/profileeditcomp'
import Sharecomp from '../../../components/base/sharecomponent'
import { useAuthContext } from '../../../context/auth/hooks/useAuthContext'
import { useParams } from 'react-router-dom'
import { useGetUser } from '../../../react-query/query/user'
import Rightside from '../../../components/base/rightsidefollowers';
import UserPostFeed from '../components/post'

const Profile:React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuthContext();
  const { data: userData } = useGetUser(userId ?? "");
  
  
  return (
    <div  className='mx-auto flex flex-col md:flex-row gap-9 '>
                <LeftSide/>
                <section className='md:w-3/4 space-y-8 flex flex-col'> 
                    <Profileeditcomp/>
                    {user?._id === userData?._id ? <Sharecomp/> : null} 
                    <UserPostFeed/>
                </section> 
                    <Rightside/>
        </div>
  )
}

export default Profile