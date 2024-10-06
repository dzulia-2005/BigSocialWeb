import './App.css'
import './index.css'
import Home from './pages/home/home'
import axios from 'axios'


function App() {
  axios.defaults.baseURL = 'http://localhost:3000'
  axios.defaults.withCredentials = true;

  return (
   <>
    <Home/>
   </>
  )
}

export default App
