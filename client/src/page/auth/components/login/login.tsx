import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "../../../../components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { LoginPayload } from "../../../../api/auth/index.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./shcema";
import { useSignIn } from "../../../../react-query/mutation/auth";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { SignInSuccess } from "./utils";
import { queryClient } from "../../../../main";

type loginFormValues = LoginPayload["payload"];

const LoginFormDefaultValues:loginFormValues = {
  email:"",
  password:""
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState:{errors}
  } =useForm<loginFormValues>({
    defaultValues:LoginFormDefaultValues,
    resolver:zodResolver(LoginSchema)
  });

  const {mutate:handleLogin} = useSignIn();

  console.log(errors)

  const onSubmit = (LoginPayload:loginFormValues) => {
    handleLogin({payload:LoginPayload} , { 
    onSuccess:(res) => {
      SignInSuccess({
        accessToken:res.accessToken,
        refreshToken:res.refreshToken
      })
      navigate("/home")
      queryClient.invalidateQueries({queryKey:['me']})
    },
    onError: () => {
      notification.open({
        message: 'Login Failed',
        description: 'Login Not found',
        placement: 'topRight',
      });
    }    
    
  })
  }

  return (
    <TabsContent value="account">
      <Card className="bg-[#EAFF96]">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <form >
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>

              <Controller 
                control={control} 
                name="email"
                render={({field:{onChange,value}})=>{
                      return <Input
                              onChange={onChange}
                              value={value}
                              type="email"
                              className="bg-[#252525] text-[#ffff] border-none focus:outline-none focus:ring-0 shadow-none"
                            />
                }}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>

                <Controller 
                    control={control}
                    name="password"
                    render={({field:{onChange,value}})=>{
                      return <Input
                      onChange={onChange}
                      value={value}
                      type="password"
                      className="bg-[#252525] text-[#ffff] border-none focus:outline-none focus:ring-0 shadow-none"
                    />
                    }}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="text-[#EAFF96] bg-[#252525] hover:bg-[#353535]"
              onClick={handleSubmit(onSubmit)}
            >
              Log In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  );
};

export default Login;
