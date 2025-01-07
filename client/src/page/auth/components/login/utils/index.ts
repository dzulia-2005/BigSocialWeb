import { setAuthorazationHeader } from "../../../../../api"

export const SignInSuccess = ({
    accessToken,
    refreshToken
}:{
    accessToken:string;
    refreshToken:string
}) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    setAuthorazationHeader(`Bearer ${accessToken}`)
}