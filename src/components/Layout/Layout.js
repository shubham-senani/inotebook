import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
      <Navbar/>
      <div className="container mt-3">
        <Outlet/>
      </div>
    </>
  )
}

export default Layout
