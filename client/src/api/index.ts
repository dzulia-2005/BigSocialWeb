import axios , {CreateAxiosDefaults} from "axios";

const axiosConfig:CreateAxiosDefaults = {
    baseURL:import.meta.env.VITE_API_BASE_URL
}

export const httpClient = axios.create(axiosConfig);


export const setAuthorazationHeader = (accessToken:string) => {
    httpClient.defaults.headers.common["Authorization"] = accessToken
    console.log(accessToken)
}