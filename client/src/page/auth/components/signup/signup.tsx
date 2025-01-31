import {  TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import {Controller, useForm} from "react-hook-form"
import { SignUpPayload } from '../../../../api/auth/index.types'
import { SignupSchema } from './shcema'
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from '../../../../react-query/mutation/auth'
import { useNavigate } from 'react-router-dom'
import { notification } from "antd";


type registerFormValues = SignUpPayload["payload"]

const registerFormDefaultvalues:registerFormValues = {
  email:"",
  username:"",
  password:"",
}

const SignUp:React.FC = () => {

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState:{errors}
  } = useForm<registerFormValues>({
    defaultValues:registerFormDefaultvalues,
    resolver :zodResolver(SignupSchema),
  })

  const {mutate:handleRegister} = useSignUp()

  console.log(errors)

  const onSubmit = (SignUpPayload:registerFormValues) => {
    handleRegister({payload:SignUpPayload}
      ,{
         onSuccess:() => {
          notification.open({
            message: 'Now Log In',
            description: 'you created account successfully',
            placement: 'topRight',
          });
          navigate("/")
         },
         onError:()=>{
          notification.open({
            message: 'Registration Failed',
            description: 'You could not register.',
            placement: 'topRight',
          });
         }
      })
  }


  return (
    
    <TabsContent value="password">
        <Card className='bg-[#EAFF96]'>
          <CardHeader>
            <CardTitle className='text-[#000]'>Register</CardTitle>
            <CardDescription>Create Account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current" className='text-[#000]'>Username</Label>

              <Controller   
                    control={control} 
                    name='username' 
                    render={({field:{onChange,value}})=>{
                return  <Input 
                           className="bg-[#252525] text-[#ffff] border-none focus:outline-none focus:ring-0 shadow-none"
                           onChange={onChange}
                           value={value}
                        />
                 }}/>

                 {errors.username&&(
                  <p className='text-red-600'>{errors.username.message}</p>
                 )}

            </div>
          <div className="space-y-1">
              <Label htmlFor="name" className='text-[#000]'>Email</Label>

              <Controller 
                    control={control} 
                    name='email' 
                    render={({field:{onChange,value}})=>{
                return  <Input 
                          className="bg-[#252525] text-[#ffff] border-none focus:outline-none focus:ring-0 shadow-none"
                          onChange={onChange}
                          value={value}
                        />
              }}/>

              {errors.email && (
                <p className='text-red-600'>{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="name" className='text-[#000]'>Password</Label>

              <Controller 
                  control={control} 
                  name='password' 
                  render={({field:{onChange,value}})=>{
                     return   <Input 
                               className="bg-[#252525] text-[#ffff] border-none focus:outline-none focus:ring-0 shadow-none"
                               onChange={onChange} 
                               value={value}
                               type='password'
                              />
                }}/>

                {errors.password && (
                  <p className='text-red-600'>{errors.password.message}</p>
                )}
            </div>
          </CardContent>
          <CardFooter >
            <Button onClick={handleSubmit(onSubmit)} className='flex hover:bg-[#000] items-center text-[#EAFF96] bg-[#000]'>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    
  )
}

export default SignUp