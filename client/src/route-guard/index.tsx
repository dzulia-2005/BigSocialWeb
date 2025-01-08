import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth/hooks/useAuthContext';
import { PropsWithChildren } from 'react';

const AuthGuard:React.FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthContext(); // თუ კონტექსტი არ გაქვთ, შეცვალეთ თქვენი ლოგიკით

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthGuard;
