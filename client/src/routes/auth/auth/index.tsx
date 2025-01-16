import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { AuthNUM } from "../enum";


const Auth = lazy(()=>import('../../../page/auth/view/index'));


export const Authlayoutcomponent = [
    <Route 
    path={AuthNUM.loginregister} 
    element={
        <Suspense fallback={<div>loading...</div>}>
            <Auth />
        </Suspense>} 
/>
]