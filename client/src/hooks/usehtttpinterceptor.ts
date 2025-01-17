import { useEffect } from "react";
import { useRefresh } from "../react-query/mutation/auth";
import { httpClient } from "../api";
import { queryClient } from "../main";
import { useNavigate } from "react-router-dom";
import { SignInSuccess } from "../page/auth/components/login/utils";

export const useHttpInterceptor = () => {
    const navigate = useNavigate();
    const { mutate: handlerefresh } = useRefresh();

    useEffect(() => {
        const interceptor = httpClient.interceptors.response.use(
            (res) => {
                return res;
            },
            (error) => {
                const refreshToken = localStorage.getItem("refreshToken");

                if (error.response?.status === 401 && refreshToken) {
                    
                    return new Promise((resolve, reject) => {
                        handlerefresh(
                            { payload: { refreshToken: refreshToken } },
                            {
                                onSuccess: (res) => {
                                    SignInSuccess({
                                        accessToken: res.accessToken,
                                        refreshToken: res.refreshToken,
                                    });
                                    
                                    error.config.headers["Authorization"] = `Bearer ${res.accessToken}`;
                                    resolve(httpClient(error.config)); 
                                },
                                onError: () => {
                                    
                                    localStorage.removeItem("refreshToken");
                                    localStorage.removeItem("accessToken");
                                    queryClient.clear();
                                    navigate("/");
                                    reject(error);
                                },
                            }
                        );
                    });
                }

                
                if (error.response?.status) {
                    navigate("/");
                }

                return Promise.reject(error);
            }
        );

       
        return () => {
            httpClient.interceptors.response.eject(interceptor);
        };
    }, [handlerefresh, navigate]);
};
