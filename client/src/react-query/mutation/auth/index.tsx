import { useMutation } from "@tanstack/react-query";
import { Login, refresh, Register } from "../../../api/auth";


export const useSignIn = () => {
    return useMutation({ 
        mutationKey : ["sign-in"],
        mutationFn:Login
    })
}

export const useSignUp = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutation<any,any,any>({
        mutationKey : ["sign-up"],
        mutationFn:Register
    })
}


export const useRefresh = () => {
    return useMutation({
        mutationKey:["refresh"],
        mutationFn:refresh
    })
}
