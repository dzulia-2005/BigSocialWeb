import { Route, Routes } from "react-router-dom"
import AuthLayout from "../layout/auth";
import DashboardLayout from "../layout/dashboard";
import { authroutes } from "./auth";
import NotFound from "../page/NotFoundPage";
import { dashboard } from "./dashboard";
import { ThemeProvider } from "../components/theme/theme-provider";


const AppRoute = () => {
  return (
       <Routes>
          <Route   element={<AuthLayout/>}>
             {authroutes}
          </Route>
          <Route  element={<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"><DashboardLayout /></ThemeProvider>}>
               {dashboard}
          </Route>
          <Route path='*' element={<NotFound/>}/>
       </Routes>
  )
}

export default AppRoute