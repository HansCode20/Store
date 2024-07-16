import React from 'react'
import ItemBox from '../Dashboard/Pages/DashboardCore/ItemBox';
import LastTransaction from '../Dashboard/Pages/DashboardCore/LastTransaction';
import TotalPrice from '../Dashboard/Pages/DashboardCore/TotalPrice';

const LayoutDashboard = ({children}) => {
  return (
    <div>
        <NavbarDashboard />
        <ItemBox/>
        <TotalPrice />
        <LastTransaction/>
        {children}
    </div>
  )
}

export default LayoutDashboard;