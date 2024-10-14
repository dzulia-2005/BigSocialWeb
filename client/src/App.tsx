import './App.css'
import './index.css'
// import Profile from './pages/profile/profile'
import Home from './pages/feed/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/default/layout'

function App() {


  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Home />} />
        </Route> 
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
