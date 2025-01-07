import { useQuery } from "@tanstack/react-query"
import { getUser, SearchUser } from "../../../api/user"

export const useGetUser = () => {
    return useQuery({
        queryKey:["getuser"],
        queryFn:getUser
    })
}

export const useSearchUser = () => {
    return useQuery({
        queryKey:["searchuser"],
        queryFn:SearchUser
    })
}