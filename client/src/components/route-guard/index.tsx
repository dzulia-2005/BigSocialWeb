import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/auth/hooks/useAuthContext';
import { PropsWithChildren } from 'react';

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
    const { user, isLoading } = useAuthContext();


    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</> || <Outlet />;
};

export default AuthGuard;
