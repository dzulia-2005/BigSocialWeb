import './App.css';
import { Routes, Route} from 'react-router-dom';
import Auth from './page/auth/view/index';
import Home from './page/home/view/home';
import Profile from './page/profile/view/profile';
import AuthLayout from './layout/auth';
import DashboardLayout from './layout/dashboard';

function App() {
   
    return (
        <Routes>

            <Route  element={<AuthLayout/>}>
                <Route path="/" element={<Auth />} />
            </Route>

            <Route  element={<DashboardLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
            
        </Routes>
    );
}

export default App;
