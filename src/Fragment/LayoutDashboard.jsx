import React from 'react'
import ItemBox from '../Dashboard/Pages/DashboardCore/ItemBox';

const LayoutDashboard = ({children}) => {
  return (
    <div>
        <NavbarDashboard />
        <ItemBox/>
        {children}
    </div>
  )
}

export default LayoutDashboard;