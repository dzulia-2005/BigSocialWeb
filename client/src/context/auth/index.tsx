import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useGetMe } from "../../react-query/query/auth";
import { useHttpInterceptor } from "../../hooks/usehtttpinterceptor";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  coverpicture?: string;
  username?: string;
  posts: { 
    _id: string; 
    caption: string; 
    image: string[]; 
    likes: string[]; 
    comment: string[]; 
    createdAt: string; 
    updatedAt: string;
  }[]; 
 
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null >(null); 
  const [isLoading, setIsLoading] = useState(true); 

  const accessToken = localStorage.getItem("accessToken");
  useHttpInterceptor();

  const { data, isLoading: queryLoading } = useGetMe({
    isEnabled: !!accessToken,
    accessToken,
    
  });

  
  useEffect(() => {
    if (data) {
      setUser(data); 
    }
    setIsLoading(queryLoading); 
  }, [data, queryLoading]);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
