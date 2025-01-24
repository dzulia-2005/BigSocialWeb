import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { AuthNUM } from "../enum";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


const Auth = lazy(()=>import('../../../page/auth/view/index'));


export const Authlayoutcomponent = [
    <Route 
    key="auth"
    path={AuthNUM.loginregister} 
    element={
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>}>
            <Auth />
        </Suspense>} 
/>
]