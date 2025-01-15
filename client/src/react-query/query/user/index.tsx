import { useQuery } from "@tanstack/react-query"
import { getallfollowers, getUser, SearchUser } from "../../../api/user"
import { GetAllFollowers } from "../../../api/user/index.types"

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

export const useGetallfollowers = (userId:string) => {
    return useQuery<GetAllFollowers[] | undefined>({
        queryKey:["getall-followers-notification",userId],
        queryFn:()=>getallfollowers({userId})
    })
}