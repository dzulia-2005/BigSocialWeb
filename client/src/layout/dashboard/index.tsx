import React from 'react'
import Header from '../../components/base/header/header'
import Maincontainer from '../../components/base/container/maincontainer'
import { Outlet } from 'react-router-dom'

const DashboardLayout:React.FC = () => {
  return (
    <>
        <Header/>
        <Maincontainer>
          <Outlet/>
        </Maincontainer>
    </>
  )
}

export default DashboardLayout