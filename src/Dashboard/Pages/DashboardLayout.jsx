import React from 'react';
import NavbarDashboard from './DashboardCore/NavbarDashboard';
import ItemBox from './DashboardCore/ItemBox';
import TotalPrice from './DashboardCore/TotalPrice';

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
    </div>
  );
}

export default DashboardLayout;
