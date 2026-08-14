import React from 'react'
import Navbar from './components/Navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </div>
  )
}

export default RootLayout
