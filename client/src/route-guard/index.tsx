import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/auth/hooks/useAuthContext';
import { PropsWithChildren } from 'react';

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthContext();
    const location = useLocation();

    // Default state: Loader or placeholder before user is fetched
    if (user === undefined) {
        return <div>Loading...</div>; // ან სპინერი ან სხვა ელემენტი
    }

    // If user does not exist, navigate to login page and block other routes
    if (!user && location.pathname !== '/') {
        return <Navigate to="/" replace />;
    }

    // User exists, render children
    return <>{children}</>;
};

export default AuthGuard;
