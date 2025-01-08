import { httpClient } from "..";
import { AUTH_ENDPOINTS } from "./index.enum";
import { LoginPayload ,meResponse,refreshPayload,SignUpPayload} from "./index.types";
 
export const Login = ({payload}:LoginPayload) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return httpClient
        .post(AUTH_ENDPOINTS.Sign_In , payload,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "X-Refresh-Token": refreshToken,
            }
        })
        .then((res)=>res.data)
}

export const Register = ({payload}:SignUpPayload) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    
    return httpClient
        .post(AUTH_ENDPOINTS.Sign_up , payload,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "X-Refresh-Token": refreshToken,
            }
        })
        .then((res)=>res.data)
}

export const Logout = () => {
    return httpClient
        .get(AUTH_ENDPOINTS.Log_out)
        .then((res)=>res.data)
}

export const me = () => {
    return httpClient
        .get<meResponse>(AUTH_ENDPOINTS.Me)
        .then((res)=>res.data)
}

export const refresh = ({payload}:refreshPayload) => {
    return httpClient
    .post(AUTH_ENDPOINTS.Refresh,payload)
    .then((res)=>res.data)
}
