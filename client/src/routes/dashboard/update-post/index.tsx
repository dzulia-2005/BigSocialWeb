import { Route } from "react-router-dom";
import { dashboard } from "../enum";
import { Suspense } from "react";
import AuthGuard from "../../../components/route-guard";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";
import EditPost from "../../../page/PostEdit/view";


export const EditPostRoute = [
    <Route
        key="editpost"
        path={dashboard.editpost}
        element = {
            <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>}>
                <AuthGuard>
                    <EditPost/>
                </AuthGuard>
            </Suspense>
        }
    >

    </Route>
]