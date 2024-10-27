import './App.css';
import './index.css';
import Home from './pages/feed/view/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/default/layout';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Notification from './pages/notification/notification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
  
        <Route  path="/:user" element={<Layout />}> 
          <Route 
              index 
              element={<Home />} 
          /> 
        </Route>

        <Route path='/profile/:user'>
            <Route
              index
              element={<Profile/>}
            />
        </Route>

        <Route path='/notification/:user'>
          <Route
            index
            element={<Notification/>}
          />
        </Route>
        
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
