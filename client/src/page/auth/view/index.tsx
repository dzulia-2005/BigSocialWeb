import { Tabs, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import React from 'react'
import Login from '../components/login/login'
import SignUp from '../components/signup/signup'



const Auth:React.FC = () => {

  return (
   <div className='bg-[#151515] flex justify-center items-center min-h-screen'>
     <Tabs defaultValue="account" className="w-[400px] ">
        <TabsList className="bg-[#EAFF96] grid w-full grid-cols-2 mb-2">
          <TabsTrigger  value="account" >Login</TabsTrigger>
          <TabsTrigger value="password">Register</TabsTrigger>
        </TabsList>
          <Login/>
          <SignUp/>
      </Tabs>
   </div>
  )
}

export default Auth


