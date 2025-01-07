import { useQuery } from "@tanstack/react-query";
import { Logout, me } from "../../../api/auth";
import { setAuthorazationHeader } from "../../../api";



export const useGetMe = ({
    isEnabled,
    accessToken
}:{
    isEnabled:boolean;
    accessToken:string|null
}) => {
    if (accessToken) {
        setAuthorazationHeader(`Bearer ${accessToken}`)
    }

    return useQuery({
        queryKey:["me"],
        queryFn:me,
        enabled:isEnabled
    })
}


export const useSignOut = () => {
    return useQuery({
        queryKey:["sign_out"],
        queryFn:Logout
    })
}