import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import AuthGuard from "../../../components/route-guard";
import { dashboard } from "../enum";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';


const Chat = lazy(()=>
    import("../../../page/chat/view")
);


export const chat = [
    <Route
       path={dashboard.chat}
       element={
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>}>
            <AuthGuard>
                <Chat/>
            </AuthGuard>
        </Suspense>
    }    
/>
]