import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
export default function MainLayout({ UserData }, { setUserData }) {
    return (
        <>
            <Navbar UserData={UserData} setUserData={setUserData} />
            <Outlet />
        </>
    )
}
