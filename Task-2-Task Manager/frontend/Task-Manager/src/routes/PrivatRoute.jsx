import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivatRoute = ({allowedRoles}) => {
  return 
  <Outlet/>
}

export default PrivatRoute