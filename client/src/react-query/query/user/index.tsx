import { useQuery } from "@tanstack/react-query"
import { getUser, SearchUser } from "../../../api/user"

export const useGetUser = () => {
    return useQuery({
        queryKey:["getuser"],
        queryFn:getUser
    })
}


export const useSearchUser = (query:string) => {
    return useQuery({
        queryKey:["searchuser",query],
        queryFn:()=>SearchUser({query}),
        enabled: Boolean(query),
    })
}