import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import AuthGuard from '../../../components/route-guard';
import { dashboard } from '../enum';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


const Home = lazy(()=>import('../../../page/home/view/home'));


export const HomePage = [
    <Route 
      path={dashboard.home}
      element={
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>}>
            <AuthGuard>
                <Home />
            </AuthGuard>
        </Suspense>
    }
/>
]