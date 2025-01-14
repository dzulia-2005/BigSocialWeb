import { useQuery } from "@tanstack/react-query"
import { getUser, SearchUser } from "../../../api/user"

export const useGetUser = (userId:string) => {
    return useQuery({
        queryKey:["getuser",userId],
        queryFn:()=>getUser({userId})
    })
}


export const useSearchUser = (query:string) => {
    return useQuery({
        queryKey:["searchuser",query],
        queryFn:()=>SearchUser({query}),
        enabled: Boolean(query),
    })
}