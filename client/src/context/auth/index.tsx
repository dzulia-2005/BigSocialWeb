import { createContext, PropsWithChildren } from "react";
import { useGetMe } from "../../react-query/query/auth";
import { data } from "react-router-dom";
import  {useHttpInterceptor}  from "../../hooks/usehtttpinterceptor";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AuthContextType = any;

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const accessToken = localStorage.getItem("accessToken")

    useHttpInterceptor()
    const {data:user} = useGetMe({ isEnabled: !!accessToken , accessToken });

    console.log(data)
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};