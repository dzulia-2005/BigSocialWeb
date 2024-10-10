import './App.css'
import './index.css'
import axios from 'axios'
import Home from './pages/home/home'


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
