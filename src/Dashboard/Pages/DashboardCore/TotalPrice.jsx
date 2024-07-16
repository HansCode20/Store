import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { IoIosArrowDown } from "react-icons/io";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TotalPrice = () => {
  const [activeTab, setActiveTab] = useState('3d');

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 5000, 2300, 3400, 4400],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4, // Adjust this value to make the line more wavy
        segment: {
          borderColor: (ctx) => {
            if (ctx.p0.parsed.y > ctx.p1.parsed.y) {
              return 'rgba(255, 159, 64, 1)'; // orange
            } else {
              return 'rgb(119, 164, 201)'; // light blue
            }
          },
        },
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Over Time',
      },
    },
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='p-5 flex lg:flex-row flex-col justify-between'>
      <div>
        <h1 className='text-2xl font-bold'>Your sales report</h1>
        <p className='text-gray-500 mb-8'>Look at your sale</p>
        <p className='text-5xl font-bold mt-0 lg:mt-20'>Rp4.435.000</p>
        <div className='mt-4 flex items-center gap-2'>
          <img 
            src="https://img.icons8.com/fluency-systems-filled/000000/bounce-up.png" 
            alt="bounce-up" 
            className='w-5 h-5 bg-green-500 p-1 rounded-full filter brightness-0 invert' 
          />
          <p className='text-green-500'>Rp2.500.000 (+2.5%)</p>
        </div>
        <div className='mt-10 lg:mt-0 md:mt-0 sm:mt-0 justify-center lg:justify-start lg:mt-[140px] flex gap-2'>
          <button
            className={`py-2 px-4 rounded-full ${activeTab === '3d' ? 'bg-black text-white' : 'text-gray-700'}`}
            onClick={() => handleTabClick('3d')}
          >
            3d
          </button>
          <button
            className={`py-2 px-4 rounded-full ${activeTab === '7d' ? 'bg-black text-white' : 'text-gray-700'}`}
            onClick={() => handleTabClick('7d')}
          >
            7d
          </button>
          <button
            className={`py-2 px-4 rounded-full ${activeTab === '30d' ? 'bg-black text-white' : 'text-gray-700'}`}
            onClick={() => handleTabClick('30d')}
          >
            30d
          </button>
        </div>
      </div>
      <div className='w-full lg:w-[700px] mt-10 lg:mt-0 md:mt-0 sm:mt-0 lg:mx-0'>
        <Popover className="relative flex justify-center lg:justify-end mb-5 ">
          <PopoverButton>
            <div className='flex items-center gap-2 border-2 border-gray-300 p-2 rounded-full '>
              <h1>Total Sales</h1>
              <IoIosArrowDown/>
            </div>
          </PopoverButton>
          <PopoverPanel className="absolute flex flex-col right-0 z-10 mt-[50px] w-56 origin-top-right rounded-md bg-white py-1 p-3 shadow-lg ring-1 ring-black ring-opacity-5 ">
            <div className="py-1">
              <a href="/analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="/engagement" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Back to store</a>
            </div>
          </PopoverPanel>
        </Popover>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TotalPrice;
