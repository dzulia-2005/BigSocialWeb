import './App.css';
import { Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/auth';
import DashboardLayout from './layout/dashboard';
import { lazy, Suspense } from 'react';
import AuthGuard from './components/route-guard/index';
import CommentRoute from './page/comment/view';
import NotFound from './page/NotFoundPage';

const Auth = lazy(()=>import('./page/auth/view/index'));
const Home = lazy(()=>import('./page/home/view/home'));
const Profile = lazy(()=>import('./page/profile/view/profile'));


function App() {
   
   
    return (
        <Routes>

            <Route  element={<AuthLayout/>}>
                <Route 
                    path="/" 
                    element={
                        <Suspense fallback={<div>loading...</div>}>
                            <Auth />
                        </Suspense>} 
                />
            </Route>

            <Route  element={<DashboardLayout />}>
                <Route 
                    path="/home" 
                    element={
                    <Suspense fallback={<div>loading...</div>}>
                        <AuthGuard>
                            <Home />
                        </AuthGuard>
                    </Suspense>
                    }/>

                <Route 
                    path="/profile" 
                    element={
                        <Suspense>
                            <AuthGuard>
                                <Profile/>
                            </AuthGuard>
                        </Suspense>} 
                    />

                <Route
                    path='/comment/:postId'
                    element={
                        <Suspense>
                            <AuthGuard>
                                <CommentRoute/>
                            </AuthGuard>
                        </Suspense>
                    }
                />    
            </Route>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
}

export default App;