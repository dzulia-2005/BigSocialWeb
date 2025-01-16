import { Route, Routes } from "react-router-dom"
import AuthLayout from "../layout/auth";
import DashboardLayout from "../layout/dashboard";
import { authroutes } from "./auth";
import NotFound from "../page/NotFoundPage";
import { dashboard } from "./dashboard";


const AppRoute = () => {
  return (
       <Routes>
          <Route  element={<AuthLayout/>}>
             {authroutes}
          </Route>
          <Route  element={<DashboardLayout />}>
             {dashboard}
          </Route>
          <Route path='*' element={<NotFound/>}/>
       </Routes>
  )
}

export default AppRoute