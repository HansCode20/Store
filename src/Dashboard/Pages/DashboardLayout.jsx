import React from 'react';
import NavbarDashboard from './DashboardCore/NavbarDashboard';
import ItemBox from './DashboardCore/ItemBox';
import TotalPrice from './DashboardCore/TotalPrice';
import LastTransaction from './DashboardCore/LastTransaction';

function DashboardLayout() {
  return (
    <div className='p-5'>
      <div>
        <NavbarDashboard />
        <hr />
      </div>
      <div>
        <ItemBox/>
      </div>
      <div>
        <TotalPrice/>
      </div>
      <div className='mt-20 lg:mt-0'>
        <LastTransaction/>
      </div>
    </div>
  );
}

export default DashboardLayout;
